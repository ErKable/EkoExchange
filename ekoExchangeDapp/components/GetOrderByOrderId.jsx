import React from 'react'
import { useState, useEffect} from 'react'
import { ethers } from 'ethers'
import { Input, Button, Dropdown  } from "@nextui-org/react";
import { useSigner } from 'wagmi';
import { readContract, erc20ABI } from '@wagmi/core'

export default function GetOrderByOrderId({exchangeAddress}){
    const [orderId, setOrderId] = useState()
    const [orderInfo, setOrderInfo] = useState()
    const viewFacetAbi = require('../abi/ViewsFacetAbi.json')
    
    async function fetchInfo(){
        const data = await readContract({
            address: exchangeAddress,
            abi: viewFacetAbi,
            functionName: 'getOrderByOrderId',
            args: [orderId]
        })
        console.log(data)
        let orderStruct = {
            givingToken: data.givingToken,
            givingAmount: Number(data.givingAmount),
            requestingToken: data.requestingToken,
            requestingAmount: Number(data.requestingAmount),

            orderId: Number(data.orderId),
            orderType: data.order,
            orderOwner: data.orderOwner
        }
        console.log(orderStruct)
        setOrderInfo(orderStruct)
    }

    return(
        <div style={{margin:'2%', border:'white 2px solid'}}>
            <Input placeholder="Insert order id" onChange={(e) => setOrderId(e.target.value)} />
            <Button onClick={() => fetchInfo()}>Fetch Order Info</Button>

            <div>
                <p>GivingToken: {orderInfo ? orderInfo.givingToken : 'insert ID'}</p>
                <p>GivingAmount: {orderInfo ? orderInfo.givingAmount : 'insert ID'}</p>
                <p>RequestingToken: {orderInfo ? orderInfo.requestingToken : 'insert ID'}</p>
                <p>RequestingAmount: {orderInfo ? orderInfo.requestingAmount : 'insert ID'}</p>
                <p>orderId: {orderInfo ? orderInfo.orderId : 'insert ID'}</p>
                <p>orderType: {orderInfo ? orderInfo.orderType : 'insert ID'}</p>
                <p>orderOwner: {orderInfo ? orderInfo.orderOwner : 'insert ID'}</p>
            </div>

        </div>
    )
}