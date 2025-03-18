'use client';

import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection } from '@solana/web3.js';
import { SONIC_CONFIG } from '@/lib/sonic/sonic-config';
import { sonicConnection } from '@/lib/sonic/sonic-config';
import { PROGRAM_ID, programId, SONIC_NETWORK } from '@/lib/sonic/config';

require('@solana/wallet-adapter-react-ui/styles.css');

interface Props {
    children: ReactNode;
}

export const CustomWalletProvider: FC<Props> = ({ children }) => {
    // Using Sonic connection directly
    const [connection, setConnection] = useState<Connection | null>(null);

    useEffect(() => {
        setConnection(sonicConnection);
    }, []);

    if (!connection) {
        return (
            <div className="flex h-screen items-center justify-center bg-zinc-950">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
                    <p>Connecting to Sonic network...</p><br />
                    <p>Program id: {programId.toString()}</p>
                </div>
            </div>
        );
    }

    // Configure wallet for Sonic
    const walletConfig = {
        wallets: [], // Add your supported wallets here
        autoConnect: true,
        endpoint: SONIC_CONFIG.RPC_URL,
        network: SONIC_CONFIG.NETWORK
    };

    return (
        <ConnectionProvider endpoint={SONIC_CONFIG.RPC_URL} config={{ commitment: 'confirmed' }}>
            <WalletProvider wallets={walletConfig.wallets} autoConnect={walletConfig.autoConnect}>
                <WalletModalProvider>
                    <WalletErrorHandler network={SONIC_CONFIG.NETWORK}>
                        {children}
                    </WalletErrorHandler>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

const WalletErrorHandler: FC<{ children: ReactNode; network: string }> = ({ children, network }) => {
    const { wallet, connected } = useWallet();

    const handleWalletError = useCallback((error: Error) => {
        console.error('Wallet error:', error);
        toast({
            title: "Wallet Error",
            description: `${error.message || "Failed to connect wallet"}. Please try again or use a different wallet.`,
            variant: "destructive",
        });
    }, []);

    useEffect(() => {
        if (wallet) {
            wallet.adapter
                .on('error', handleWalletError)
                .on('connect', () => {
                    toast({
                        title: "Wallet Connected",
                        description: `Successfully connected to ${wallet.adapter.name} on Sonic ${network}`,
                    });
                })
                .on('disconnect', () => {
                    toast({
                        title: "Wallet Disconnected",
                        description: "Your wallet has been disconnected",
                    });
                });

            return () => {
                wallet.adapter
                    .off('error', handleWalletError)
                    .off('connect')
                    .off('disconnect');
            };
        }
    }, [wallet, handleWalletError, network]);

    return <>{children}</>;
};

export function WalletButton() {
    const { connected } = useWallet();
    
    return (
        <WalletMultiButton 
            className="wallet-adapter-button-trigger"
            style={{
                backgroundColor: connected ? 'var(--primary)' : 'transparent',
                color: connected ? 'white' : 'var(--foreground)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                height: '2.5rem',
                transition: 'all 150ms',
            }}
        />
    );
}