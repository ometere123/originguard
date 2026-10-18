# OriginGuard Arkiv schema, queries and Entity Expiration

## Network and SDK

- Tiramisu chain `7738577`; default public RPC `https://rpc.tiramisu.db-chain.testnet.arkiv.network`
- `@arkiv-network/sdk@0.8.1`; browser public client and MetaMask-signed write client
- Project namespace: `originguard-global-tour-2026`

## One entity type: `security_advisory`

| Attribute name | Arkiv type | Content / use |
|---|---|---|
| `project` | `str` | `originguard-global-tour-2026`, isolates this public project |
| `record_type` | `str` | `security_advisory`, type scope |
| `schema_version` | `i32` | `1` |
| `package_name` | `str` | Exact, lowercase package identifier; indexed equality |
| `severity` | `i32` | 1 low, 2 medium, 3 high, 4 critical; indexed numeric range |
| `issued_at_ms` | `u64` | Unix milliseconds; useful for display, not asserted as authoritative time |

JSON payload under `application/json`: `title` (6–160 characters), `summary` (15–2200), `claimedPublisher` (2–100). Payload must never contain private keys, personal data or real, unverified allegations. The claim is intentionally untrusted.

Immutable `$creator`: wallet that created entity, native system attribute. Mutable `$owner`: current controller. `$key`, `$createdAt`, `$expiresAt` supplied by Arkiv. Creation `flags`: `readonly: true`, `permissionlessExtension: false`. **Entity Expiration: 30 days**, set with `ExpirationTime.fromDays(30)`. Read-only freezes payload and attributes, not deletion, ownership transfer or lifetime extension.

## Queries executed

- Public feed: `.select({key:true,creator:true,owner:true,createdAt:true,expiresAt:true,attributes:true,payload:true,creationFlags:true}).where(eq('project',str(PROJECT_ID)),eq('record_type',str(RECORD_TYPE))).limit(12).fetch()`.
- Exact package: add `eq('package_name',str(normalizedPackage))`.
- Severity threshold: add `gte('severity',i32(minimum))` for 2, 3 or 4.
- Trust restriction: add `.createdBy(trustedWallet)`. **Never** `.ownedBy()` for origin verification.
- Cursor pagination: on the exact same builder and predicates, `.cursor(previousPage.cursor).fetch()`.
- Lookup: `getEntity(entityKey)` then the same strict schema validator.
- Independent reader: `npm run query:advisories -- --creator 0x...` walks all pages without the frontend.

The query is not searching the JSON payload. Arkiv returns newest first; no unsupported `orderBy`. The schema validator deliberately rejects non-read-only or malformed entities rather than labeling them trusted.

## Off-chain-only information

Form state, user-selected wallet trust assumptions, UI presentation, project docs, code, and transient error messages. No traditional database, server-side signer or centralized authority index.
