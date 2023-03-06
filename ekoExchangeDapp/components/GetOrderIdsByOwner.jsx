import React from 'react'
import { useState, useEffect} from 'react'
import { ethers } from 'ethers'
import { Input, Button  } from "@nextui-org/react";
import { readContract } from '@wagmi/core'
export default function GetOrderIdsByOwner({exchangeAddress}) {
    
    const [ids, setIds] = useState()
    const [address, setAddress] = useState()
    
    const viewFacetAbi = require('../abi/ViewsFacetAbi.json')
    
    //const exchangeAddress = "0xE1D5D978FB6162d94DB7aD0572bfFF2EeEc02DC3" 

    async function getOrders(){
      
        const data = await readContract({
            address: exchangeAddress,
            abi: viewFacetAbi,
            functionName: 'getOrdersIdByOwner',
            args: [address]
          })
          let ids = []
          for(let i =0; i < data.length; i++){
            ids[i] = Number(data[i])
          }
            setIds(ids)
            console.log(ids)
     
    }

    return (
      <div style={{margin:'2%', border:'white 2px solid'}}>
        <Input placeholder="Insert Address" onChange={(e) => setAddress(e.target.value)} />
        <Button onClick={() => getOrders()}>Fetch Orders</Button>
        {ids ? ids : 'No Orders to show'}
        <p>User one address 0xB1A8bCA10845c4bAf193E7a41ABD9Ed8546A12E4 <br/>
            User two address 0xC114F73a2E76B4e83a699646e4d2635702f459Ad</p>
      </div>
    )
  }

