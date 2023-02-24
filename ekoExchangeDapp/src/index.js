import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { bsc, bscTestnet} from "wagmi/chains";
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { RainbowKitProvider, connectorsForWallets } from '@rainbow-me/rainbowkit';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import {
  argentWallet,
  braveWallet,
  imTokenWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  omniWallet,
  rainbowWallet,
  trustWallet,
  walletConnectWallet,
  coinbaseWallet
} from '@rainbow-me/rainbowkit/wallets';
const { chains, provider } = configureChains(
  [bscTestnet],
  [alchemyProvider({ apiKey: '6mDnh0_FqrDQzdcOCI_O5NkDs70x4VYp' }), publicProvider()]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Inject your wallet',
    wallets: [injectedWallet({ chains })]
  },
  {
    groupName: 'Select your wallet',
    wallets: [
      metaMaskWallet({ chains, shimDisconnect: true }),
      trustWallet({ chains, shimDisconnect: true }),
      coinbaseWallet({ appName: 'EkoExchange', chains })
    ]
  },
  {
    groupName: 'Others',
    wallets: [
      walletConnectWallet({ chains }),
      ledgerWallet({ chains }),
      braveWallet({ chains }),
      argentWallet({ chains }),
      imTokenWallet({ chains }),
      omniWallet({ chains }),
      rainbowWallet({ chains })
    ]
  }
]);

const wagmiClient = createClient({
  connectors,
  autoConnect: true,
  provider
});

//const ethereumClient = new EthereumClient(wagmiClient, chains);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
      chains={chains}
      appInfo={{
        appName: 'EkoExchange'
      }}
    >
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </RainbowKitProvider>
  </WagmiConfig>
);

