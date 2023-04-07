import styles from "./style";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home/Home";
import Lend from "./pages/Lend/Lend";
import Swap from "./pages/Swap/Swap";
import Exchange from "./pages/Exchange/Exchange"
import OwnerApi from './pages/OwnerApi/OwnerApi'
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, bscTestnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';



import { NextUIProvider } from '@nextui-org/react';


const { chains, provider } = configureChains(
  [bscTestnet],
  [
    
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})


const App = () => (
  <NextUIProvider>
  <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
  <div>
    <Router>
      {/* <Navbar/> */}
        <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/p2p' element={<Lend/>} />
        <Route path='/swap' element={<Swap/>} />
        <Route path='/exchange' element={<Exchange/>} />
        <Route path='/ownerApi' element={<OwnerApi/>} />
        </Routes>
      </Router>
  </div>
  </RainbowKitProvider>
</WagmiConfig>
</NextUIProvider>
);

export default App;
