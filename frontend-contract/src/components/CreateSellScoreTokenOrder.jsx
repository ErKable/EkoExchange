import React from 'react'
import { useState, useEffect} from 'react'
import { ethers } from 'ethers'
import { Input, Button  } from "@nextui-org/react";
import { useSigner } from 'wagmi';
import { prepareWriteContract, writeContract } from '@wagmi/core'
import { erc20ABI } from '@wagmi/core'
import { readContract } from '@wagmi/core'

export default function CreateSellScoreTokenOrder({exchangeAddress}){
    const [stAmount, setSTamount] = useState()
    const [ekoAddress, setEkoAddress] = useState()
    const [ekoAmount, setEkoAmount] = useState()
    const [stAddress, setStAddress] = useState()
    const viewFacetAbi = require('../abi/ViewsFacetAbi.json')
    const sellFacetAbi = require('../abi/SellFacetAbi.json')
    const { data: signer } = useSigner();

    useEffect(() => {
        fetchScoreTokenAddress()
    }, [])

    async function fetchScoreTokenAddress(){
        const data = await readContract({
            address: exchangeAddress,
            abi: viewFacetAbi,
            functionName: 'getScoreTokenAddress',
            
          })
          console.log(data)
          setStAddress(data)
    }

    async function createSellOrder(){
        const st = new ethers.Contract(stAddress, erc20ABI, signer)
        let app = await st.approve(exchangeAddress, stAmount)
        await app.wait()

        const sellFacet = new ethers.Contract(exchangeAddress, sellFacetAbi, signer)
        let order = await sellFacet.createSellScoreTokenOrder(stAmount, ekoAddress, ekoAmount)
        await order.wait()
        
    }

    return(
        <div style={{margin:'2%', border:'white 2px solid'}}>
            <Input placeholder="Insert st amount" onChange={(e) => setSTamount(e.target.value)} />
            <Input placeholder="Insert requesting ES address" onChange={(e) => setEkoAddress(e.target.value)} />
            <Input placeholder="Insert requesting amount" onChange={(e) => setEkoAmount(e.target.value)} />
            <Button onClick={() => createSellOrder()}>Create sell order</Button>
        </div>
    )

}