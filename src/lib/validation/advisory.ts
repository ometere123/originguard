import { z } from "zod";
import { isAddress, getAddress } from "viem";
export const severityLabels = { 1: "Low", 2:"Medium", 3:"High", 4:"Critical" } as const;
export type Severity = keyof typeof severityLabels;
export const draftSchema = z.object({
  packageName: z.string().trim().toLowerCase().min(2).max(96).regex(/^[a-z0-9@][a-z0-9@._/\-]*$/, "Use a valid package identifier"),
  claimedPublisher: z.string().trim().min(2).max(100),
  title: z.string().trim().min(6).max(160),
  summary: z.string().trim().min(15).max(2200),
  severity: z.coerce.number().int().min(1).max(4)
});
export type AdvisoryDraft = z.infer<typeof draftSchema>;
export const payloadSchema = z.object({
  title: z.string().min(6).max(160),
  summary: z.string().min(15).max(2200),
  claimedPublisher: z.string().min(2).max(100)
}).strict();
export type AdvisoryPayload = z.infer<typeof payloadSchema>;
export const addressSchema = z.string().refine(isAddress,"Enter a valid EVM wallet address").transform(v=>getAddress(v));
export const keySchema = z.string().regex(/^0x[0-9a-fA-F]{64}$/,"Invalid Arkiv entity key");
export function parseWallet(raw: string): `0x${string}` | undefined {
 const result=addressSchema.safeParse(raw.trim());
 return result.success ? (result.data as `0x${string}`) : undefined;
}
export function sameWallet(a: string|undefined|null, b: string|undefined|null): boolean {
 return Boolean(a && b && isAddress(a) && isAddress(b) && a.toLowerCase()===b.toLowerCase());
}
export type Advisory = {
 key: `0x${string}`; creator: `0x${string}`; owner: `0x${string}`;
 createdAt: bigint; expiresAt: bigint; packageName:string; severity:Severity;
 issuedAtMs:bigint; payload: AdvisoryPayload; readOnly:boolean;
};
export type PublishEvidence = { key:`0x${string}`; txHash:`0x${string}`; expiresAt:bigint; publisher:`0x${string}` };
