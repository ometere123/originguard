import { payloadSchema, type Advisory } from "@/lib/validation/advisory";
import { PROJECT_ID, RECORD_TYPE, SCHEMA_VERSION } from "@/lib/config";
import { isAddress } from "viem";

/* Reject malformed or adversarial untrusted public entities, never infer authority from payload. */
export function decodeAdvisory(entity: {
  key?: `0x${string}`; creator?: `0x${string}`; owner?: `0x${string}`;
  createdAt?:bigint;expiresAt?:bigint;
  contentType?:string;
  attributes?:Record<string,{type:string;value:unknown}>;
 creationFlags?:{readonly?:boolean};
 toJson?:()=>unknown;
}):Advisory | null {
 try {
  const attrs=entity.attributes;
  if(!attrs || attrs.project?.type!=="str" || attrs.project?.value!==PROJECT_ID ||
    attrs.record_type?.type!=="str" || attrs.record_type?.value!==RECORD_TYPE ||
    attrs.schema_version?.type!=="i32" || attrs.schema_version?.value!==SCHEMA_VERSION ||
    attrs.package_name?.type!=="str" ||
    typeof attrs.package_name?.value!=="string" ||
    attrs.severity?.type!=="i32" ||
    typeof attrs.severity?.value!=="number" ||
    ![1,2,3,4].includes(attrs.severity.value) ||
    attrs.issued_at_ms?.type!=="u64" || typeof attrs.issued_at_ms?.value!=="bigint") return null;
  if(entity.contentType !== "application/json" ||
    !entity.key || !/^0x[0-9a-fA-F]{64}$/.test(entity.key) ||
    !entity.creator || !isAddress(entity.creator) || !entity.owner || !isAddress(entity.owner) ||
    typeof entity.expiresAt!=="bigint" || typeof entity.createdAt!=="bigint" ||
    !entity.toJson || entity.creationFlags?.readonly !== true) return null;
  const payload=payloadSchema.safeParse(entity.toJson());
  if(!payload.success) return null;
  return {key:entity.key,creator:entity.creator,owner:entity.owner,createdAt:entity.createdAt,
    expiresAt:entity.expiresAt,packageName:attrs.package_name.value,
    severity:attrs.severity.value as Advisory["severity"],
    issuedAtMs:attrs.issued_at_ms.value, payload:payload.data, readOnly:true};
 } catch { return null; }
}
