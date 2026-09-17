 "use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const nav = [
  ["/overview", "Overview", "⌂"],
  ["/organizations", "Organizations", "▦"],
  ["/campaigns", "Campaigns", "◈"],
  ["/zones", "Zones", "⌖"],
  ["/observations", "Observations", "◉"],
  ["/verification", "Verification", "✓"],
  ["/settings", "Settings", "⚙"]
];

export default function AppShell({ children }) {
  const path = usePathname(), router = useRouter();
  const logout = () => { localStorage.removeItem("access_token"); router.push("/login"); };

  return <div className="shell">
    <aside className="sidebar">
      <div className="brand"><span>🌿</span><div><b>ReGreen</b><small>Admin portal</small></div></div>
      <nav>{nav.map(([href, label, icon]) =>
        <Link className={path === href ? "active" : ""} href={href} key={href}><i>{icon}</i>{label}</Link>
      )}</nav>
      <button className="logout" onClick={logout}>↪ Sign out</button>
    </aside>
    <main className="main">
      <header><div><span className="eyebrow">Environmental management</span><h1>{nav.find(n => n[0] === path)?.[1] || "ReGreen"}</h1></div><div className="online"><span/> API connected</div></header>
      {children}
    </main>
  </div>;
}