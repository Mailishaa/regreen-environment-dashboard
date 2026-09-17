 "use client";
import { useState } from "react";
import AppShell from "../../components/AppShell";
import Page from "../../components/Page";
import { api } from "../../lib/api";

export default function Observations(){
 const [open,setOpen]=useState(false),[form,setForm]=useState({zone_id:"",observation_type:"",tree_count:"",latitude:"",longitude:"",captured_at:""}),[image,setImage]=useState(null),[msg,setMsg]=useState("");
 const change=k=>e=>setForm({...form,[k]:e.target.value});
 async function save(e){e.preventDefault();try{const fd=new FormData();Object.entries(form).forEach(([k,v])=>fd.append(k,k==="tree_count"||k==="zone_id"?Number(v):v));fd.append("image",image);await api("/observations",{method:"POST",body:fd});setMsg("Observation created.");setOpen(false);location.reload()}catch(e){setMsg(e.message)}}
 return <AppShell><Page title="Observations" endpoint="/observations" columns={[["id","ID"],["zone_id","Zone"],["observation_type","Type"],["tree_count","Trees"],["latitude","Latitude"],["longitude","Longitude"],["verified","Verified"],["captured_at","Captured"]]} actions={<button className="primary small" onClick={()=>setOpen(!open)}>+ Observation</button>}>{open&&<form className="formGrid" onSubmit={save}><input type="number" placeholder="Zone ID" onChange={change("zone_id")} required/><input placeholder="Observation type" onChange={change("observation_type")} required/><input type="number" placeholder="Tree count" onChange={change("tree_count")} required/><input type="number" step="any" placeholder="Latitude" onChange={change("latitude")} required/><input type="number" step="any" placeholder="Longitude" onChange={change("longitude")} required/><input type="datetime-local" onChange={change("captured_at")} required/><input type="file" accept="image/*" onChange={e=>setImage(e.target.files[0])} required/><button className="primary">Create observation</button></form>}{msg&&<p className="notice">{msg}</p>}</Page></AppShell>
}