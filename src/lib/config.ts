export const PROJECT_ID = "originguard-global-tour-2026" as const;
export const RECORD_TYPE = "security_advisory" as const;
export const SCHEMA_VERSION = 1 as const;
export const ARKIV_RPC_URL = process.env.NEXT_PUBLIC_ARKIV_RPC_URL || "https://rpc.tiramisu.db-chain.testnet.arkiv.network";
export const ARKIV_EXPLORER = "https://tiramisu.explorer.arkiv.network";
export const CHAIN_ID = 7738577;
export const PAGE_SIZE = 12;
export const DEMO_WALLET = process.env.NEXT_PUBLIC_DEMO_TRUSTED_WALLET || "";
export const DEMO_KEYS = [process.env.NEXT_PUBLIC_DEMO_ENTITY_A,process.env.NEXT_PUBLIC_DEMO_ENTITY_B,process.env.NEXT_PUBLIC_DEMO_ENTITY_C].filter((value):value is string=> Boolean(value));
