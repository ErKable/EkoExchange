import React from 'react'
import { useState, useEffect} from 'react'
import { ethers } from 'ethers'
import { Input, Button  } from "@nextui-org/react";
import { useSigner } from 'wagmi';
import { readContract } from '@wagmi/core'

export default function TransferOwnership({exchangeAddress}){
    
    const ownershipAbi = require('../abi/OwnershipFacetAbi.json')
    const [newOwner, setNewOwner] = useState() 
    const [ownershipChanged, setOwnershipChanged] = useState(false)
    const { data: signer } = useSigner();

    async function transferOwnership(){
        const ownershipFacet = new ethers.Contract(exchangeAddress, ownershipAbi, signer)
        let tx = await ownershipFacet.transferOwnership(newOwner)
        await tx.wait()
        setOwnershipChanged(true)
    }

    return(
        <div style={{margin:'2%', border:'white 2px solid'}}>
            <Input placeholder="Insert new owner address" onChange={(e) => setNewOwner(e.target.value)} />
            <Button onClick={() => transferOwnership()}>Transfer Ownership</Button>
            <p>ownershipChanged: {ownershipChanged ? '🟢' : '🔴'}</p>
        </div>
    )
}