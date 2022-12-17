import '../styles/globals.css'
import { WagmiConfig, createClient, configureChains, chain, Chain, defaultChains } from 'wagmi'
import type { AppProps } from 'next/app'
import { publicProvider } from 'wagmi/providers/public'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { ConnectKitProvider } from 'connectkit'

const { chains, provider, webSocketProvider } = configureChains(
  [
    process.env.NEXT_PUBLIC_ALCHEMY_NETWORK == "mainnet"
      ? chain.mainnet
      : chain.goerli,
  ],
  [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
      priority: 0,
      weight: 1,
    }),
    publicProvider({ priority: 1, weight: 2 }),
  ]
);

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'Wizzmas',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider
        theme="retro"
        customTheme={{
          '--ck-font-family': '"Alagard"',
          '--ck-body-background': '#eee',
        }}
      >
        <Component {...pageProps} />
      </ConnectKitProvider>
    </WagmiConfig>
  )
}
