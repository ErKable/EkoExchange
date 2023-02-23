import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Nav";
import Homepage from "./pages/Homepage";
import Ekoswap from "./pages/EkoSwap/Ekoswap";
import Ekolend from "./pages/Ekolend/Ekolend";
import Exchange from "./pages/Exchange/Index";
import { useAccount, useSigner } from 'wagmi';


function App() {

  const { data: signer } = useSigner();
    const { isConnected, address } = useAccount(); 
    console.log('signer', signer)
    console.log('isConnected', isConnected)

  
  return (
    <div className="bg-white dark:bg-black transition duration-300 text-primary dark:text-secondary-light h-screen">
      <Router>
        <Navbar />

        <Routes>
          {/* Pages */}

          <Route path="/" element={<Homepage />} />
          <Route path="/ekoswap" element={<Ekoswap />} />
          <Route path="/ekolend" element={<Ekolend />} />

          <Route path="/exchange" element={<Exchange />} />

          {/* Forms */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
