"use client";
import { useEffect, useState } from "react";
import { AlertTriangle, ArrowUpRight, BadgeCheck, LockKeyhole, RadioTower } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { connectPublisher, publishAdvisory, type Eip1193Provider } from "@/lib/arkiv/write";
import { draftSchema,type PublishEvidence } from "@/lib/validation/advisory";
import { ARKIV_EXPLORER } from "@/lib/config";
import { messageOf,shortHex } from "@/lib/utils";
const initial={packageName:"",claimedPublisher:"",title:"",summary:"",severity:"3"};
export function PublishPanel({onPublished}:{onPublished:()=>void}) {
 const [address,setAddress]=useState<`0x${string}`>();
 const [provider,setProvider]=useState<Eip1193Provider>();
 const [values,setValues]=useState(initial);
 const [busy,setBusy]=useState(false);
 const [error,setError]=useState("");
 const [receipt,setReceipt]=useState<PublishEvidence>();
 useEffect(()=>{
  if(!provider||!address||!provider.on)return;
  const accountsChanged=(...args:unknown[])=>{
   const accounts=args[0];
   const next=Array.isArray(accounts)&&typeof accounts[0]==="string"?accounts[0].toLowerCase():"";
   if(next!==address.toLowerCase()){
    setAddress(undefined);setProvider(undefined);setReceipt(undefined);
    setError("The publishing wallet changed. Reconnect MetaMask before publishing.");
   }
  };
  const chainChanged=(...args:unknown[])=>{
   const chain=args[0];
   if(typeof chain!=="string"||Number.parseInt(chain,16)!==7738577){
    setAddress(undefined);setProvider(undefined);setReceipt(undefined);
    setError("The wallet network changed. Reconnect MetaMask on Arkiv Tiramisu before publishing.");
   }
  };
  provider.on("accountsChanged",accountsChanged);provider.on("chainChanged",chainChanged);
  return()=>{provider.removeListener?.("accountsChanged",accountsChanged);provider.removeListener?.("chainChanged",chainChanged)};
 },[provider,address]);
 const input=(name:keyof typeof initial, value:string)=>setValues(old=>({...old,[name]:value}));
 async function connect(){setBusy(true);setError("");try{const result=await connectPublisher();setAddress(result.address);setProvider(result.provider);}catch(e){setError(messageOf(e));}finally{setBusy(false)}}
 async function submit(event:React.FormEvent<HTMLFormElement>){
  event.preventDefault();setError("");setReceipt(undefined);
  if(!provider||!address){setError("Connect your publishing wallet first");return;}
  const parsed=draftSchema.safeParse(values);
  if(!parsed.success){setError(parsed.error.issues[0]?.message??"Invalid advisory");return;}
  setBusy(true);
  try {const evidence=await publishAdvisory(provider,address,parsed.data);setReceipt(evidence);setValues(initial);onPublished();}
  catch(e){setError(messageOf(e));}finally{setBusy(false);}
 }
 return <section className="grid gap-6 lg:grid-cols-[1fr_.76fr]" aria-label="Publish advisory">
  <div className="card-panel p-6 md:p-8"><div className="mb-6 flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-xl font-bold">Publish advisory</h2><p className="mt-1 text-sm text-slate-400">Write a public, read-only record on Tiramisu that expires in 30 days.</p></div><Badge><RadioTower size={12}/> Tiramisu testnet</Badge></div>
   <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-700 bg-[#101c2b] p-4"><div><p className="text-xs text-slate-500">Publishing wallet</p><p className="mono mt-1 text-xs">{address?shortHex(address,8):"Not connected"}</p></div><Button disabled={busy} onClick={connect} variant="outline">{address?"Reconnect wallet":"Connect MetaMask"}</Button></div>
   <form onSubmit={submit} className="space-y-4">
    <div className="grid gap-4 md:grid-cols-2"><Field label="Package identifier" help="Indexed, exact match"><Input required maxLength={96} placeholder="@example/auth-core" value={values.packageName} onChange={e=>input("packageName",e.target.value)}/></Field><Field label="Claimed publisher" help="Unverified text"><Input required maxLength={100} placeholder="Example Maintainers" value={values.claimedPublisher} onChange={e=>input("claimedPublisher",e.target.value)}/></Field></div>
    <Field label="Advisory title"><Input required maxLength={160} placeholder="Synthetic dependency vulnerability" value={values.title} onChange={e=>input("title",e.target.value)}/></Field>
    <Field label="Severity"><select className="h-11 w-full rounded-xl border border-slate-700 bg-[#0d1726] px-3.5 text-sm" value={values.severity} onChange={e=>input("severity",e.target.value)}>{[[1,"Low"],[2,"Medium"],[3,"High"],[4,"Critical"]].map(([k,label])=><option key={k} value={k}>{label}</option>)}</select></Field>
    <Field label="Summary" help="Synthetic data only. Never store secrets or personal information."><Textarea required maxLength={2200} placeholder="Describe a synthetic security condition and recommended mitigation..." value={values.summary} onChange={e=>input("summary",e.target.value)}/></Field>
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-500/25 bg-amber-400/5 p-4"><p className="max-w-md text-xs leading-5 text-amber-200">Everything you submit is publicly readable. The claim of publisher identity is not verified by Arkiv.</p><Badge tone="warn">30-day expiry</Badge></div>
    <Button disabled={busy||!address} className="w-full" size="lg" type="submit">{busy?"Awaiting wallet / chain confirmation…":"Sign and publish on Arkiv"}<ArrowUpRight size={16}/></Button>
   </form>
   {error && <div role="alert" className="mt-4 flex items-start gap-2 rounded-xl border border-rose-500/35 bg-rose-500/10 p-3 text-sm text-rose-200"><AlertTriangle size={17}/>{error}</div>}
   {receipt && <div role="status" className="mt-4 rounded-xl border border-teal-500/35 bg-teal-500/10 p-4 text-sm"><div className="mb-2 flex items-center gap-2 font-bold text-teal-200"><BadgeCheck size={17}/> Transaction confirmed</div><p className="mono break-all text-xs">Entity: {receipt.key}</p><p className="mono mt-1 break-all text-xs">Transaction: {receipt.txHash}</p><a className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-teal-300 hover:underline" href={`${ARKIV_EXPLORER}/tx/${receipt.txHash}`} target="_blank" rel="noreferrer">Open explorer <ArrowUpRight size={13}/></a></div>}
  </div>
  <aside className="space-y-5"><div className="card-panel p-6"><div className="mb-3 flex items-center gap-2 text-teal-300"><LockKeyhole size={19}/><h3 className="font-bold">Your wallet is the signer</h3></div><p className="text-sm leading-7 text-slate-400">OriginGuard never handles your private key. MetaMask signs the transaction directly; the on-chain creator remains bound to that wallet even if ownership changes.</p></div>
  <div className="card-panel p-6"><h3 className="mb-3 font-bold">What happens next</h3><ol className="space-y-4 text-sm text-slate-400">{["Check MetaMask is on Tiramisu (chain 7738577)","Review the publicly readable advisory content","Approve the transaction and pay test GLM","Verify the receipt and entity key after confirmation"].map((s,i)=><li key={s} className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-xs text-teal-300">{i+1}</span><span>{s}</span></li>)}</ol></div></aside>
 </section>;
}
function Field({label,help,children}:{label:string;help?:string;children:React.ReactNode}){return <label className="block"><span className="mb-2 block text-xs font-semibold text-slate-200">{label}</span>{children}{help&&<span className="mt-1.5 block text-xs text-slate-500">{help}</span>}</label>}
