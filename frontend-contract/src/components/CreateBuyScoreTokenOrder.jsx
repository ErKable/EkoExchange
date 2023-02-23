import React from 'react'
import { useState} from 'react'
import { ethers } from 'ethers'
import { Input, Button  } from "@nextui-org/react";
import { useSigner } from 'wagmi';
import { prepareWriteContract, writeContract } from '@wagmi/core'
import { erc20ABI } from '@wagmi/core'

export default function CreateBuyScoreTokenOrder({exchangeAddress}){
    
    const [ekoAddress, setEkoAddress] = useState()
    const [ekoAmount, setEkoAmount] = useState()
    const [stAmount, setSTAmount] = useState()
    const BuyFacetAbi = require('../abi/BuyFacetAbi.json')
    const { data: signer } = useSigner();

    async function createBuyScoreTokenOrder(){
        
        const ekoStable = new ethers.Contract(ekoAddress, erc20ABI, signer)
        let approve =  ekoStable.approve(exchangeAddress, ekoAmount)
        await approve.wait()
        const buyFacet = new ethers.Contract(exchangeAddress, BuyFacetAbi, signer)
        let tx = await buyFacet.createBuyScoreTokensOrder(ekoAddress, ekoAmount, stAmount)
        await tx.wait()
    }

    return(
        <div style={{margin:'2%', border:'white 2px solid'}}>
            <Input placeholder="Insert ekostable address" onChange={(e) => setEkoAddress(e.target.value)} />
            <Input placeholder="Insert ekostable amount" onChange={(e) => setEkoAmount(e.target.value)} />
            <Input placeholder="Insert requesting amount" onChange={(e) => setSTAmount(e.target.value)} />
            <Button onClick={() => createBuyScoreTokenOrder()}>Create buy order</Button>
        </div>
    )

}