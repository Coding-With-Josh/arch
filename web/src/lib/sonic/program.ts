import { networkConfig, PROGRAM_ID } from "./config";
import { sonicConnection, getSonicExplorerUrl } from './sonic-config';

import {
Connection,
PublicKey,
SystemProgram,
Transaction,
TransactionInstruction,
LAMPORTS_PER_SOL,
} from "@solana/web3.js";

export const GREETING_SIZE = 32;
export const GREETING_SEED = "hello";

export async function createGreetingAccount(
wallet: { publicKey: PublicKey; signTransaction: (tx: Transaction) => Promise<Transaction> }
): Promise<{ greetedPubkey: PublicKey; signature: string; explorerUrl: string }> {
if (!wallet.publicKey) {
    throw new Error("Wallet not connected");
}

const greetedPubkey = await PublicKey.createWithSeed(
    wallet.publicKey,
    GREETING_SEED,
    PROGRAM_ID
);

const lamports = await sonicConnection.getMinimumBalanceForRentExemption(
    GREETING_SIZE
);

const transaction = new Transaction().add(
    SystemProgram.createAccountWithSeed({
        fromPubkey: wallet.publicKey,
        basePubkey: wallet.publicKey,
        seed: GREETING_SEED,
        newAccountPubkey: greetedPubkey,
        lamports,
        space: GREETING_SIZE,
        programId: PROGRAM_ID,
    })
);

const signedTx = await wallet.signTransaction(transaction);
const signature = await sonicConnection.sendRawTransaction(
    signedTx.serialize()
);
await sonicConnection.confirmTransaction(signature, "confirmed");

return { 
    greetedPubkey, 
    signature,
    explorerUrl: getSonicExplorerUrl(signature)
};
}

export async function sendHello(
wallet: { publicKey: PublicKey; signTransaction: (tx: Transaction) => Promise<Transaction> },
greetedPubkey: PublicKey
): Promise<string> {
if (!wallet.publicKey) {
    throw new Error("Wallet not connected");
}

const instruction = new TransactionInstruction({
    keys: [{ pubkey: greetedPubkey, isSigner: false, isWritable: true }],
    programId: PROGRAM_ID,
    data: Buffer.alloc(0),
});

const transaction = new Transaction().add(instruction);
const signedTx = await wallet.signTransaction(transaction);
const signature = await sonicConnection.sendRawTransaction(
    signedTx.serialize()
);
await sonicConnection.confirmTransaction(signature, "confirmed");

return signature;
}

export async function requestAirdrop(
wallet: { publicKey: PublicKey },
amount: number = 1
): Promise<string> {
if (!wallet.publicKey) {
    throw new Error("Wallet not connected");
}

const signature = await sonicConnection.requestAirdrop(
    wallet.publicKey,
    amount * LAMPORTS_PER_SOL
);
await sonicConnection.confirmTransaction(signature, "confirmed");

return signature;
}