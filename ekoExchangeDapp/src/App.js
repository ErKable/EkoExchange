import './App.css';
import '@rainbow-me/rainbowkit/styles.css';
import { NextUIProvider } from '@nextui-org/react';
import { createTheme } from "@nextui-org/react"
import { useAccount, useSigner } from 'wagmi';
import {Nav} from "./components"
import { ViewsView, BuyFacetView, SellFacetView, OwnerActionsView, WithdrawView, OwnershipView } from './views';

const darkTheme = createTheme({
  type: 'dark',  
});


function App() {  

const { data: signer } = useSigner();
const { isConnected, address } = useAccount(); 
console.log('signer', signer)
console.log('isConnected', isConnected)

 

  return (
        <NextUIProvider theme={darkTheme}>
          
            <Nav />
            <ViewsView />
            <BuyFacetView />
            <SellFacetView />
            <OwnerActionsView />
            <WithdrawView />
            <OwnershipView />
        </NextUIProvider>     
  );
  
}

export default App;
