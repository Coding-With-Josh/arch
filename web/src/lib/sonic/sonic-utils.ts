import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { sonicConnection, SONIC_CONFIG } from './sonic-config';

export class SonicUtils {
    // Check if an account exists on Sonic network
    static async accountExists(publicKey: PublicKey): Promise<boolean> {
        const account = await sonicConnection.getAccountInfo(publicKey);
        return account !== null;
    }

    // Get account balance in SOL
    static async getBalance(publicKey: PublicKey): Promise<number> {
        const balance = await sonicConnection.getBalance(publicKey);
        return balance / LAMPORTS_PER_SOL;
    }

    // Get transaction status with retries
    static async getTransactionStatus(signature: string, maxRetries: number = 3): Promise<string> {
        for (let i = 0; i < maxRetries; i++) {
            try {
                const status = await sonicConnection.getSignatureStatus(signature);
                if (status.value?.confirmationStatus) {
                    return status.value.confirmationStatus;
                }
                await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (error) {
                if (i === maxRetries - 1) throw error;
            }
        }
        throw new Error('Transaction status check failed');
    }

    // Get network stats
    static async getNetworkStats() {
        const [slot, blockHeight, epochInfo] = await Promise.all([
            sonicConnection.getSlot(),
            sonicConnection.getBlockHeight(),
            sonicConnection.getEpochInfo(),
        ]);

        return {
            currentSlot: slot,
            blockHeight,
            epoch: epochInfo.epoch,
            slotIndex: epochInfo.slotIndex,
            slotsInEpoch: epochInfo.slotsInEpoch,
        };
    }

    // Helper to format explorer URLs
    static getExplorerUrls(address: string) {
        return {
            account: `${SONIC_CONFIG.EXPLORER_URL}/account/${address}`,
            transaction: `${SONIC_CONFIG.EXPLORER_URL}/tx/${address}`,
        };
    }
}