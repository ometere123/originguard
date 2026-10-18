/** Public, independent, non-custodial query tool. Never requires a wallet or access key. */
import { createPublicClient } from "@arkiv-network/sdk";
import { tiramisu } from "@arkiv-network/sdk/chains";
import { str, i32 } from "@arkiv-network/sdk/attr";
import { eq, gte } from "@arkiv-network/sdk/query";
import { http } from "viem";
import { parseWallet } from "../src/lib/validation/advisory";
import { decodeAdvisory } from "../src/lib/arkiv/decode";
import { ARKIV_RPC_URL, PROJECT_ID, RECORD_TYPE } from "../src/lib/config";

function option(name:string) {const i=process.argv.indexOf(name);return i>=0?process.argv[i+1]:undefined;}
async function main(){
 const pkg=option("--package")?.trim().toLowerCase();const min=option("--min-severity");const creatorRaw=option("--creator");
 if(pkg!==undefined&&!pkg)throw new Error("--package must not be empty");
 const creator=creatorRaw?parseWallet(creatorRaw):undefined;
 if(creatorRaw&&!creator)throw new Error("--creator is not an EVM wallet address");
 const severity=min?Number(min):1;
 if(!Number.isInteger(severity)||severity<1||severity>4) throw new Error("--min-severity must be 1, 2, 3 or 4");
 const client=createPublicClient({chain:tiramisu,transport:http(ARKIV_RPC_URL,{timeout:15000,retryCount:1})});
 const conditions=[eq("project",str(PROJECT_ID)),eq("record_type",str(RECORD_TYPE))];
 if(pkg)conditions.push(eq("package_name",str(pkg.toLowerCase())));
 if(severity>1)conditions.push(gte("severity",i32(severity)));
 let q=client.select({key:true,creator:true,owner:true,createdAt:true,expiresAt:true,contentType:true,attributes:true,payload:true,creationFlags:true}).where(conditions).limit(100);
 if(creator)q=q.createdBy(creator);
 let page=await q.fetch();let count=0;let invalid=0;
 console.log(`OriginGuard direct read | chain=${await client.getChainId()} | snapshot=${page.blockNumber.toString()}`);
 while(true){for(const entity of page.entities){const advisory=decodeAdvisory(entity);if(!advisory){invalid++;continue;}
   count++;console.log(JSON.stringify({key:advisory.key,creator:advisory.creator,owner:advisory.owner,package:advisory.packageName,severity:advisory.severity,title:advisory.payload.title,claimedPublisher:advisory.payload.claimedPublisher,expiresAt:advisory.expiresAt.toString()}));}
   if(!page.hasNextPage())break;
   page=await page.next();
 }
 console.error(`Valid ${count}; schema-rejected ${invalid}. Creator verification derives ONLY from system $creator.`);
}
main().catch(error=>{console.error("Direct Arkiv read failed:",error);process.exitCode=1;});
