import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Nav";
import Homepage from "./pages/Homepage";
import Ekoswap from "./pages/EkoSwap/Ekoswap";
import Ekolend from "./pages/Ekolend/Ekolend";
import Exchange from "./pages/Exchange/Index";
import SellOrder from "./pages/Exchange/SellOrder";
import BuyOrder from "./pages/Exchange/BuyOrder";


function App() {
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

          <Route path="/create-buy-order" element={<BuyOrder />} />
          <Route path="/create-sell-order" element={<SellOrder />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
