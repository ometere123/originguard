"use client";
import { useEffect } from "react";
import { X, ExternalLink, Fingerprint, ShieldCheck, ShieldAlert, Copy } from "lucide-react";
import { type Advisory, sameWallet, severityLabels } from "@/lib/validation/advisory";
import { ARKIV_EXPLORER } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { timeString } from "@/lib/utils";
export function InspectModal({record,trusted,onClose}:{record:Advisory;trusted?:string;onClose:()=>void}){
 useEffect(()=>{const handler=(e:KeyboardEvent)=>{if(e.key==="Escape")onClose()};document.addEventListener("keydown",handler);return()=>document.removeEventListener("keydown",handler)},[onClose]);
 const matches=trusted?sameWallet(trusted,record.creator):false;
 return <div className="fixed inset-0 z-50 flex items-start justify-center overflow-auto bg-black/80 px-4 py-10 backdrop-blur-sm" onClick={onClose}>
  <section role="dialog" aria-modal="true" aria-label="Advisory on-chain evidence" className="card-panel w-full max-w-2xl p-6 md:p-8" onClick={e=>e.stopPropagation()}>
   <div className="flex items-start justify-between gap-3"><div><p className="mb-2 text-xs font-bold uppercase tracking-widest text-teal-300">Arkiv provenance</p><h2 className="text-xl font-bold">{record.payload.title}</h2></div><Button variant="ghost" size="sm" aria-label="Close details" onClick={onClose}><X size={20}/></Button></div>
   <p className="mt-4 text-sm leading-7 text-slate-300 whitespace-pre-wrap break-words">{record.payload.summary}</p>
   <div className="mt-5 flex flex-wrap gap-2"><Badge>{severityLabels[record.severity]}</Badge><Badge>{record.packageName}</Badge><Badge tone={record.readOnly?"good":"warn"}>{record.readOnly?"Read-only payload":"Mutable payload"}</Badge></div>
   <div className="mt-6 rounded-xl border border-slate-700/80 bg-[#0b1727] p-4">
    <div className="flex items-center gap-2">{trusted ? matches?<ShieldCheck className="text-teal-300" size={20}/>:<ShieldAlert className="text-amber-300" size={20}/>:<Fingerprint className="text-slate-400" size={20}/>}
    <strong className="text-sm">{!trusted?"No trusted wallet selected":matches?"Immutable creator matches trusted wallet":"Immutable creator does not match trusted wallet"}</strong></div>
    <p className="mt-2 text-xs leading-5 text-slate-400">This verifies wallet provenance only. Arkiv does not verify a company identity, the factual accuracy of an advisory, or whether an owner will delete an entity.</p>
   </div>
   <dl className="mt-6 grid gap-4 text-sm">
    {[["Claimed publisher",record.payload.claimedPublisher],["Creator (immutable)",record.creator],["Current owner (transferable)",record.owner],["Entity key",record.key],["Created at block",record.createdAt.toString()],["Expires at block",record.expiresAt.toString()],["Payload issued time",timeString(record.issuedAtMs)]].map(([label,value])=><div className="min-w-0 border-b border-slate-700/70 pb-3" key={label}><dt className="mb-1 text-xs text-slate-500">{label}</dt><dd className="mono break-all text-xs text-slate-200">{value}</dd></div>)}
   </dl>
   <div className="mt-5 flex flex-wrap gap-2"><Button variant="outline" onClick={()=>navigator.clipboard.writeText(record.key)}><Copy size={14}/> Copy key</Button><Button asChild variant="outline"><a href={`${ARKIV_EXPLORER}/entity/${record.key}`} target="_blank" rel="noreferrer">Inspect in explorer <ExternalLink size={14}/></a></Button></div>
   <p className="mt-4 text-xs text-slate-500">Explorer URL convention must be checked against the live explorer before final submission.</p>
  </section>
 </div>;
}
