# Arkiv developer friction report — verified 18 October 2026

This report records observations made while building and exercising OriginGuard against the public Tiramisu testnet. It does not turn untested operations into claims. The three writes were user-approved MetaMask transactions; all read results below came from the public RPC or explorer.

## Environment to record after installation

- Node.js: `v22.23.3`
- npm: `10.9.9`
- `@arkiv-network/sdk`: `0.8.1`
- viem: `2.57.7`
- Next.js: `16.4.2`; React: `19.3.1`; TypeScript: `5.9.3`
- Browser/MetaMask: connected Chrome profile with MetaMask extension; the extension version was not captured
- Tiramisu chain ID: `7738577` (live)
- RPC URL: `https://rpc.tiramisu.db-chain.testnet.arkiv.network`
- Test date: `18 October 2026`, Africa/Lagos
- Code commit used for the initial verified deployment: `a03c708c6389347edd2caa4b54cc5b12a9cf4f4b`

## Required testing matrix

| Arkiv surface | Expected result | Actual observation (record after test) | Reproduction and evidence |
|---|---|---|---|
| Public client / chain ID | `getChainId() === 7738577` | Passed. The live smoke command returned chain `7738577` and a current block. | `npm run smoke:arkiv` |
| Typed compound query | Project and record_type filters return only matching data | Passed. The independent reader returned only the three seeded `@example/auth-core` records and rejected zero schema records. | `npm run query:advisories -- --package @example/auth-core --min-severity 3` |
| Numeric severity predicate | `gte('severity',i32(3))` returns high+ | Passed. Minimum severity 4 returned only Advisory B (severity 4). | `npm run query:advisories -- --package @example/auth-core --min-severity 4` |
| Creator predicate | `.createdBy(A)` excludes entity created by B | Passed. Wallet A returned A and B; Wallet B returned only C. | `npm run query:advisories -- --creator <A>` and `--creator <B>` |
| Creation flags | Read-only entity rejects content patch | Not exercised as a mutation. The three required records were created with `readonly: true` and `permissionlessExtension: false`; no additional destructive test was performed. | `src/lib/arkiv/write.ts`, `arkiv/schema.md` |
| Wallet signer | MetaMask wallet A successfully creates entity | Passed for A and B from Wallet A, and C from Wallet B; explorer transaction pages show success and the expected sender. | `docs/evidence.md` |
| Read-after-write | `getEntity(entityKey)` reflects confirmed transaction | Passed for all three keys. The app verification view and independent reader returned matching key, creator, owner, payload and expiration data. | `docs/evidence.md` |
| Pagination | Cursor walk is complete and consistent | The cursor path is covered by the integration test and uses the same typed builder. Live data fit on one page, so a multi-page chain walk was not stress-tested. | `tests/query.integration.test.ts`; `src/lib/arkiv/queries.ts` |
| Hub/faucet | Test GLM received on both wallets | Both accounts had enough test GLM for their successful required creates. The faucet UI itself was not used as independent evidence. | Successful transaction links in `docs/evidence.md` |
| Block Explorer | Entity/transaction deep links resolve correctly | Passed for the three transaction links; entity links are also emitted in the application evidence panel. | Explorer links in `docs/evidence.md` |
| Docs / SDK | Documented API matches actual SDK types | Passed after inspecting the installed 0.8.1 declarations. `createEntity`, typed predicates, `.createdBy`, cursor fetch, content type, flags and receipt fields match the implementation. | `src/lib/arkiv/`, `arkiv/schema.md` |

## Observed implementation friction

- The supplied source needed a real lockfile before clean-clone CI could be trusted. Generating it with npm and validating `npm ci` on GitHub removed that ambiguity.
- The Windows development environment did not produce a reliable Turbopack production build, so the final build script uses Next's supported Webpack build. The same production build passes in GitHub Actions and Vercel.
- The SDK's precise builder and entity property shapes were easiest to verify from the installed TypeScript declarations alongside the official docs. In particular, `$creator` is immutable provenance while `$owner` is current control; using owner for trust would be incorrect.
- Anonymous public reads worked, but the public RPC remains an external availability and rate-limit dependency. The UI reports query failures instead of rendering fallback records.
- The connected MetaMask browser profile produced one console error from a wallet extension attempting to redefine `window.ethereum`; no OriginGuard source error accompanied it. This was treated as an environment/extension warning, not application success evidence.

## Recording protocol

For every verified issue or positive observation, include exact reproduction commands, expected result, actual result, tool versions, date/time, network, relevant tx/entity IDs and diagnostic excerpts with secrets redacted. If no issues occur, report that truthfully with useful positive usability notes and potential future improvements clearly distinguished from confirmed defects. Do not add invented inconvenience to chase rubric points.

**Organizer feedback question:** Based on this run, Arkiv could improve the discoverability of exact SDK examples for typed query composition, creator predicates, cursor continuation and post-create receipt/entity-key handling. The implementation was correct after declaration-level verification, but those details were not safe to infer from generated examples.
