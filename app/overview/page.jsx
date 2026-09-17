
"use client";

import { useEffect, useState } from "react";
import AppShell from "../../components/AppShell";
import { get } from "../../lib/api";

const metricCards = [
  {
    key: "organizations",
    label: "Organizations",
  },
  {
    key: "campaigns",
    label: "Campaigns",
  },
  {
    key: "baseline_trees",
    label: "Trees Planted",
  },
  {
    key: "latest_trees",
    label: "Latest Tree Count",
  },
  {
    key: "survival_rate",
    label: "Survival Rate",
    suffix: "%",
  },
  {
    key: "observations",
    label: "Observations",
  },
];

export default function Overview() {
  const [metrics, setMetrics] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [metricsData, campaignsData] =
          await Promise.all([
            get("/dashboard/metrics"),
            get("/dashboard/campaigns"),
          ]);

        setMetrics(metricsData);

        setCampaigns(
          Array.isArray(campaignsData)
            ? campaignsData
            : []
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  return (
    <AppShell>
      <section className="page">
        <div className="hero">
          <div>
            <span className="eyebrow">
              ReGreen overview
            </span>

            <h2>
              Environmental activity at a glance
            </h2>

            <p>
              Analytics retrieved directly from the
              ReGreen API.
            </p>
          </div>

          <div className="leaf">🌱</div>
        </div>

        {loading && (
          <div className="state">
            Loading dashboard analytics…
          </div>
        )}

        {error && (
          <div className="state error">
            {error}
          </div>
        )}

        {!loading && !error && metrics && (
          <div className="cards">
            {metricCards.map((card) => (
              <div
                className="card"
                key={card.key}
              >
                <small>{card.label}</small>

                <strong>
                  {metrics[card.key] ?? 0}
                  {card.suffix || ""}
                </strong>
              </div>
            ))}
          </div>
        )}

        <div className="sectionHead">
          <div>
            <h2>Campaign analytics</h2>

            <p>
              Retrieved from{" "}
              <code>/dashboard/campaigns</code>
            </p>
          </div>
        </div>

        <div className="tableWrap">
          {loading ? (
            <div className="state">
              Loading campaigns…
            </div>
          ) : campaigns.length === 0 ? (
            <div className="state">
              No campaign analytics returned.
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Campaign</th>
                  <th>Organization</th>
                  <th>Species</th>
                  <th>Baseline</th>
                  <th>Latest</th>
                  <th>Survival</th>
                  <th>Observations</th>
                </tr>
              </thead>

              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign.id}>
                    <td>
                      {campaign.name || "—"}
                    </td>

                    <td>
                      {campaign.organization_name ||
                        "—"}
                    </td>

                    <td>
                      {campaign.species || "—"}
                    </td>

                    <td>
                      {campaign.baseline_count ?? 0}
                    </td>

                    <td>
                      {campaign.latest_count ?? 0}
                    </td>

                    <td>
                      {campaign.survival_rate ?? 0}%
                    </td>

                    <td>
                      {campaign.observations ?? 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </AppShell>
  );
}
