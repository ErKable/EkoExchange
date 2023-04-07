import React from 'react'
import { useEffect, useState } from 'react';
import { ethers } from "ethers";
import { useAccount, useSigner } from "wagmi";
import { erc20ABI } from "@wagmi/core";
import viewFacetAbiz from "../../abi/ViewFacetAbi.json"
import { buyTable } from "../../constants";
import BuyFacetAbiz from '../../abi/BuyFacetAbi.json'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; 

const ModalBuy = ({ setModalOn, setChoice, givingToken, requestingToken, orderInfo }) => {
    const viewFacetAbi = viewFacetAbiz;
    const sellFacetAbiz = BuyFacetAbiz
    const exchangeAddress = "0x62853E9eBdaaF86C1835Bb959bb0A43e508a1280";
    //const buyFacetAbi = require("../../../abi/BuyFacetAbi.json");
    const [isLoading, setIsLoading] = useState()
    const [isApproved, setIsApproved] = useState()
    const { data: signer } = useSigner();
    const {account, isConnected} = useAccount()
/*     const [tokenName, setTokenName] = useState();
  const [stableName, setStableName] = useState(); */
  const notyf = new Notyf();
    const handleOkClick = () => {
        setChoice(true)
        setModalOn(false)
    }

    const handleCancelClick = () => {
        setChoice(false)
        setModalOn(false)
    }
    


    
  /* useEffect(() => {
    fetchEkoStableAddress();
    getTokenNames();
  }, []); */

  /* async function fetchEkoStableAddress() {  
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
  } */

    async function approve(){
        if(isConnected){
        try{
          const EkoStable = new ethers.Contract(orderInfo.requestingToken, erc20ABI, signer);
          console.log('contratto fatto')
          let app = await EkoStable.approve(exchangeAddress, orderInfo.requestingAmount);
          console.log('approvando')
          setIsLoading(true)
          await app.wait();
          notyf.success(`${requestingToken} approved succesfully`)
          setIsApproved(true)
        } catch{
          notyf.error(`Error while approving ${requestingToken}`)
        }finally{
          setIsLoading(false)
        }
      } else{
        notyf.error("Not connected")
      }
      }

    async function BuyScoreTokenFromSellOrder(){
     if(!isConnected){
      notyf.error("Connect your wallet")
     } else if(!isApproved){
      notyf.error("Approve the exchange before fulfilling an order")
     } else {
      try{
        const exchange = new ethers.Contract(exchangeAddress, sellFacetAbiz, signer)
        const buy = await exchange.sellScoreTokenToABuyOrder(orderInfo.orderId)
        await buy.wait()
        notyf.success(`Succesfully bought ${requestingToken}`)
      }catch{}
     }
    }

  return (
    // <div style={{ backgroundColor:'red' }}>Hello

// {/* <div  id="editUserModal" tabindex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full"> */}
<div  id="editUserModal" tabindex="-1" aria-hidden="true" className="absolute w-[150%] top-0 left-0 right-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
        <div className="relative w-full h-full max-w-2xl md:h-auto">
            {/* <!-- Modal content --> */}
            <form action="#" className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* <!-- Modal header --> */}
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Order Recap
                    </h3>
                    <p>Before proceding with the order check if everything is ok</p>
                    <button onClick={handleOkClick} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="editUserModal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                    </button>
                </div>
                {/* <!-- Modal body --> */}
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <label for="first-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giving ScoreToken</label>
                            <input type="text" name="first-name" id="first-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={givingToken} required="" />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label for="last-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giving Amount</label>
                            <input type="text" name="last-name" id="last-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={orderInfo.requestingAmount} required="" />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Receiving EkoStable</label>
                            <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={requestingToken} required="" />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label for="phone-number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Receiving Amount</label>
                            <input type="number" name="phone-number" id="phone-number" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={orderInfo.givingAmount} required="" />
                        </div>
                    </div>
                </div>
                {/* <!-- Modal footer --> */}
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button onClick={()=> approve()}  className="text-blue bg-blue-600 hover:bg-red focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-red-100 dark:focus:ring-blue-800" >Approve</button>
                    <button onClick={() => BuyScoreTokenFromSellOrder()} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sell Token</button>
                    <button onClick={handleOkClick} type="submit" className="text-blue bg-blue-600 hover:bg-red focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-red-100 dark:focus:ring-blue-800">Cancel</button>
                </div>
            </form>
        </div>
    </div>


    // </div>

  
  )
}

export default ModalBuy