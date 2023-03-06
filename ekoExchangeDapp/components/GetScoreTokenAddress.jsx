import React from 'react'
import { useState, useEffect} from 'react'
import { ethers } from 'ethers'
import { Input, Button  } from "@nextui-org/react";
import { readContract } from '@wagmi/core'

export default function GetScoreTokenAddress({exchangeAddress}){
    const [stAddress, setStAddress] = useState()
    const viewFacetAbi = require('../abi/ViewsFacetAbi.json')

    async function getScoreTokenAddress(){
        const data = await readContract({
            address: exchangeAddress,
            abi: viewFacetAbi,
            functionName: 'getScoreTokenAddress',
            
          })
          console.log(data)
          setStAddress(data)
    }

    return(
        <div style={{margin:'2%', border:'white 2px solid'}}>
            <Button onClick={() => getScoreTokenAddress()}>Fetch ST address</Button>
            <p>ScoreTokenAddress: {stAddress ? stAddress : 'No address to display'}</p>
        </div>
    )
}