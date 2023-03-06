import React from 'react'
import { useState, useEffect} from 'react'
import { ethers } from 'ethers'
import { Input, Button  } from "@nextui-org/react";
import { readContract } from '@wagmi/core'

export default function GetAcceptedEkostable({exchangeAddress}){
    const [ekoAddress, setEkoAddress] = useState()
    const [isAccepted, setIsAccepted] = useState()
    const viewFacetAbi = require('../abi/ViewsFacetAbi.json')

    async function getAcceptedEkoStable(){
        const data = await readContract({
            address: exchangeAddress,
            abi: viewFacetAbi,
            functionName: 'getAcceptedEkoStable',
            args: [ekoAddress]
          })
          console.log(data)
          setIsAccepted(data)
    }

    return(
        <div style={{margin:'2%', border:'white 2px solid'}}>
            <Input placeholder="Insert ekostable address" onChange={(e) => setEkoAddress(e.target.value)} />
            <Button onClick={() => getAcceptedEkoStable()}>Fetch if is accepted</Button>
            <p>Temp ekoUSDT address: 0x1AafC53444bd066a3F29482e7e75511baBb2d770</p>
            <p>isAccepted: {isAccepted ? '🟢' : '🔴'}</p>
        </div>
    )
}