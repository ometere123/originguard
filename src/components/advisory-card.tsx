"use client";
import { ArrowUpRight, BadgeCheck, ShieldAlert, FileCode2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { severityLabels, sameWallet, type Advisory } from "@/lib/validation/advisory";
import { shortHex, timeString } from "@/lib/utils";
export function AdvisoryCard({record, trusted, onInspect}:{record:Advisory;trusted?:string;onInspect:(value:Advisory)=>void}){
 const match=trusted?sameWallet(record.creator,trusted):false;
 return <article className="card-panel group overflow-hidden p-5 transition-colors hover:border-teal-500/40" data-testid="advisory-card">
  <div className="mb-3 flex flex-wrap items-center justify-between gap-2"><div className="flex flex-wrap items-center gap-2"><Badge tone={record.severity>=4?"bad":record.severity>=3?"warn":"neutral"}>{severityLabels[record.severity]}</Badge><span className="mono rounded bg-slate-800 px-2 py-1 text-[11px] text-slate-300">{record.packageName}</span></div><span className="text-xs text-slate-500">{timeString(record.issuedAtMs)}</span></div>
  <h3 className="mb-2 line-clamp-2 text-base font-bold leading-6 text-slate-100">{record.payload.title}</h3>
  <p className="mb-4 line-clamp-2 min-h-10 text-sm leading-5 text-slate-400">{record.payload.summary}</p>
  <div className="mb-4 flex items-center justify-between gap-3 border-t border-slate-700/60 pt-4"><div><p className="mb-1 text-[11px] text-slate-500">Claims publisher</p><span className="text-sm font-medium">{record.payload.claimedPublisher}</span></div>
  {trusted?<Badge tone={match?"good":"warn"}>{match?<BadgeCheck size={13}/>:<ShieldAlert size={13}/>} {match?"Trusted creator match":"Different creator"}</Badge>:<Badge><FileCode2 size={13}/> Provenance available</Badge>}</div>
  <div className="flex items-center justify-between gap-2"><span className="mono text-[11px] text-slate-500" title={record.creator}>Created by {shortHex(record.creator,5)}</span><Button size="sm" variant="outline" onClick={()=>onInspect(record)}>Inspect evidence <ArrowUpRight size={14}/></Button></div>
 </article>;
}
