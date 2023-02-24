import React from 'react'
import { useState, useEffect} from 'react'
import { ethers } from 'ethers'
import { Input, Button  } from "@nextui-org/react";
import { useSigner } from 'wagmi';
import { readContract, erc20ABI } from '@wagmi/core'

export default function SetScoreTokenAddress({exchangeAddress}){
    const [stAddress, setSTAddress] = useState()
    const [added, setAdded] = useState(false)
    const ownerActionFacetAbi = require('../abi/OwnerActionsFacetAbi.json')
    const { data: signer } = useSigner();

    async function setScoreToken(){
        const oaFacet = new ethers.Contract(exchangeAddress, ownerActionFacetAbi, signer)
        let tx = await oaFacet.setScoreTokenAddress(stAddress)
        await tx.wait()
        setAdded(true)
    }

    return(
        <div style={{margin:'2%', border:'white 2px solid'}}>
        <Input placeholder="Insert score token address" onChange={(e) => setSTAddress(e.target.value)} />
        <Button onClick={() => setScoreToken()}>Set score token address</Button>
        <p>ST address updated: {added ? '🟢' : '🔴'}</p>
        </div>
    )
}