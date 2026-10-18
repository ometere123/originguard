import { describe,it,expect } from "vitest";
import { decodeAdvisory } from "../src/lib/arkiv/decode";
import {PROJECT_ID,RECORD_TYPE} from "../src/lib/config";
const A="0x1111111111111111111111111111111111111111" as const;
const B="0x2222222222222222222222222222222222222222" as const;
function sample(creator: `0x${string}` = A): Parameters<typeof decodeAdvisory>[0] {return {
 key:("0x"+"a".repeat(64)) as `0x${string}`,creator,owner:creator,createdAt:123n,expiresAt:9999999999n,contentType:"application/json",
 creationFlags:{readonly:true},
 attributes:{project:{type:"str",value:PROJECT_ID},record_type:{type:"str",value:RECORD_TYPE},schema_version:{type:"i32",value:1},package_name:{type:"str",value:"@sample/auth"},severity:{type:"i32",value:3},issued_at_ms:{type:"u64",value:1800000000000n}},
 toJson:()=>({title:"Synthetic advisory",summary:"This is a synthetic issue for hackathon tests",claimedPublisher:"Example Labs"})
 };}
describe("on-chain entity validation",()=>{
 it("parses a read-only entity and retains actual creator",()=>{const record=decodeAdvisory(sample());expect(record?.creator).toEqual(A);expect(record?.readOnly).toBe(true);});
 it("shows a copied claim cannot forge creator",()=>{const real=decodeAdvisory(sample(A));const forged=decodeAdvisory(sample(B));expect(real?.payload.claimedPublisher).toBe(forged?.payload.claimedPublisher);expect(real?.creator).not.toBe(forged?.creator);});
 it("rejects wrong project namespaces",()=>{const a=sample();a.attributes!.project.value="attacker-project";expect(decodeAdvisory(a)).toBeNull();});
 it("rejects mutable content",()=>{const a=sample();a.creationFlags!.readonly=false;expect(decodeAdvisory(a)).toBeNull();});
 it("rejects non-JSON content",()=>{const a=sample();a.contentType="text/plain";expect(decodeAdvisory(a)).toBeNull();});
 it("rejects invalid or excessive severity",()=>{const a=sample();a.attributes!.severity.value=100;expect(decodeAdvisory(a)).toBeNull();});
 it("rejects invalid payload shape",()=>{const a=sample();a.toJson=()=>({title:"bad",summary:"no",claimedPublisher:"X"});expect(decodeAdvisory(a)).toBeNull();});
});
