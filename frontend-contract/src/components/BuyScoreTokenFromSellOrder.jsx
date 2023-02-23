import React from 'react'
import { useState, useEffect} from 'react'
import { ethers } from 'ethers'
import { Input, Button  } from "@nextui-org/react";
import { useSigner } from 'wagmi';
import { readContract, erc20ABI } from '@wagmi/core'

export default function BuyScoreTokenFromSellOrder({exchangeAddress}){
    const viewFacetAbi = require('../abi/ViewsFacetAbi.json')
    const sellFacetAbi = require('../abi/SellFacetAbi.json')
    const [orderId, setOrderId] = useState()
    const [ekoAddress, setEkoAddress] = useState()
    const [ekoAmount, setEkoAmount] = useState()
    const { data: signer } = useSigner();

    useEffect(() => {
        fetchEkoStableAddress()
    }, [orderId])

    async function fetchEkoStableAddress(){
        const data = await readContract({
            address: exchangeAddress,
            abi: viewFacetAbi,
            functionName: 'getOrderByOrderId',
            args:[orderId]
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

        const sellFacet = new ethers.Contract(exchangeAddress, sellFacetAbi, signer)
        let buy = await sellFacet.buyScoreTokensFromSellOrder(orderId)
    }

    return(
        <div style={{margin:'2%', border:'white 2px solid'}}>
            <Input placeholder="Insert order ID" onChange={(e) => setOrderId(e.target.value)} />
            <Button onClick={() => buyFromSellOrder()}>Buy from sell order</Button>
        </div>
    )
}