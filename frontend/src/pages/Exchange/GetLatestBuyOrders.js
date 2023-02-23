import React from 'react'
import { useState, useEffect} from 'react'
import { ethers } from 'ethers'
import { Input, Button  } from "@nextui-org/react";
import { readContract } from '@wagmi/core'

export default function GetLatestBuyOrders({exchangeAddress}) {
    const[lastOrders, setLastOrders] = useState()
    const[amoutToShow, setAmountToShow] = useState()
    const[ordersInfo, setOrdersInfo] = useState()
    const viewFacetAbi = require('../../abi/ViewFacetAbi.json')

    async function getLatestBuys(){
        const data = await readContract({
            address: exchangeAddress,
            abi: viewFacetAbi,
            functionName: 'getLatestBuyOrders',
            args: [amoutToShow]
        })
        console.log(data)
        let ids = []
        for(let i=0; i < data.length; i++){
            ids[i] = Number(data[i])
            
        }
        console.log(ids)
        setLastOrders(ids)
        await getOrderStruct(ids)
    }

    async function getOrderStruct(orderIds){
      let ordersStructs = []
      for(let i = 0; i < orderIds.length; i++){  
        const data = await readContract({
            address: exchangeAddress,
            abi: viewFacetAbi,
            functionName: 'getOrderByOrderId',
            args: [orderIds[i]]
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
        ordersStructs.push(orderStruct)
      }
      setOrdersInfo(ordersStructs)
    }

    return(
        <div style={{margin:'2%', border:'white 2px solid'}}>
            <div className='block mx-auto'>
            <Input placeholder="Insert orders to show" onChange={(e) => setAmountToShow(e.target.value)} />
            <Button onClick={() => getLatestBuys()}>Fetch BUY Orders</Button>
            <p>Order ids: {lastOrders ? lastOrders : "No orders to show"}</p>
            <div style={{display: 'flex', flexDirection: 'row', overflow:'scroll'}}>
                { ordersInfo ?
                     (ordersInfo.map((orderInfo) => {
                        return (
                            <div>
                                <p>GivingToken: {orderInfo.givingToken}</p>
                                <p>GivingAmount: {orderInfo.givingAmount}</p>
                                <p>RequestingToken: {orderInfo.requestingToken}</p>
                                <p>RequestingAmount: {orderInfo.requestingAmount}</p>
                                <p>orderId: {orderInfo.orderId}</p>
                                <p>orderType: {orderInfo.orderType}</p>
                                <p>orderOwner: {orderInfo.orderOwner}</p>
                            </div>                            
                            ); 
                    })
                    ) : 'nothing to show'
                }                
            </div>
            </div>
        </div>
    )
}