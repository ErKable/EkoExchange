import React from 'react'
import { useState, useEffect} from 'react'
import { ethers } from 'ethers'
import { Input, Button  } from "@nextui-org/react";
import { useSigner } from 'wagmi';
import { readContract, erc20ABI } from '@wagmi/core'

export default function SellScoreTokenToBuyOrder({exchangeAddress}){

    const [stAddress, setSTaddress] = useState()
    const [orderId, setOrderId] = useState()
    const viewFacetAbi = require('../../abi/ViewFacetAbi.json')
    const BuyFacetAbi = require('../../abi/BuyFacetAbi.json')
    const { data: signer } = useSigner();

    useEffect(() =>{
       fetchSTAddress()      
    }, [])

    async function fetchSTAddress(){
        const data = await readContract({
            address: exchangeAddress,
            abi: viewFacetAbi,
            functionName: 'getScoreTokenAddress',
            
          })
          console.log(data)
          setSTaddress(data)
    }

    async function sellToBuyOrder(){

        const data = await readContract({
            address: exchangeAddress,
            abi: viewFacetAbi,
            functionName: 'getOrderByOrderId',
            args: [orderId]
          })
        console.log(Number(data.requestingAmount))
        let amToApp = Number(data.requestingAmount)
        
        const token = new ethers.Contract(stAddress, erc20ABI, signer)
        let app = await token.approve(exchangeAddress, amToApp)
        await app.wait()

        const buyFacet = new ethers.Contract(exchangeAddress, BuyFacetAbi, signer)
        let sell = await buyFacet.sellScoreTokenToABuyOrder(orderId)
        await sell.wait()
    }

    return(
        <div style={{margin:'2%', border:'white 2px solid'}}>
            <label></label>
            <Input placeholder="Insert order ID" onChange={(e) => setOrderId(e.target.value)} />
            <Button onClick={() => sellToBuyOrder()}>Buy</Button>
        </div>
    )
}

