# OriginGuard live evidence register

This register contains only values read from the live Arkiv Tiramisu explorer and the independent SDK reader. All three synthetic records were created by user-approved browser-wallet transactions on 18 October 2026.

| Evidence | Wallet A | Wallet B |
|---|---|---|
| Address | `0xfcef676044658B5402f590daBe9E04A0F640522f` | `0x81301DD9C3605a7DA743D87b803156d8445620B0` |
| GLM faucet outcome | Funded sufficiently for two successful testnet creates (observed) | Funded sufficiently for one successful testnet create (observed) |
| Network / chain | Tiramisu 7738577 (verified) | Tiramisu 7738577 (verified) |

| Advisory | Entity key | Transaction hash | Claimed publisher | Creator (read back from chain) | Expiration block |
|---|---|---|---|---|---|
| A, Wallet A | `0x7fd39908e0adfa983e783a54bd3f285c80bc53454916d89496a6cc6e643f7d2f` | [`0xfac91929908097e38d146dd1de8cdecb8aaa1d71ea6a5be0fd8cafacedc49a36`](https://tiramisu.explorer.arkiv.network/tx/0xfac91929908097e38d146dd1de8cdecb8aaa1d71ea6a5be0fd8cafacedc49a36) | Example Labs | `0xfcef676044658B5402f590daBe9E04A0F640522f` | `2032653` (read by SDK) |
| B, Wallet A | `0x7dd4b4abbd3b9ee74f3c2d3659807662a68c899703441ab694c8cbbd3b7803b7` | [`0x6fe1b78da3136a1209ac05e2b22ebf6617709fa9e14812973c1ab7c970b399ad`](https://tiramisu.explorer.arkiv.network/tx/0x6fe1b78da3136a1209ac05e2b22ebf6617709fa9e14812973c1ab7c970b399ad) | Example Labs | `0xfcef676044658B5402f590daBe9E04A0F640522f` | `2032716` (read by SDK) |
| C, Wallet B (spoof) | `0xb29ce0788382ccce01715b7d495079137decc4e8a6663c267265b46ae24b7257` | [`0x8e16a8c98428265ad4f8e3ef104d8087db836f7a11bbe54ca9f7cdd4e7c6af74`](https://tiramisu.explorer.arkiv.network/tx/0x8e16a8c98428265ad4f8e3ef104d8087db836f7a11bbe54ca9f7cdd4e7c6af74) | Example Labs | `0x81301DD9C3605a7DA743D87b803156d8445620B0` | `2032844` (read by SDK) |

Entity explorer links:

- [A entity](https://tiramisu.explorer.arkiv.network/entity/0x7fd39908e0adfa983e783a54bd3f285c80bc53454916d89496a6cc6e643f7d2f)
- [B entity](https://tiramisu.explorer.arkiv.network/entity/0x7dd4b4abbd3b9ee74f3c2d3659807662a68c899703441ab694c8cbbd3b7803b7)
- [C entity](https://tiramisu.explorer.arkiv.network/entity/0xb29ce0788382ccce01715b7d495079137decc4e8a6663c267265b46ae24b7257)

Independent query used after seeding:

```bash
npm run query:advisories -- --package @example/auth-core --min-severity 3
npm run query:advisories -- --creator 0xfcef676044658B5402f590daBe9E04A0F640522f --package @example/auth-core --min-severity 3
```

Live deployed app URL: https://originguard-eight.vercel.app/
Verified deployment source commit SHA: `a03c708c6389347edd2caa4b54cc5b12a9cf4f4b`
GitHub Actions verified run URL: https://github.com/ometere123/originguard/actions/runs/39130854917
Actual tests: local lint, typecheck, unit tests, production build, Playwright E2E, live Arkiv smoke/read queries, and the corresponding GitHub Actions jobs passed. The public deployment was independently opened and its live feed returned all three records; the Wallet A creator filter returned A/B and excluded C.
Demo video URL: PENDING
Devfolio submission confirmation: PENDING

For each real record, save a readable explorer link and a reproduction CLI command. Verify that linked route exists; an unverified URL string is not independent evidence. The live browser and CLI must read identical immutable `creator` for each entity.
