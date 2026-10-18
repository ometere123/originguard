import { describe,it,expect } from "vitest";
import { draftSchema,parseWallet,sameWallet,payloadSchema } from "../src/lib/validation/advisory";
describe("input and trust boundaries",()=>{
 it("normalizes package identifier and rejects malformed values",()=>{
  const draft=draftSchema.parse({packageName:"  @EXAMPLE/CORE ",claimedPublisher:"Example Maintainers",title:"Synthetic bulletin",summary:"Test condition that is not a real security claim",severity:"3"});
  expect(draft.packageName).toBe("@example/core");expect(draft.severity).toBe(3);
  expect(draftSchema.safeParse({...draft,severity:5}).success).toBe(false);
  expect(draftSchema.safeParse({...draft,packageName:"bad package !!"}).success).toBe(false);
 });
 it("trusts exact wallet identity, never a name or casing",()=>{
  const a="0x1111111111111111111111111111111111111111";
  const b="0x2222222222222222222222222222222222222222";
  expect(sameWallet(a,a.toUpperCase().replace("0X","0x"))).toBe(true);
  expect(sameWallet(a,b)).toBe(false);
  expect(sameWallet("Example Maintainers",a)).toBe(false);
  expect(parseWallet("not a wallet")).toBeUndefined();
 });
 it("forbids unknown payload properties and private-data extensions",()=>{
  expect(payloadSchema.safeParse({title:"Synthetic alert",summary:"A synthetic report, not actual exploit data",claimedPublisher:"Example",privateKey:"secret"}).success).toBe(false);
 });
});
