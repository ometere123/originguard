import { createWalletClient, ExpirationTime, jsonToPayload } from "@arkiv-network/sdk";
import { tiramisu } from "@arkiv-network/sdk/chains";
import { i32, str, u64 } from "@arkiv-network/sdk/attr";
import { custom, getAddress, isAddress, type EIP1193Provider } from "viem";
import { CHAIN_ID, PROJECT_ID, RECORD_TYPE, SCHEMA_VERSION } from "@/lib/config";
import { draftSchema, type AdvisoryDraft, type PublishEvidence } from "@/lib/validation/advisory";

export type Eip1193Provider = { request: (args: { method:string;params?:unknown[]|object })=>Promise<unknown>; on?: (event:string, handler:(...args:unknown[])=>void)=>void; removeListener?: (event:string,handler:(...args:unknown[])=>void)=>void };
export function injectedWallet():Eip1193Provider|undefined {
 if(typeof window === "undefined") return;
 return (window as Window & {ethereum?:Eip1193Provider}).ethereum;
}
export async function switchToTiramisu(provider:Eip1193Provider):Promise<void> {
  const hexChain=`0x${CHAIN_ID.toString(16)}`;
  try { await provider.request({method:"wallet_switchEthereumChain",params:[{chainId:hexChain}]}); }
  catch(err) {
    const code=(err as {code?:number})?.code;
    if(code!==4902) throw err;
    await provider.request({method:"wallet_addEthereumChain",params:[{
      chainId:hexChain,chainName:"Arkiv Tiramisu Testnet",nativeCurrency:{name:"GLM",symbol:"GLM",decimals:18},
      rpcUrls:["https://rpc.tiramisu.db-chain.testnet.arkiv.network"],
      blockExplorerUrls:["https://tiramisu.explorer.arkiv.network"]
    }]});
    await provider.request({method:"wallet_switchEthereumChain",params:[{chainId:hexChain}]});
  }
  const current=await provider.request({method:"eth_chainId"});
  if(typeof current!=="string" || Number.parseInt(current,16)!==CHAIN_ID) throw new Error("MetaMask is not connected to Tiramisu");
}
export async function connectPublisher():Promise<{provider:Eip1193Provider;address:`0x${string}`}> {
  const provider=injectedWallet();
  if(!provider) throw new Error("MetaMask is required to publish; public reads never need a wallet");
  const accounts=await provider.request({method:"eth_requestAccounts"});
  if(!Array.isArray(accounts)||typeof accounts[0]!=="string"||!isAddress(accounts[0])) throw new Error("No valid account selected");
  await switchToTiramisu(provider);
  return {provider,address:getAddress(accounts[0])};
}
export async function publishAdvisory(provider:Eip1193Provider,address:`0x${string}`,input:AdvisoryDraft):Promise<PublishEvidence> {
  const draft=draftSchema.parse(input);
  await switchToTiramisu(provider);
  const active=await provider.request({method:"eth_accounts"});
  if(!Array.isArray(active)||typeof active[0]!=="string"||!isAddress(active[0])||getAddress(active[0])!==getAddress(address))
    throw new Error("Wallet account changed. Reconnect before publishing.");
  const client=createWalletClient({ chain:tiramisu, transport:custom(provider as unknown as EIP1193Provider), account:address });
  const result=await client.createEntity({
    contentType:"application/json",
    payload:jsonToPayload({title:draft.title,summary:draft.summary,claimedPublisher:draft.claimedPublisher}),
    attributes:{ project:str(PROJECT_ID),record_type:str(RECORD_TYPE),schema_version:i32(SCHEMA_VERSION),
      package_name:str(draft.packageName),severity:i32(draft.severity),issued_at_ms:u64(Date.now()) },
    expires:ExpirationTime.fromDays(30),
    flags:{readonly:true,permissionlessExtension:false}
  });
  return {key:result.entityKey,txHash:result.txHash,expiresAt:result.expiresAt,publisher:address};
}
