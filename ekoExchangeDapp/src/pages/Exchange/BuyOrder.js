import { Button } from "@nextui-org/react";
import React from 'react'
import { useState, useEffect} from 'react'
import { ethers } from 'ethers'
import { useSigner } from 'wagmi';
import { readContract, erc20ABI } from '@wagmi/core'

export default function BuyOrder({orderInfo, trigger}){
    const exchangeAddress = "0xE1D5D978FB6162d94DB7aD0572bfFF2EeEc02DC3"
    const viewFacetAbi = require('../../abi/ViewFacetAbi.json')
    const buyFacetAbi = require('../../abi/BuyFacetAbi.json')
    const [orderId, setOrderId] = useState()
    const [ekoAddress, setEkoAddress] = useState()
    const [ekoAmount, setEkoAmount] = useState()
    const { data: signer } = useSigner();

    useEffect(() => {
        fetchEkoStableAddress()
    }, [])

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
        const token = new ethers.Contract(ekoAddress, erc20ABI, signer)
        let app = await token.approve(exchangeAddress, ekoAmount)
        await app.wait()

        const buyFacet = new ethers.Contract(exchangeAddress, buyFacetAbi, signer)
        let buy = await buyFacet.sellScoreTokenToABuyOrder(orderInfo.orderId)
        await buy.wait()
        trigger()
    }

    return(
        
            <div style={{height: '400px', width: '200 px', border: 'solid 2px black'}}>
                <p>ORDER ID: {orderInfo.orderId}</p>
                <p>Requesting Token: {orderInfo.requestingToken}</p>
                <p>Requesting Amount: {orderInfo.requestingAmount}</p>
                <p>Giving Token: {orderInfo.givingToken}</p>
                <p>Giving Amount: {orderInfo.givingAmount}</p>

                <Button onClick={() => buyFromSellOrder()}>Buy from sell order</Button> 

            </div>
        
    )
}