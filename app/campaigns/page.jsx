 "use client";
import { useState } from "react";
import AppShell from "../../components/AppShell";
import Page from "../../components/Page";
import { post } from "../../lib/api";

export default function Campaigns(){
 const [open,setOpen]=useState(false),[name,setName]=useState(""),[species,setSpecies]=useState(""),[org,setOrg]=useState(""),[msg,setMsg]=useState("");
 async function save(e){e.preventDefault();try{await post("/campaigns",{name,species:species||null,organization_id:Number(org)});setMsg("Campaign created.");setOpen(false);location.reload()}catch(e){setMsg(e.message)}}
 return <AppShell><Page title="Campaigns" endpoint="/campaigns" columns={[["id","ID"],["name","Name"],["species","Species"],["organization_id","Organization"]]} actions={<button className="primary small" onClick={()=>setOpen(!open)}>+ Campaign</button>}>{open&&<form className="inlineForm" onSubmit={save}><input placeholder="Campaign name" value={name} onChange={e=>setName(e.target.value)} required/><input placeholder="Species (optional)" value={species} onChange={e=>setSpecies(e.target.value)}/><input type="number" placeholder="Organization ID" value={org} onChange={e=>setOrg(e.target.value)} required/><button className="primary">Create</button></form>}{msg&&<p className="notice">{msg}</p>}</Page></AppShell>
}