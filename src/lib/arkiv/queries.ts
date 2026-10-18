import { NoEntityFoundError } from "@arkiv-network/sdk";
import { str, i32 } from "@arkiv-network/sdk/attr";
import { eq, gte } from "@arkiv-network/sdk/query";
import { arkivPublicClient } from "./client";
import { decodeAdvisory } from "./decode";
import { PROJECT_ID, RECORD_TYPE, PAGE_SIZE } from "@/lib/config";
import { keySchema, type Advisory, type Severity, parseWallet } from "@/lib/validation/advisory";

type Filters = { packageName?:string; minSeverity?:Severity; creator?:string; cursor?:string; pageSize?:number };
export type AdvisoryPage = { records:Advisory[]; cursor?:string; blockNumber:bigint; discarded:number };
export async function queryAdvisories(filters:Filters={}):Promise<AdvisoryPage> {
  const predicates=[eq("project",str(PROJECT_ID)),eq("record_type",str(RECORD_TYPE))];
  if(filters.packageName?.trim()) predicates.push(eq("package_name",str(filters.packageName.trim().toLowerCase())));
  if(filters.minSeverity && filters.minSeverity>1) predicates.push(gte("severity",i32(filters.minSeverity)));
  const size=Math.min(100,Math.max(1,filters.pageSize??PAGE_SIZE));
  const address=filters.creator?.trim() ? parseWallet(filters.creator) : undefined;
  if(filters.creator?.trim() && !address) throw new Error("Invalid trusted creator address");
  let builder=arkivPublicClient
    .select({key:true,creator:true,owner:true,createdAt:true,expiresAt:true,contentType:true,attributes:true,payload:true,creationFlags:true})
    .where(predicates)
    .limit(size);
  if(address) builder=builder.createdBy(address);
  if(filters.cursor) builder=builder.cursor(filters.cursor);
  const page=await builder.fetch();
  const validated=page.entities.map(decodeAdvisory);
  const records=validated.filter((a):a is Advisory => a!==null);
  return { records, cursor:page.hasNextPage()?page.cursor:undefined,
    blockNumber:page.blockNumber, discarded:validated.length-records.length };
}
export async function fetchAdvisory(key:string):Promise<Advisory|null> {
  if(!keySchema.safeParse(key).success) throw new Error("Invalid entity key");
  try {
    const entity=await arkivPublicClient.getEntity(key as `0x${string}`);
    return decodeAdvisory(entity);
  } catch(error) {
    if(error instanceof NoEntityFoundError) return null;
    throw error;
  }
}
