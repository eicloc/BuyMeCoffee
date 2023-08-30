"use client"

import './globals.css';


import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  sepolia
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';


const { chains, publicClient } = configureChains(
  [mainnet, sepolia, polygon, optimism, arbitrum, base, zora],
  [
    alchemyProvider({ apiKey: 'OSaJ365KUsLJSD_kBYAr6w2-diLUdkR0' }),
    publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'Buy Eixoln A Coffee',
  projectId: '3ed9e1348f1f3fc8cadfa59f38fc907b',
  chains
});

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})






export const metadata = {
  title: 'Buy Me A Coffee',
  description: 'Thx for your support!!!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <WagmiConfig config={config}>
          <RainbowKitProvider chains={chains}>
            {children}
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  )
}
