import { describe,expect,it,vi } from "vitest";
import { switchToTiramisu, type Eip1193Provider } from "../src/lib/arkiv/write";
const CHAIN_HEX="0x7614d1";
describe("wallet network switching",()=>{
 it("checks chain after a successful switch",async()=>{
  const request=vi.fn(async ({method}:{method:string})=>method==="eth_chainId"?CHAIN_HEX:null);
  await switchToTiramisu({request} as Eip1193Provider);
  expect(request).toHaveBeenCalledWith({method:"wallet_switchEthereumChain",params:[{chainId:CHAIN_HEX}]});
 });
 it("adds the chain only for 4902 unknown-chain failures",async()=>{
  let switched=false;
  const request=vi.fn(async ({method}:{method:string})=>{
   if(method==="wallet_switchEthereumChain"&&!switched){switched=true;throw Object.assign(new Error("unknown chain"),{code:4902});}
   if(method==="eth_chainId")return CHAIN_HEX;
   return null;
  });
  await switchToTiramisu({request} as Eip1193Provider);
  expect(request.mock.calls.some(([req])=>req.method==="wallet_addEthereumChain")).toBe(true);
 });
 it("rejects even a successful wallet call if the effective chain is wrong",async()=>{
  const request=vi.fn(async ({method}:{method:string})=>method==="eth_chainId"?"0x1":null);
  await expect(switchToTiramisu({request} as Eip1193Provider)).rejects.toThrow(/not connected/);
 });
});
