# Devfolio final submission copy (complete drafts, truth-based placeholders)

**Important:** Confirm every answer against the actual deployed system. Fields in brackets must be replaced from first-hand evidence, not guessed.

## Standard fields

**Project:** OriginGuard

**Tagline:** Verify the source, not just the claim — creator-verified software advisories on Arkiv.

**Problem:** Security advisories and software release warnings are routinely consumed through publisher labels, screenshots and centralized feeds. These claims can be spoofed. OriginGuard stores publicly readable synthetic advisory records as Arkiv entities and checks their immutable system `$creator` against a user-selected trusted wallet. A forged publisher name fails the creator-match verification even though the record still exists on-chain. This is wallet provenance, not guaranteed publisher legitimacy or vulnerability truth.

**Challenges:** [Document actual technical obstacles experienced, with exact version, reproduction and resolution. Never invent challenges.]

**Tracks:** Security and Open Source.

## Organizer-specific answers

1. **Live app:** [ACTUAL VERCEL URL; must work without authentication]
2. **Any Indian team member?** [User must truthfully answer; do not assume]
3. **Why Arkiv?** Arkiv combines open wallet-signed entity creation, immutable system `$creator` predicates, indexed numeric/string attributes, read-only content flags, and direct queryability through a public client. A centralized database would put the verifier under the operator's control; plain IPFS does not itself offer this native immutable-wallet creator query; a subgraph introduces indexer reliance. The app intentionally keeps UI state, human trust assignments, and documentation off chain.
4. **How Arkiv is used:** `src/lib/arkiv/write.ts` publishes typed, read-only JSON entities with 30-day expiration via user-signed MetaMask wallet. `src/lib/arkiv/queries.ts` filters project/type, exact package, numeric severity and actual creator, using pagination and `getEntity`. `src/lib/arkiv/decode.ts` validates untrusted public records. `scripts/read-advisories.ts` independently reproduces query results.
5. **Friction link:** https://github.com/ometere123/originguard/blob/main/arkiv/friction.md (replace pending entries with actual experiments)
6. **Publishing wallets:** [A wallet address and role], [B wallet address and role]; record direct transaction keys in evidence file.
7. **Schema link:** https://github.com/ometere123/originguard/blob/main/arkiv/schema.md
8. **Reproduction:** Follow `docs/reproduction.md`; query A vs B direct from the public RPC and inspect exact creator data using the CLI; open the live on-chain demo, compare actual three entity keys and use the browser filters.
9. **Reused pre-existing work:** [Truthfully disclose any prior scaffolding/components and baseline SHA where applicable. The current source was produced by an AI assistant on 18 Oct 2026 and must be disclosed as AI-assisted work, not falsely labeled handwritten.]
10. **Arkiv surfaces:** TypeScript SDK, Arkiv docs, Hub/faucet, block explorer; [include others only actually used].
11. **Other:** N/A unless actually selected.
12. **Time to first on-chain write:** [Select actual duration after first confirmed real Arkiv entity.]
13. **LLMs:** OpenAI GPT-6 / ChatGPT for initial code generation, and OpenAI Codex if used to complete implementation. [Correct names according to actual product session logs.]
14. **One thing Arkiv should improve:** [Use a specific, first-hand verified feedback item from friction report. Do not fabricate.]
15. **20-minute feedback call:** [User decision]
16. **Work within dates and reuse disclosure:** [Affirm only after audit]
17. **Public MIT repo and accessible links:** [Affirm only after actual audit]
18. **Attend Devcon:** [User decision; optional]

**Avoid false claim:** A README draft, passing local unit tests or deployed frontend alone does not satisfy the official on-chain and Devfolio submission gates.
