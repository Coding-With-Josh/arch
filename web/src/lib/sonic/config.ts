import { Connection, Keypair, PublicKey } from '@solana/web3.js';

// Sonic Testnet Configuration
export const SONIC_RPC_URL = 'https://api.testnet.sonic.game';
export const SONIC_NETWORK = 'testnet';

// Create connection instance
export const connection = new Connection(SONIC_RPC_URL, 'confirmed');

// Create a new keypair
export const programKeypair = Keypair.generate();

// Get the program ID from the keypair
export const programId = programKeypair.publicKey;

// Create a signer interface
export const signer = {
  publicKey: programKeypair.publicKey,
  secretKey: programKeypair.secretKey,
};

// Program ID - Replace with your actual program ID
export const PROGRAM_ID = new PublicKey('programId'); // Add your program ID once deployed

// Export network configuration
export const networkConfig = {
  name: SONIC_NETWORK,
  endpoint: SONIC_RPC_URL,
  connection: connection,
  programId: PROGRAM_ID,
};
