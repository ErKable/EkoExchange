import React from "react";
import { useState, useEffect } from "react";
import { Text } from "@nextui-org/react";
import { ethers } from "ethers";
import { useAccount, useSigner } from "wagmi";
import { erc20ABI } from "@wagmi/core";
import Loader from "../../components/Loader";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export default function BuyOrder({ orderInfo, trigger, data }) {
  const exchangeAddress = "0x62853E9eBdaaF86C1835Bb959bb0A43e508a1280";
  const viewFacetAbi = require("../../abi/ViewFacetAbi.json");
  const buyFacetAbi = require("../../abi/BuyFacetAbi.json");
  const [ekoAddress, setEkoAddress] = useState();
  const [ekoAmount, setEkoAmount] = useState();
  const [isLoading, setIsLoading] = useState(false)
  const [isApproved, setIsApproved] = useState(false)
  const RPC = "https://data-seed-prebsc-1-s3.binance.org:8545/";
  const provider = new ethers.providers.JsonRpcProvider(RPC);
  const [tokenName, setTokenName] = useState();
  const [stableName, setStableName] = useState();
  const { data: signer } = useSigner();
  const {account, isConnected} = useAccount()
  const notyf = new Notyf({
    position: { x: "center", y: "top" },
    duration: 5000,
  });

  useEffect(() => {
    fetchEkoStableAddress();
    getTokenNames();
  }, []);

  async function fetchEkoStableAddress() {  
    const c = new ethers.Contract(exchangeAddress, viewFacetAbi, provider)
    const data = await c.getOrderByOrderId(orderInfo.orderId)
    console.log('Buy order ES address',data.requestingToken);
    setEkoAddress('Buy order ES amount',data.requestingToken);
    console.log(Number(data.requestingAmount));
    setEkoAmount(Number(data.requestingAmount));
  }

  async function getTokenNames() {
    const es = new ethers.Contract(orderInfo.givingToken, erc20ABI, provider)
    const stable = await es.name()
    console.log('buy order ES name', stable)
    setStableName(stable);
 
    const st = new ethers.Contract(orderInfo.requestingToken, erc20ABI, provider)
    const token = await st.name()
    console.log('buy order ST name', token)
    setTokenName(token);
  }

  async function approve(){
    try{
      const token = new ethers.Contract(orderInfo.requestingToken, erc20ABI, signer);
      let app = await token.approve(exchangeAddress, orderInfo.requestingAmount);
      setIsLoading(true)
      await app.wait();
      notyf.success(`${tokenName} approve succesfully`)
      setIsApproved(true)
    } catch{
      notyf.error(`Error while approving ${tokenName}`)
    }finally{
      setIsLoading(false)
    }
  }

  async function buyFromSellOrder() {   
    try{
      const buyFacet = new ethers.Contract(exchangeAddress, buyFacetAbi, signer);
      let buy = await buyFacet.sellScoreTokenToABuyOrder(orderInfo.orderId);
      setIsLoading(true)
      await buy.wait();
      notyf.success(`${tokenName} sold for ${stableName}`)
      trigger();
    } catch{
      notyf.error(`Error while exchanging tokens`)
    } finally{
      setIsLoading(false)
    }
  }

  return (
    <>
    <div className="relative shadow-md sm:rounded-lg testCard">
        <div className="cardinfo">

            <div className='orderInfo'>
              <Text b>Requesting ST</Text>       
            <Text>{tokenName}</Text>
          </div>
            <div className='orderInfo'>
              <Text b >Requesting Amount</Text>       
            <Text>{orderInfo.requestingAmount}</Text>
            </div>
        </div>
        
            <div className='orderInfo'><Text b >Giving ES</Text>       
            <Text>{stableName}</Text></div>
            <div className='orderInfo'><Text b >Giving Amount</Text>       
            <Text>{orderInfo.givingAmount}</Text></div>
            
            <td class="px-16 py-4 text-grey-700">{isApproved ? null : (isLoading ? <Loader /> : <button onClick={() => approve()} className="create-btn">Approve {tokenName}</button>)}</td>
            <td class="px-16 py-4 text-grey-700">{isApproved? (isLoading ?  <Loader /> : <button onClick={() => buyFromSellOrder()} className="create-btn">Sell your {tokenName}</button>) : null}</td>
        
      </div>
    </>
  );
}
