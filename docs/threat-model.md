# OriginGuard threat model

## Security objective

Distinguish a record created by a reader-selected trusted wallet from a record containing a spoofed publisher name. Only Arkiv's on-chain `creator` system field is used for that comparison. All public payloads are untrusted.

## Attacker abilities

An attacker may publish arbitrary records with `project=originguard-global-tour-2026`, copy any package name, set `claimedPublisher` to any company, impersonate the entire visible title/summary, create many records, and transfer/delete entities they own. None of these actions can change the immutable `creator` field of an existing entity or create an entity *as another wallet* without control of that wallet's signing authority.

## Defense

1. Public query filters by typed namespace and exact schema; strict parser requires immutable creator, well-typed attributes, valid payload and read-only flag.
2. A user explicitly selects an independently trusted EVM address; it is not implicitly inferred from a mutable name or owner.
3. `.createdBy(address)` enforces the filter inside the Arkiv query, and the UI additionally checks equality for badges.
4. The comparison demo uses 2 authentic A records and 1 actual B record with identical claimed publisher text, and rejects misconfigured keys.
5. Publishing is user-signed in MetaMask; no application-owned private key or arbitrary signing API.
6. Users can reproduce all creator checks with the independent CLI and public RPC.

## Limitations

- Wallet provenance ≠ real-world legal/organizational identity and ≠ truth of the underlying advisory.
- A compromised trusted wallet can publish malicious data and will still match its creator. Trust lists must be managed out of band.
- UI data from Arkiv can be invalid/hostile and is parsed as text only; browser code must never render raw HTML from entity payloads.
- Tiramisu testnet is not a production security-advisory distribution guarantee.
- Read-only freezes content, not ownership changes, deletion, or Entity Expiration. Entities expire after 30 days unless the owner extends them.
- Malicious publishers can spam; our schema and trust filter limit accepted records but do not rate-limit chain writes.
- Anonymous public RPC can throttle reads; UI must report errors, not fake empty results.
- Cursor expiry requires a restart and is not proof of censorship.
- A shared-project tag does not establish creator authority, and any participant can reuse it.
- Demo includes only synthetic examples; no actual vulnerabilities or personal information should be entered.
