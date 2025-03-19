import { Connection, Keypair, PublicKey } from '@solana/web3.js';

// Sonic Testnet Configuration
export const SONIC_NETWORK = 'testnet';
export const SONIC_CONFIG = {
  RPC_URL: process.env.NEXT_PUBLIC_SONIC_RPC_URL || 'https://api.testnet.sonic.game',
  NETWORK: SONIC_NETWORK,
  EXPLORER_URL: 'https://explorer.testnet.sonic.game',
};

export const PROGRAM_ID = new PublicKey("7qhC7bD9cDV9LTwjgVmGJHs5rGtrMY4pSBw1KswuaBfk");

// Create connection instance
export const sonicConnection = new Connection(SONIC_CONFIG.RPC_URL, 'confirmed');


// Export network configuration
export const networkConfig = {
  name: SONIC_NETWORK,
  endpoint: SONIC_CONFIG.RPC_URL,
  connection: sonicConnection,
  programId: PROGRAM_ID,
};
