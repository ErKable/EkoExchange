import { Button } from "@nextui-org/react";
import React from 'react'
import { useState, useEffect} from 'react'
import { ethers } from 'ethers'
import { useSigner } from 'wagmi';
import { readContract, erc20ABI } from '@wagmi/core'

export default function BuyOrder({orderInfo, trigger}){
    const exchangeAddress = "0x62853E9eBdaaF86C1835Bb959bb0A43e508a1280"
    const viewFacetAbi = require('../../abi/ViewFacetAbi.json')
    const buyFacetAbi = require('../../abi/BuyFacetAbi.json')
    const [orderId, setOrderId] = useState()
    const [ekoAddress, setEkoAddress] = useState()
    const [ekoAmount, setEkoAmount] = useState()

    const[tokenName, setTokenName] = useState()
    const[stableName, setStableName] = useState()
    const { data: signer } = useSigner();

    useEffect(() => {
        fetchEkoStableAddress()
        getTokenNames()
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

    async function getTokenNames(){
        const stable = await readContract({
            address: orderInfo.givingToken,
            abi: erc20ABI,
            functionName: 'name',
        })
        setStableName(stable)
        const token = await readContract({
            address: orderInfo.requestingToken,
            abi: erc20ABI,
            functionName: 'name',
        })
        setTokenName(token)
    }

    async function buyFromSellOrder(){
        const token = new ethers.Contract(orderInfo.requestingToken, erc20ABI, signer)
        let app = await token.approve(exchangeAddress, orderInfo.requestingAmount)
        
        await app.wait()

        const buyFacet = new ethers.Contract(exchangeAddress, buyFacetAbi, signer)
        let buy = await buyFacet.sellScoreTokenToABuyOrder(orderInfo.orderId)
        await buy.wait()
        trigger()
    }

    return(
        
            <div style={{height: '400px', width: '200 px', border: 'solid 2px black'}}>
                <p>ORDER ID: {orderInfo.orderId}</p>
                <p>Requesting Token: {tokenName}</p>
                <p>Requesting Amount: {orderInfo.requestingAmount}</p>
                <p>Giving Token: {stableName}</p>
                <p>Giving Amount: {orderInfo.givingAmount}</p>

                <Button onClick={() => buyFromSellOrder()}>Buy from sell order</Button> 

            </div>
        
    )
}