import React from 'react'
import { useState, useEffect} from 'react'
import { ethers } from 'ethers'
import { Input, Button  } from "@nextui-org/react";
import { useSigner } from 'wagmi';
import { readContract, erc20ABI } from '@wagmi/core'

export default function ({exchangeAddress}){
    const [esAddress, setESAddress] = useState()
    const [removed, setRemoved] = useState(false)
    const ownerActionFacetAbi = require('../abi/OwnerActionsFacetAbi.json')
    const { data: signer } = useSigner();

    async function removeEkoStable(){
        const oaFacet = new ethers.Contract(exchangeAddress, ownerActionFacetAbi, signer)
        let tx = await oaFacet.removeEkostable(esAddress)
        await tx.wait()
        setRemoved(true)
    }

    return(
        <div style={{margin:'2%', border:'white 2px solid'}}>
        <Input placeholder="Insert EkoStable Address" onChange={(e) => setESAddress(e.target.value)} />
        <Button onClick={() => removeEkoStable()}> Remove Ekostable</Button>
        <p>removedEkostable: {removed ? '🟢' : '🔴'}</p>
        </div>
    )
}