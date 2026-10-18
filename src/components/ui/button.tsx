import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const buttonVariants=cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400",{
 variants:{ variant:{default:"bg-teal-400 text-slate-950 hover:bg-teal-300",outline:"border border-slate-600 bg-slate-850 hover:border-teal-500 hover:bg-slate-800 text-slate-100",ghost:"hover:bg-slate-800 text-slate-200",destructive:"bg-red-500 text-white hover:bg-red-400"},size:{default:"h-10 px-4",sm:"h-8 px-3 text-xs",lg:"h-12 px-6"}}, defaultVariants:{variant:"default",size:"default"}
});
export function Button({className,variant,size,asChild=false,...props}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & {asChild?:boolean}) {
 const Comp=asChild?Slot:"button";
 return <Comp data-slot="button" className={cn(buttonVariants({variant,size,className}))} {...props}/>;
}
