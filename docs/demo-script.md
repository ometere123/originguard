# Final demonstration video — target 165 seconds, hard limit 180 seconds

**Do not record this as a real demonstration until on-chain records exist and the actual deployment works.**

**0:00–0:18 — Threat.** "Security advisories can copy a maintainer's name. Who really published this claim? OriginGuard separates the claim from the wallet that created the record."

**0:18–0:38 — Why Arkiv.** Show the public feed, no wallet connected. Explain Arkiv's permissionless query and native immutable creator. Do not claim it identifies organizations.

**0:38–1:10 — Publish.** Open MetaMask funded on Tiramisu. Show advisory fields, approve transaction, show real entity key and tx hash, reload feed. The wallet signs, not a backend.

**1:10–1:45 — Impersonation demo.** Show two Wallet A records and one Wallet B record, all with the same claimed publisher. Show creator addresses and statuses. The attacker can copy the text but not the creator wallet.

**1:45–2:12 — Independent data contract.** Show CLI terminal running `npm run query:advisories -- --creator <A>` and compare with `--creator <B>`; display real output. Show `/arkiv/schema.md`.

**2:12–2:35 — Limits.** A wallet match proves provenance, not identity or truth. Arkiv records expire and can be deleted by their owners.

**2:35–2:45 — Friction.** Show `/arkiv/friction.md` actual observations and how to reproduce them.

Use readable screen captures with actual transactions. Provide an accessible public video URL to Devfolio; do not submit only the script.
