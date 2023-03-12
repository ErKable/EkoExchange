import React from 'react'
import { useState, useEffect} from 'react'
import { ethers } from 'ethers'
import { useSigner } from 'wagmi';
import { erc20ABI } from '@wagmi/core'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import Loader from "../../components/Loader";
import { Text } from "@nextui-org/react";
export default function SellOrderz({orderInfo, trigger}){  
    const exchangeAddress = "0x62853E9eBdaaF86C1835Bb959bb0A43e508a1280" 
    const viewFacetAbi = require('../../abi/ViewFacetAbi.json')
    const sellFacetAbi = require('../../abi/SellFacetAbi.json')
    const [orderId, setOrderId] = useState()
    const [ekoAddress, setEkoAddress] = useState()
    const [ekoAmount, setEkoAmount] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [isApproved, setIsApproved] = useState(false)
    const RPC = "https://data-seed-prebsc-1-s3.binance.org:8545/";
    const provider = new ethers.providers.JsonRpcProvider(RPC);
    const[tokenName, setTokenName] = useState()
    const[stableName, setStableName] = useState()
    const { data: signer } = useSigner();

    useEffect(() => {
        fetchEkoStableAddress()
        getTokenNames()
    }, [orderId])

    const notyf = new Notyf({
        position: { x: "center", y: "top" },
        duration: 5000,
    });

    async function getTokenNames(){     
        const es = new ethers.Contract(orderInfo.requestingToken, erc20ABI, provider)
        const stable = await es.name()
        //console.log('sell order ES name', stable)
        setStableName(stable)
       
        const st = new ethers.Contract(orderInfo.givingToken, erc20ABI, provider)
        const token = await st.name()
        //console.log('sell order ST name', token)
        setTokenName(token);
        setTokenName(token)
    }

    async function fetchEkoStableAddress(){      
        const c = new ethers.Contract(exchangeAddress, viewFacetAbi, provider)
        const data = await c.getOrderByOrderId(orderInfo.orderId)
        //console.log('Sell order  eko address',data.requestingToken)
        setEkoAddress('Sell order eko amount',data.requestingToken)
        //console.log(Number(data.requestingAmount))
        setEkoAmount(Number(data.requestingAmount))
    }

    async function buyFromSellOrder(){     
        try{
        const sellFacet = new ethers.Contract(exchangeAddress, sellFacetAbi, signer)
        let buy = await sellFacet.buyScoreTokensFromSellOrder(orderInfo.orderId)
        setIsLoading(true)
        await buy.wait()
        trigger()
        notyf.success("Order bought sucessfully")
        } catch {
            notyf.error("Error while buying")
        } finally{
            setIsLoading(false)
        }

    }
    async function approve(){
        try{
            const token = new ethers.Contract(orderInfo.requestingToken, erc20ABI, signer)
            let app = await token.approve(exchangeAddress, orderInfo.givingAmount)
            setIsLoading(true)
            await app.wait()
            setIsApproved(true)
            notyf.success(`${stableName} approved succesfully`)
        } catch {
            notyf.error(`Error while approving ${stableName}`)
        } finally{
            setIsLoading(false)
        }
    }
    

    return(


        <>
        <div className="relative shadow-md sm:rounded-lg testCard dark:bg-slate-800 text-black dark:text-white">
        <div className="cardinfo">

            <div className='orderInfo'>
              <h1>Requesting ST</h1>       
            <h1>{stableName}</h1>
          </div>
            <div className='orderInfo'>
              <h1>Requesting Amount</h1>       
            <h1>{orderInfo.givingAmount}</h1>
            </div>
        </div>
        
            <div className='orderInfo'><h1>Giving ES</h1>       
            <h1>{tokenName}</h1></div>
            <div className='orderInfo'><h1>Giving Amount</h1>       
            <h1>{orderInfo.requestingAmount}</h1></div>
            
            <td class="px-16 py-4 text-grey-700">{isApproved ? null : (isLoading ? <Loader /> : <button onClick={() => approve()} className="create-btn">Approve {stableName}</button>)}</td>
            <td class="px-16 py-4 text-grey-700">{isApproved ?(isLoading ?  <Loader /> : <button onClick={() => buyFromSellOrder()} className="create-btn">Buy {tokenName}</button>) : null}</td>
        
      </div>
        </>
        
    )
}