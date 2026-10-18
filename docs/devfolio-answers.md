# Devfolio final submission copy (truth-based; final user choices remain marked)

**Important:** Confirm every answer against the actual deployed system. Fields in brackets must be replaced from first-hand evidence, not guessed.

## Standard fields

**Project:** OriginGuard

**Tagline:** Verify the source, not just the claim — creator-verified software advisories on Arkiv.

**Problem:** Security advisories and software release warnings are routinely consumed through publisher labels, screenshots and centralized feeds. These claims can be spoofed. OriginGuard stores publicly readable synthetic advisory records as Arkiv entities and checks their immutable system `$creator` against a user-selected trusted wallet. A forged publisher name fails the creator-match verification even though the record still exists on-chain. This is wallet provenance, not guaranteed publisher legitimacy or vulnerability truth.

**Challenges:** The supplied source needed a genuine npm lockfile and dependency-based verification. The Arkiv integration was checked against the installed `@arkiv-network/sdk@0.8.1` declarations because generated assumptions about creator/owner, cursor builders and create receipts are unsafe. The Windows build uses `next build --webpack`; the production build passes in CI and Vercel. See [`arkiv/friction.md`](../arkiv/friction.md) for the complete observed report.

**Tracks:** Security and Open Source.

## Organizer-specific answers

1. **Live app:** https://originguard-eight.vercel.app/ (public read access verified)
2. **Any Indian team member?** [User must truthfully answer; do not assume]
3. **Why Arkiv?** Arkiv combines open wallet-signed entity creation, immutable system `$creator` predicates, indexed numeric/string attributes, read-only content flags, and direct queryability through a public client. A centralized database would put the verifier under the operator's control; plain IPFS does not itself offer this native immutable-wallet creator query; a subgraph introduces indexer reliance. The app intentionally keeps UI state, human trust assignments, and documentation off chain.
4. **How Arkiv is used:** `src/lib/arkiv/write.ts` publishes typed, read-only JSON entities with 30-day expiration via user-signed MetaMask wallet. `src/lib/arkiv/queries.ts` filters project/type, exact package, numeric severity and actual creator, using pagination and `getEntity`. `src/lib/arkiv/decode.ts` validates untrusted public records. `scripts/read-advisories.ts` independently reproduces query results.
5. **Friction link:** https://github.com/ometere123/originguard/blob/main/arkiv/friction.md
6. **Publishing wallets:** Wallet A `0xfcef676044658B5402f590daBe9E04A0F640522f` (trusted comparison wallet; created A and B); Wallet B `0x81301DD9C3605a7DA743D87b803156d8445620B0` (different creator used for C). Transaction and entity evidence is in `docs/evidence.md`.
7. **Schema link:** https://github.com/ometere123/originguard/blob/main/arkiv/schema.md
8. **Reproduction:** Follow `docs/reproduction.md`; query A vs B direct from the public RPC and inspect exact creator data using the CLI; open the live on-chain demo, compare actual three entity keys and use the browser filters.
9. **Reused pre-existing work:** The starting point was the supplied OriginGuard extracted source directory. The implementation and release audit were completed with OpenAI Codex/ChatGPT assistance on 18 October 2026; this is AI-assisted work. The shipped UI uses the repository's existing shadcn-style primitives and the declared open-source npm dependencies.
10. **Arkiv surfaces:** TypeScript SDK, Arkiv docs, Hub/faucet, block explorer; [include others only actually used].
11. **Other:** N/A unless actually selected.
12. **Time to first on-chain write:** Not measured precisely; do not submit an invented duration.
13. **LLMs:** OpenAI ChatGPT/Codex assistance was used for implementation, audit and documentation, and will be disclosed as required.
14. **One thing Arkiv should improve:** Improve the discoverability of exact SDK examples for typed query composition, `.createdBy`, cursor continuation and post-create receipt/entity-key handling. This was the main observed developer-experience friction during declaration-level verification.
15. **20-minute feedback call:** [User decision]
16. **Work within dates and reuse disclosure:** Yes, subject to the organizer's final submission review; the AI-assisted implementation and supplied source are disclosed above.
17. **Public MIT repo and accessible links:** The public MIT repository and public Vercel application are available and verified. Video and Devfolio confirmation are not claimed until published.
18. **Attend Devcon:** [User decision; optional]

**Avoid false claim:** A README draft, passing local unit tests or deployed frontend alone does not satisfy the official on-chain and Devfolio submission gates.
