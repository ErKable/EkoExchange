import React from 'react'
import { useState, useEffect} from 'react'
import { ethers } from 'ethers'
import { Input, Button  } from "@nextui-org/react";
import { useSigner } from 'wagmi';
import { readContract, erc20ABI } from '@wagmi/core'

export default function AddEkoStable({exchangeAddress}){
    
    const [esAddress, setESAddress] = useState()
    const [added, setAdded] = useState(false)
    const ownerActionFacetAbi = require('../abi/OwnerActionsFacetAbi.json')
    const { data: signer } = useSigner();

    async function addEkoStable(){
        const oaFacet = new ethers.Contract(exchangeAddress, ownerActionFacetAbi, signer)
        let tx = await oaFacet.addEkostable(esAddress)
        await tx.wait()
        setAdded(true)
    }

    return(
        <div style={{margin:'2%', border:'white 2px solid'}}>
        <Input placeholder="Insert EkoStable Address" onChange={(e) => setESAddress(e.target.value)} />
        <Button onClick={() => addEkoStable()}>Add Ekostable</Button>
        <p>addedEkostable: {added ? '🟢' : '🔴'}</p>
        </div>
    )
}