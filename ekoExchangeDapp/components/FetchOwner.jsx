import React from 'react'
import { useState, useEffect} from 'react'
import { ethers } from 'ethers'
import { Input, Button  } from "@nextui-org/react";
import { readContract } from '@wagmi/core'

export default function FetchOwner({exchangeAddress}){
    const ownershipAbi = require('../abi/OwnershipFacetAbi.json')
    const [owner, setOwner] = useState()
    
    async function fetchOwner(){
        const data = await readContract({
            address: exchangeAddress,
            abi: ownershipAbi,
            functionName: 'owner',
          })
          console.log(data)
          setOwner(data)
    }

    return(
        <div style={{margin:'2%', border:'white 2px solid'}}>
            <Button onClick={() => fetchOwner()}>Fetch Owner</Button>
            <p>{owner ? owner : 'fetch owner'}</p>
        </div>
    )
}