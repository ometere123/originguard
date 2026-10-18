import type { Metadata } from "next";
import "./globals.css";
export const metadata:Metadata={
 title:"OriginGuard | Verify the source, not the claim",
 description:"Wallet-provenance verification for Arkiv-backed software security advisories. All records are public and directly queryable on Tiramisu.",
 openGraph:{title:"OriginGuard — Verify the source, not the claim",description:"An open Arkiv security advisory registry for verifying immutable on-chain creator wallets."}
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
