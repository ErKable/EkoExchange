import { Button } from "@nextui-org/react";
import React from 'react'
import { useState, useEffect} from 'react'
import { ethers } from 'ethers'
import { useSigner } from 'wagmi';
import { readContract, erc20ABI } from '@wagmi/core'

export default function SellOrderz({orderInfo, trigger}){  
    const exchangeAddress = "0x62853E9eBdaaF86C1835Bb959bb0A43e508a1280" 
    const viewFacetAbi = require('../../abi/ViewFacetAbi.json')
    const sellFacetAbi = require('../../abi/SellFacetAbi.json')
    const [orderId, setOrderId] = useState()
    const [ekoAddress, setEkoAddress] = useState()
    const [ekoAmount, setEkoAmount] = useState()

    const[tokenName, setTokenName] = useState()
    const[stableName, setStableName] = useState()
    const { data: signer } = useSigner();

    useEffect(() => {
        fetchEkoStableAddress()
        getTokenNames()
    }, [orderId])

    async function getTokenNames(){
        const stable = await readContract({
            address: orderInfo.requestingToken,
            abi: erc20ABI,
            functionName: 'name',
        })
        setStableName(stable)
        const token = await readContract({
            address: orderInfo.givingToken,
            abi: erc20ABI,
            functionName: 'name',
        })
        setTokenName(token)
    }

    async function fetchEkoStableAddress(){
        const data = await readContract({
            address: exchangeAddress,
            abi: viewFacetAbi,
            functionName: 'getOrderByOrderId',
            args:[orderInfo.orderId]
          })
        console.log(data.requestingToken)
        setEkoAddress(data.requestingToken)
        console.log(Number(data.requestingAmount))
        setEkoAmount(Number(data.requestingAmount))
    }

    async function buyFromSellOrder(){
        const token = new ethers.Contract(orderInfo.givingToken, erc20ABI, signer)
        let app = await token.approve(exchangeAddress, orderInfo.givingAmount)
        await app.wait()

        const sellFacet = new ethers.Contract(exchangeAddress, sellFacetAbi, signer)
        let buy = await sellFacet.buyScoreTokensFromSellOrder(orderInfo.orderId)
        await buy.wait()
        trigger()
    }

    

    return(


        <>


        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table >
            <thead></thead>
            <tbody>
              <td class="px-12 py-4 text-grey-700">{orderInfo.orderId}</td>
              <td class="px-12 py-4 text-grey-700k">{tokenName}</td>
              <td class="px-12 py-4 text-grey-700">{orderInfo.requestingAmount}</td>
              <td class="px-20 py-4 text-grey-700">{stableName}</td>
              <td class="px-16 py-4 text-grey-700"> {orderInfo.givingAmount}</td>
              <td class="px-16 py-4 text-grey-700">  <button onClick={() => buyFromSellOrder()} className="create-btn" >Buy from sell order</button> </td>
            </tbody>
          </table>
{/*         
            <div style={{height: '400px', width: '200 px', border: 'solid 2px black'}}>
                <p>ORDER ID: {orderInfo.orderId}</p>
                <p>Requesting Token: {stableName}</p>
                <p>Requesting Amount: {orderInfo.requestingAmount}</p>
                <p>Giving Token: {tokenName}</p>
                <p>Giving Amount: {orderInfo.givingAmount}</p>

                <Button onClick={() => buyFromSellOrder()}>Buy from sell order</Button> 

            </div> */}

        </div>
        </>
        
    )
}