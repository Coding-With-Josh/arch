import { Connection, PublicKey } from '@solana/web3.js';

// Sonic Testnet Configuration
export const SONIC_CONFIG = {
    RPC_URL: "https://api.testnet.sonic.game",
    NETWORK: "testnet",
    EXPLORER_URL: "https://explorer.sonic.game",
    FAUCET_URL: "https://faucet.sonic.game",
    BRIDGE_URL: "https://bridge.sonic.game"
};

// Create Sonic-specific connection instance
export const sonicConnection = new Connection(SONIC_CONFIG.RPC_URL, 'confirmed');

// Helper functions for Sonic integration
export const getSonicExplorerUrl = (txHash: string): string => {
    return `${SONIC_CONFIG.EXPLORER_URL}/tx/${txHash}`;
};

export const getBridgeUrl = (): string => {
    return SONIC_CONFIG.BRIDGE_URL;
};

export const getFaucetUrl = (): string => {
    return SONIC_CONFIG.FAUCET_URL;
};