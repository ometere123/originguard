import { beforeEach, describe, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => {
  const builder = {
    where: vi.fn(), limit: vi.fn(), createdBy: vi.fn(), cursor: vi.fn(), fetch: vi.fn()
  };
  return { builder, select: vi.fn(), getEntity: vi.fn() };
});
vi.mock("../src/lib/arkiv/client", () => ({
  arkivPublicClient: { select: mocks.select, getEntity: mocks.getEntity }
}));
import { queryAdvisories, fetchAdvisory } from "../src/lib/arkiv/queries";
const A = "0x1111111111111111111111111111111111111111";
beforeEach(() => {
 vi.clearAllMocks();
 mocks.select.mockReturnValue(mocks.builder);
 mocks.builder.where.mockReturnValue(mocks.builder);
 mocks.builder.limit.mockReturnValue(mocks.builder);
 mocks.builder.createdBy.mockReturnValue(mocks.builder);
 mocks.builder.cursor.mockReturnValue(mocks.builder);
 mocks.builder.fetch.mockResolvedValue({entities:[],blockNumber:123n,cursor:undefined,hasNextPage:()=>false});
});
describe("real query-building boundary with a mocked network", () => {
 it("queries Arkiv by typed conditions and creator when explicitly selected",async()=>{
  const page=await queryAdvisories({creator:A,minSeverity:3,packageName:"@EXAMPLE/CORE",pageSize:10});
  expect(mocks.builder.where).toHaveBeenCalledTimes(1);
  expect(mocks.builder.where.mock.calls[0][0]).toHaveLength(4);
  expect(mocks.builder.createdBy).toHaveBeenCalledWith(A);
  expect(mocks.builder.limit).toHaveBeenCalledWith(10);
  expect(page.records).toEqual([]);
 });
 it("reuses a cursor with the same query and never trusts publisher text",async()=>{
  await queryAdvisories({cursor:"cursor-example"});
  expect(mocks.builder.cursor).toHaveBeenCalledWith("cursor-example");
  expect(mocks.builder.createdBy).not.toHaveBeenCalled();
 });
 it("rejects a malformed wallet before an RPC request",async()=>{
  await expect(queryAdvisories({creator:"not-a-wallet"})).rejects.toThrow(/Invalid trusted creator/);
  expect(mocks.select).not.toHaveBeenCalled();
 });
 it("rejects a malformed entity key before lookup",async()=>{
  await expect(fetchAdvisory("bad-key")).rejects.toThrow(/Invalid entity key/);
  expect(mocks.getEntity).not.toHaveBeenCalled();
 });
});
