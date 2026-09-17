 "use client";
import { useState } from "react";
import AppShell from "../../components/AppShell";
import Page from "../../components/Page";
import { post } from "../../lib/api";

export default function Organizations(){
 const [open,setOpen]=useState(false),[name,setName]=useState(""),[type,setType]=useState(""),[location,setLocation]=useState(""),[msg,setMsg]=useState("");
 async function save(e){e.preventDefault();try{await post("/organizations",{name,organization_type:type,location});setMsg("Organization created.");setOpen(false);location.reload()}catch(e){setMsg(e.message)}}
 return <AppShell><Page title="Organizations" endpoint="/organizations" columns={[["id","ID"],["name","Name"],["organization_type","Type"],["location","Location"],["owner_id","Owner"]]} actions={<button className="primary small" onClick={()=>setOpen(!open)}>+ Organization</button>}>{open&&<form className="inlineForm" onSubmit={save}><input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required/><input placeholder="Organization type" value={type} onChange={e=>setType(e.target.value)} required/><input placeholder="Location" value={location} onChange={e=>setLocation(e.target.value)} required/><button className="primary">Create</button></form>}{msg&&<p className="notice">{msg}</p>}</Page></AppShell>
}