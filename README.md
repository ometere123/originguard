# OriginGuard

**Verify the source. Not just the claim.**

OriginGuard is an open-source, noncustodial security advisory registry built on the Arkiv Tiramisu Web3 database for Arkiv Global Tour Stop 2026. Its core security premise is simple: a publicly supplied `claimedPublisher` is not authenticating evidence. Arkiv's immutable `$creator` system attribute lets independent clients check which EVM wallet actually created the advisory.

> **Status:** audited release with three real synthetic Tiramisu entities, a public Vercel deployment, and green GitHub Actions. The public demonstration video and Devfolio submission remain separate human-controlled gates and are not claimed here.

**Competition tracks:** Security (primary), Open Source (secondary). **Licence:** MIT. **Testnet:** Tiramisu, chain `7738577`. **SDK:** `@arkiv-network/sdk@0.8.1`.

## Why it matters

Malicious or incorrect advisories can impersonate a project's name. OriginGuard makes that impersonation obvious when the reader has a trusted maintainer wallet. It does NOT assert that a wallet belongs to a real company; trust in the wallet is established out of band. Both trusted and adversarial advisory examples remain publicly readable, unless their owners delete them or they expire.

## Why Arkiv, not a conventional app database?

The public, queryable entity attributes, indexed immutable creator metadata, wallet-authenticated publishing, read-only payload flags, and entity expiration are evaluated by the same independent Arkiv network. Readers need not trust the OriginGuard frontend or operator-controlled API for creator verification. Postgres could store creator claims but cannot by itself establish chain-signed entity creation. An ordinary IPFS CID authenticates content bytes, not this native wallet-creator predicate; a subgraph or centralized API introduces indexer availability/trust. The offline Markdown docs, UI text, validation code and transient form state stay off Arkiv.

## Required local setup

1. Install **Node 22.10+**, npm and MetaMask; obtain two dedicated test-only accounts, A and B. Never publish real vulnerability allegations or personal data.
2. Run `npm ci` from the committed `package-lock.json`. The lockfile is part of the repository and is the reproducible install source.
3. Copy `.env.example` to `.env.local`. The public default RPC requires no API key. Keep access keys and private keys OUT of `NEXT_PUBLIC_` variables.
4. `npm run dev` and open http://localhost:3000. Read-only browsing never requires MetaMask.
5. Configure MetaMask for chain `7738577` (Tiramisu), get **test GLM** from https://hub.arkiv.network/faucet for both A and B, and publish as described below.
6. Run `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, and `npm run test:e2e` (requires `npx playwright install chromium`). The checked-in GitHub Actions workflow runs these gates on Ubuntu with Node 22.
7. Run `npm run smoke:arkiv` and `npm run query:advisories -- --min-severity 3` while network access is available. Only actual responses count as evidence.

No contracts need deploying. There is no database migration or private-key backend.

## Product sections

- **Advisory feed:** public, direct on-chain query, package equality filter, on-chain numeric severity filter, optional immutable-creator wallet filter, cursor pages, schema rejection count and explicit RPC error handling.
- **Publish record:** MetaMask account connect, automatic chain switching, Zod validation, wallet-signed entity creation, real entity and transaction receipt.
- **Verify origin:** key-based on-chain lookup, creator/owner/expiry evidence, an exact three-record two-wallet impersonation demonstration.
- **Developer docs:** schema, independent CLI query commands and explicit limitations.

### Three-record demonstration

1. With Wallet A publish **Advisory A** and **Advisory B**, using distinct titles, `claimedPublisher = Example Labs`, `packageName = @example/auth-core`, synthetic descriptions, severity 3 and 4.
2. Switch MetaMask to funded Wallet B and publish **Advisory C** with `claimedPublisher = Example Labs` but a clearly different synthetic title. This demonstrates that copying an identity string does not copy immutable `$creator`.
3. Record the actual publishing wallet addresses, transaction hashes and entity keys in `docs/evidence.md`.
4. Set deployment environment variables `NEXT_PUBLIC_DEMO_TRUSTED_WALLET` (A), `NEXT_PUBLIC_DEMO_ENTITY_A`, `_B`, `_C` using actual results; redeploy.
5. Click **Verify origin -> Load on-chain demo**. The code independently reads all three entities and refuses to show a forged demonstration if the required invariant is not met.

No fake or seeded local fallback data is provided.

### Live release

- Public application: https://originguard-eight.vercel.app/
- Public repository: https://github.com/ometere123/originguard
- CI workflow: https://github.com/ometere123/originguard/actions/workflows/ci.yml
- Live entity and transaction evidence: [`docs/evidence.md`](docs/evidence.md)

## Security and trust model

The system checks a **known wallet** against immutable Arkiv `$creator`. It cannot establish that this wallet is an authorized representative of any brand, that a reported vulnerability exists, or that a data item will persist forever. `$owner` is mutable and controls deletion. Read-only flags freeze payload/attributes, not lifetime or owner rights. Every entity has a 30-day expiration. Public RPC may rate-limit anonymous browser traffic. The entire payload is visible to the public. See `docs/threat-model.md`.

## Developer reproducibility

`npm run query:advisories -- --min-severity 3` fetches all pages directly from Arkiv and prints validated, creator-attributed results. Add `--creator 0xVALID_ADDRESS` to invoke Arkiv's native `createdBy` predicate, or `--package @example/auth-core` to filter an indexed string attribute. Compare A vs B and C without depending on the hosted app. `scripts/smoke-arkiv.ts` verifies chain identity and performs a public on-chain read.

## Repo structure

- `src/lib/arkiv/`: public client, indexed query, strict decoder, wallet-signed publishing
- `src/lib/validation/`: Zod advisory contract and address matching
- `src/components/` and `src/app/`: responsive UI
- `scripts/`: independent public CLI and live read-only smoke check
- `tests/` and `e2e/`: pure unit tests and browser journeys
- `arkiv/schema.md` and `arkiv/friction.md`: competition requirements
- `docs/`: threat model, evidence, reproduction, demo script, Devfolio copy

## Official resources

- [Competition agent guide](https://github.com/Arkiv-Network/global-tour-stop-pre-devcon/blob/main/AGENTS.md)
- [Rules](https://github.com/Arkiv-Network/global-tour-stop-pre-devcon/blob/main/RULES.md)
- [Rubric](https://github.com/Arkiv-Network/global-tour-stop-pre-devcon/blob/main/docs/scoring-rubric.md)
- [Submission checklist](https://github.com/Arkiv-Network/global-tour-stop-pre-devcon/blob/main/docs/submission-checklist.md)
- [Arkiv documentation](https://docs.arkiv.network/)

**Submission gate:** Production, on-chain evidence, and CI are recorded above and in [`docs/evidence.md`](docs/evidence.md). A public video and Devfolio entry are not claimed until they are actually published and confirmed. The official deadline is **18 October 2026, 23:59 London BST = 23:59 Africa/Lagos**.
