import { configureChains, createClient } from "@wagmi/core";
import { arbitrum, avalanche, mainnet, polygon } from "@wagmi/core/chains";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/html";
import { neonDevnet } from "./neon-devnet.tsx";
// 1. Define constants
const projectId = import.meta.env.VITE_PROJECT_ID;
const chains = [mainnet, polygon, avalanche, arbitrum, neonDevnet];

// 2. Configure wagmi client
const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ chains, version: 1, projectId }),
  provider,
});

// 3. Create ethereum and modal clients
const ethereumClient = new EthereumClient(wagmiClient, chains);
export const web3Modal = new Web3Modal(
  {
    projectId,
    
  },
  ethereumClient
);
