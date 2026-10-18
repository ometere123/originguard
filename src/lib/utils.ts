import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs:ClassValue[]) { return twMerge(clsx(inputs)); }
export function shortHex(value:string,count=6) { return value.length>count*2+3 ? `${value.slice(0,count+2)}…${value.slice(-4)}`:value; }
export function messageOf(error:unknown):string {
 if(error instanceof Error) return error.message.length>240 ? `${error.message.slice(0,240)}…`:error.message;
 return "An unexpected error occurred";
}
export function timeString(ms:bigint) {
 const number=Number(ms);
 return Number.isFinite(number) ? new Date(number).toLocaleString("en-GB",{dateStyle:"medium",timeStyle:"short"}) : "Unknown";
}
