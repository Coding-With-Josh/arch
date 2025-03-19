import { Connection, Keypair, PublicKey } from '@solana/web3.js';

// Sonic Testnet Configuration
export const SONIC_NETWORK = 'testnet';
export const SONIC_CONFIG = {
  RPC_URL: process.env.NEXT_PUBLIC_SONIC_RPC_URL || 'https://api.testnet.sonic.game',
  NETWORK: SONIC_NETWORK,
  EXPLORER_URL: 'https://explorer.testnet.sonic.game',
};

const programKeypair = Keypair.generate();

// Get the program ID from the keypair
export const PROGRAM_ID = programKeypair.publicKey;

// Create connection instance
export const sonicConnection = new Connection(SONIC_CONFIG.RPC_URL, 'confirmed');

// Create a signer interface
export const signer = {
  publicKey: programKeypair.publicKey,
  secretKey: programKeypair.secretKey,
};

// Export network configuration
export const networkConfig = {
  name: SONIC_NETWORK,
  endpoint: SONIC_CONFIG.RPC_URL,
  connection: sonicConnection,
  programId: PROGRAM_ID,
};
