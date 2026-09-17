
"use client";

import { useState } from "react";
import { post, get } from "../../lib/api";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const router = useRouter();

  async function submit(event) {
    event.preventDefault();

    setBusy(true);
    setError("");

    try {
      const loginResponse = await post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem(
        "access_token",
        loginResponse.access_token
      );

      const user = await get("/auth/me");

      if (user.role !== "admin") {
        localStorage.removeItem("access_token");

        throw new Error(
          "This dashboard is restricted to administrators."
        );
      }

      router.push("/overview");
    } catch (error) {
      localStorage.removeItem("access_token");
      setError(error.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="login">
      <div className="loginCard">
        <div className="logo">🌿</div>

        <span className="eyebrow">
          ReGreen Environment
        </span>

        <h1>Welcome back</h1>

        <p>
          Sign in to manage environmental data.
        </p>

        <form onSubmit={submit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />
          </label>

          {error && (
            <div className="alert">
              {error}
            </div>
          )}

          <button
            className="primary"
            disabled={busy}
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}

