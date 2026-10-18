import * as React from "react";
import { cn } from "@/lib/utils";
export function Input({className,...props}:React.ComponentProps<"input">) {
 return <input className={cn("h-11 w-full rounded-xl border border-slate-700 bg-[#0d1726] px-3.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20",className)} {...props}/>;
}
export function Textarea({className,...props}:React.ComponentProps<"textarea">) {
 return <textarea className={cn("min-h-28 w-full resize-y rounded-xl border border-slate-700 bg-[#0d1726] px-3.5 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20",className)} {...props}/>;
}
