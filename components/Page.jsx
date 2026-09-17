
"use client";

import { useEffect, useState } from "react";
import { get } from "../lib/api";

export default function Page({
  title,
  endpoint,
  columns = [],
  actions,
  children,
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    if (!endpoint) {
      setData([]);
      setLoading(false);
      setError("");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await get(endpoint);

      setData(
        Array.isArray(result)
          ? result
          : result?.items ||
            result?.data ||
            []
      );
    } catch (error) {
      setData([]);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [endpoint]);

  return (
    <section className="page">
      <div className="sectionHead">
        <div>
          <h2>{title}</h2>

          {endpoint ? (
            <p>
              Live data from{" "}
              <code>{endpoint}</code>
            </p>
          ) : (
            <p>
              Select an item to load data.
            </p>
          )}
        </div>

        {actions}
      </div>

      {children}

      {!endpoint ? (
        <div className="state">
          Select an item to load data.
        </div>
      ) : loading ? (
        <div className="state">
          Loading…
        </div>
      ) : error ? (
        <div className="state error">
          {error}
        </div>
      ) : !data.length ? (
        <div className="state">
          No records returned.
        </div>
      ) : (
        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column[0]}>
                    {column[1]}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.map((row, index) => (
                <tr
                  key={row.id ?? index}
                >
                  {columns.map(
                    ([key]) => (
                      <td key={key}>
                        {key === "verified" ? (
                          <span
                            className={
                              row[key]
                                ? "pill good"
                                : "pill"
                            }
                          >
                            {row[key]
                              ? "Verified"
                              : "Pending"}
                          </span>
                        ) : (
                          String(
                            row[key] ?? "—"
                          )
                        )}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

