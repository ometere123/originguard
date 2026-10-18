# Arkiv developer friction report — evidence pending live execution

**Status: NOT YET VERIFIED.** This is an honest testing template, not a fabricated list of bugs, incidents, or actual on-chain results. Before submission, Codex must execute the scenarios with real versions/timestamps and record real expected/observed behavior, successful or otherwise. No claims should be inserted until observed.

## Environment to record after installation

- Node.js: _pending actual `node --version`_
- npm: _pending_
- @arkiv-network/sdk: declared 0.8.1; _verify installed_
- viem: _verify installed lockfile version_
- Browser/MetaMask versions: _pending_
- Tiramisu chain ID: expected 7738577; _verify live_
- RPC URL: public Tiramisu endpoint, without credentials
- UTC timestamp: _pending_
- Git SHA: _pending_

## Required testing matrix

| Arkiv surface | Expected result | Actual observation (record after test) | Reproduction and evidence |
|---|---|---|---|
| Public client / chain ID | `getChainId() === 7738577` | Pending live run | `npm run smoke:arkiv` |
| Typed compound query | Project and record_type filters return only matching data | Pending | `npm run query:advisories` + query string |
| Numeric severity predicate | `gte('severity',i32(3))` returns high+ | Pending | CLI min-severity 3 |
| Creator predicate | `.createdBy(A)` excludes entity created by B | Pending | CLI creator A then B; include keys |
| Creation flags | Read-only entity rejects content patch | Pending | Reproduce on synthetic disposable record only, with owner approval |
| Wallet signer | MetaMask wallet A successfully creates entity | Pending | Record tx hash and explorer |
| Read-after-write | `getEntity(entityKey)` reflects confirmed transaction | Pending | Compare key, creator and payload |
| Pagination | Cursor walk is complete and consistent | Pending | Create/use enough real records (do not manufacture observations) |
| Hub/faucet | Test GLM received on both wallets | Pending | Record actual network activity and any rate-limit issue |
| Block Explorer | Entity/transaction deep links resolve correctly | Pending | Open in real browser; adjust URL convention if needed |
| Docs / SDK | Documented API matches actual SDK types | Pending | Record concrete type errors and fixes, if any |

## Recording protocol

For every verified issue or positive observation, include exact reproduction commands, expected result, actual result, tool versions, date/time, network, relevant tx/entity IDs and diagnostic excerpts with secrets redacted. If no issues occur, report that truthfully with useful positive usability notes and potential future improvements clearly distinguished from confirmed defects. Do not add invented inconvenience to chase rubric points.

**Organizer feedback question:** "One thing Arkiv should improve first" must be chosen after genuine hands-on work and stated explicitly in the private Devfolio answer.
