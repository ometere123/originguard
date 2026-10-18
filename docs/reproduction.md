# Judge reproduction runbook

**Current status:** Needs completion on a network-connected machine with two funded test wallets. A source-code ZIP does not constitute completed on-chain evidence.

1. Clone the MIT repo `https://github.com/ometere123/originguard` after it is created; verify the public commit.
2. Run Node 22.10+; `npm ci` (only after genuine `package-lock.json` is generated and committed); `npm run typecheck && npm run lint && npm test && npm run build`.
3. `npm run smoke:arkiv`: must print actual chain 7738577 and an actual block number.
4. Open live deployment in an anonymous browser; confirm feed loads real network data without MetaMask.
5. In MetaMask, connect Wallet A funded with test GLM; publish synthetic Advisory A and B, and write their exact entity keys and transaction hashes in `docs/evidence.md`. Wait for confirmation, then reload.
6. Switch MetaMask to Wallet B funded with test GLM; publish Advisory C with the *same claimedPublisher* but a different title. Capture actual key and tx.
7. Configure the Vercel environment with the three keys and Wallet A address, redeploy and use **Verify origin -> Load on-chain demo**. Confirm A/B creator equal, C creator different, publisher claim equal.
8. In public feed enter Wallet A and check `Show only records created by this wallet`, then turn it off and observe C reappear if other filters match.
9. `npm run query:advisories -- --creator <A>` and again for B. Show A's two keys absent from B filter and C absent from A filter. Also `--min-severity 3`.
10. Verify all explorer URLs manually on Tiramisu (SDK/entity paths can change); record exact explorer links and confirm they resolve.
11. Confirm `docs/evidence.md`, `arkiv/friction.md`, Devfolio answers, final demo video ≤180 s, app uptime and green GitHub Actions on the final deadline SHA.

No local fake chain, fixtures or screenshots are presented as on-chain proof. SDK read errors, empty pages and invalid payloads must be reported honestly.
