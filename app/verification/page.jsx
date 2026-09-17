 "use client";
import { useState } from "react";
import AppShell from "../../components/AppShell";
import Page from "../../components/Page";
import { patch } from "../../lib/api";

function Verify(){const [id,setId]=useState(""),[value,setValue]=useState(true),[msg,setMsg]=useState("");return <div className="verifyBox"><input type="number" placeholder="Observation ID" value={id} onChange={e=>setId(e.target.value)}/><select value={value} onChange={e=>setValue(e.target.value==="true")}><option value="true">Verify</option><option value="false">Unverify</option></select><button className="primary" onClick={async()=>{try{await patch(`/observations/${id}/verify`,{verified:value});setMsg("Observation updated.")}catch(e){setMsg(e.message)}}}>Apply</button>{msg&&<span>{msg}</span>}</div>}
export default function Verification(){return <AppShell><Page title="Verification" endpoint="/observations" columns={[["id","ID"],["zone_id","Zone"],["observation_type","Type"],["tree_count","Trees"],["verified","Status"],["captured_at","Captured"]]}><Verify/></Page></AppShell>}