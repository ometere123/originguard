import { createPublicClient } from "@arkiv-network/sdk";
import { tiramisu } from "@arkiv-network/sdk/chains";
import { http } from "viem";
import { ARKIV_RPC_URL } from "@/lib/config";
export const arkivPublicClient = createPublicClient({chain:tiramisu,transport:http(ARKIV_RPC_URL,{timeout:15000,retryCount:1})});
