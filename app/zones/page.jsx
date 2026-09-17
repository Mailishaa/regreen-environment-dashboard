"use client";

import { useEffect, useState } from "react";
import AppShell from "../../components/AppShell";
import Page from "../../components/Page";
import { get, post } from "../../lib/api";

export default function Zones() {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState("");

  const [campaignLoading, setCampaignLoading] = useState(true);
  const [campaignError, setCampaignError] = useState("");

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [polygon, setPolygon] = useState("");

  const [msg, setMsg] = useState("");
  const [createError, setCreateError] = useState("");

  useEffect(() => {
    async function loadCampaigns() {
      setCampaignLoading(true);
      setCampaignError("");

      try {
        const data = await get("/campaigns");

        console.log("CAMPAIGNS RESPONSE:", data);

        if (!Array.isArray(data)) {
          throw new Error(
            "The API did not return a campaign list."
          );
        }

        setCampaigns(data);

        if (data.length > 0) {
          setSelectedCampaign(String(data[0].id));
        }
      } catch (error) {
        console.error("CAMPAIGNS ERROR:", error);
        setCampaignError(error.message);
      } finally {
        setCampaignLoading(false);
      }
    }

    loadCampaigns();
  }, []);

  async function save(event) {
    event.preventDefault();

    setMsg("");
    setCreateError("");

    if (!selectedCampaign) {
      setCreateError("Select a campaign first.");
      return;
    }

    try {
      await post("/zones", {
        campaign_id: Number(selectedCampaign),
        name,
        polygon_json: polygon,
      });

      setMsg("Zone created successfully.");

      setName("");
      setPolygon("");
      setOpen(false);

      window.location.reload();
    } catch (error) {
      setCreateError(error.message);
    }
  }

  return (
    <AppShell>
      <Page
        title="Zones"
        endpoint={
          selectedCampaign
            ? `/zones/${selectedCampaign}`
            : null
        }
        columns={[
          ["id", "ID"],
          ["campaign_id", "Campaign"],
          ["name", "Name"],
          ["polygon_json", "Polygon"],
        ]}
        actions={
          <button
            className="primary small"
            onClick={() => setOpen(!open)}
            disabled={!selectedCampaign}
          >
            + Zone
          </button>
        }
      >
        <div className="hint">
          Select a campaign to view its registered zones.
        </div>

        <div className="inlineForm">
          <label>
            Campaign
          </label>

          {campaignLoading ? (
            <div className="state">
              Loading campaigns…
            </div>
          ) : campaignError ? (
            <div className="state error">
              Failed to load campaigns:{" "}
              {campaignError}
            </div>
          ) : (
            <select
              value={selectedCampaign}
              onChange={(event) =>
                setSelectedCampaign(event.target.value)
              }
            >
              <option value="">
                Select a campaign
              </option>

              {campaigns.map((campaign) => (
                <option
                  key={campaign.id}
                  value={campaign.id}
                >
                  {campaign.name} — ID {campaign.id}
                </option>
              ))}
            </select>
          )}
        </div>

        {campaigns.length === 0 &&
          !campaignLoading &&
          !campaignError && (
            <div className="state">
              The backend returned no campaigns.
            </div>
          )}

        {open && (
          <form
            className="inlineForm"
            onSubmit={save}
          >
            <input
              placeholder="Zone name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              required
            />

            <input
              placeholder='Polygon JSON e.g. [[-0.0917,34.768],[-0.0917,34.769],[-0.0907,34.769]]'
              value={polygon}
              onChange={(event) =>
                setPolygon(event.target.value)
              }
              required
            />

            <button className="primary">
              Create
            </button>
          </form>
        )}

        {msg && (
          <p className="notice">
            {msg}
          </p>
        )}

        {createError && (
          <p className="notice">
            {createError}
          </p>
        )}
      </Page>
    </AppShell>
  );
}