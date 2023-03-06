import React from 'react'
import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { Link } from "react-router-dom";
import "./Ekolend.css"
import { TOKEN_ADDRESS, ABI, LENDING_ADDRESS, LENDING_ABI } from './contractAddresses';



const Ekolend = () => {
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('');
  const { library } = useWeb3React();

  const lendTokens = async () => {
    if (!library) return;
    const signer = library.getSigner();
    const tokenContract = new ethers.Contract(TOKEN_ADDRESS, ABI, signer);
    const lendingContract = new ethers.Contract(LENDING_ADDRESS, LENDING_ABI, signer);
    const amountInWei = ethers.utils.parseEther(amount);
    const durationInSeconds = duration * 60 * 60 * 24;

    // Approve the lending contract to spend the user's tokens
    const tx1 = await tokenContract.approve(LENDING_ADDRESS, amountInWei);
    await tx1.wait();

    // Lend tokens to the contract
    const tx2 = await lendingContract.lendTokens(amountInWei, durationInSeconds);
    await tx2.wait();

    // Reset the inputs
    setAmount('');
    setDuration('');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Lend Tokens</h1>
      <input label="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount to lend"/>
      <input label="Duration (Days)" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Enter duration to lend" />
      <button onClick={lendTokens} className="mt-4">
        Lend Tokens
      </button>
    </div>
  );
};

export default Ekolend;
