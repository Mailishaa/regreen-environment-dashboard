 "use client";
import { useEffect,useState } from "react";
import AppShell from "../../components/AppShell";
import { get } from "../../lib/api";

export default function Settings(){
 const [me,setMe]=useState(null),[health,setHealth]=useState(null);
 useEffect(()=>{get("/auth/me").then(setMe).catch(()=>{});get("/health").then(setHealth).catch(()=>{})},[]);
 return <AppShell><section className="page"><div className="settingsGrid"><div className="panel"><span className="eyebrow">Account</span><h2>Current user</h2>{me?<dl><dt>Name</dt><dd>{me.full_name}</dd><dt>Email</dt><dd>{me.email}</dd><dt>Role</dt><dd>{me.role}</dd><dt>ID</dt><dd>{me.id}</dd></dl>:<div className="state">Unable to load account.</div>}</div><div className="panel"><span className="eyebrow">System</span><h2>API health</h2><pre>{health?JSON.stringify(health,null,2):"Checking…"}</pre></div></div></section></AppShell>
}