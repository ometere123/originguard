import { cn } from "@/lib/utils";
export function Badge({children,tone="neutral",className}:{children:React.ReactNode;tone?:"neutral"|"good"|"bad"|"warn";className?:string}) {
 return <span className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-bold tracking-wide",
 tone==="good"?"border-teal-600/40 bg-teal-500/10 text-teal-300":tone==="bad"?"border-rose-500/40 bg-rose-500/10 text-rose-300":tone==="warn"?"border-amber-500/40 bg-amber-400/10 text-amber-300":"border-slate-600/60 bg-slate-800/70 text-slate-300",className)}>{children}</span>;
}
