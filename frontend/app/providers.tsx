'use client';

import { WagmiConfig } from 'wagmi';
import { mainnet, polygon, arbitrum, sepolia } from 'wagmi/chains';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@rainbow-me/rainbowkit/styles.css';
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!;
const config = getDefaultConfig({
  appName: 'My DApp',
  projectId,
  chains: [mainnet, polygon, arbitrum, sepolia],
});

// Create a QueryClient instance
const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={config}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}
