/** Read-only live smoke check. Never signs, seeds or invents records. */
import { createPublicClient } from "@arkiv-network/sdk";
import { tiramisu } from "@arkiv-network/sdk/chains";
import { http } from "viem";
import { eq } from "@arkiv-network/sdk/query";
import { str } from "@arkiv-network/sdk/attr";
import { ARKIV_RPC_URL,PROJECT_ID,RECORD_TYPE,CHAIN_ID } from "../src/lib/config";
async function main(){
 const client=createPublicClient({chain:tiramisu,transport:http(ARKIV_RPC_URL,{timeout:15000,retryCount:1})});
 const id=await client.getChainId();if(id!==CHAIN_ID)throw new Error(`Wrong chain ${id}`);
 const page=await client.select({key:true,creator:true}).where(eq("project",str(PROJECT_ID)),eq("record_type",str(RECORD_TYPE))).limit(10).fetch();
 console.log(JSON.stringify({chainId:id,block:page.blockNumber.toString(),returned:page.entities.length,keys:page.entities.map(e=>e.key)},null,2));
}
main().catch(e=>{console.error(e);process.exitCode=1;});
