import { Text } from "@nextui-org/react"
import CreateBuyScoreTokenOrder from "./BuyOrderModal"
import {useState, useEffect} from 'react'
import BuyOrder from "./BuyOrder"
import GetLatestBuyOrders from "./GetLatestBuyOrders"
import SellScoreTokenToBuyOrder from "./SellScoreTokenToBuyOrder"
import { readContract } from '@wagmi/core'

function BuyOrderView({ordersInfo, trigger}){
console.log(`ORDER INFO: ${ordersInfo}`)
const exchangeAddress = "0x62853E9eBdaaF86C1835Bb959bb0A43e508a1280"  
/* 
const tempIds = [10,11,12,13,14,15,16]
const [trigger, setTrigger] = useState()
const[lastOrders, setLastOrders] = useState()
const[amoutToShow, setAmountToShow] = useState()
const[ordersInfo, setOrdersInfo] = useState()
const viewFacetAbi = require('../../abi/ViewFacetAbi.json')

useEffect(() =>{
    getLatestBuys()
}, [])

useEffect(() =>{
    getLatestBuys()
}, [trigger])

async function getLatestBuys(){
    const data = await readContract({
        address: exchangeAddress,
        abi: viewFacetAbi,
        functionName: 'getLatestBuyOrders',
        args: ['10']
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

function handleTrigger(){
    setTrigger(!trigger)
} */
   
   return(
            <>
                <Text
                    h1
                    size={60}
                    css={{
                        textGradient: "45deg, $blue600 -20%, $pink600 50%",
                    }}
                    weight="bold"
                    >
                        BUY ORDERS
                        <div style={{display: 'flex', flexDirection:'row', flexWrap: 'wrap'}}>
                        { ordersInfo ?
                            ordersInfo.map((orderInfo) => {
                                return(
                                    <BuyOrder orderInfo={orderInfo} trigger={trigger}/>
                                )
                            })
                            : "fetching orders"
                        }
                        </div>
                </Text>

                <CreateBuyScoreTokenOrder exchangeAddress={exchangeAddress} />
                {/* <SellScoreTokenToBuyOrder exchangeAddress={exchangeAddress} /> */}
                {/* <GetLatestBuyOrders exchangeAddress={exchangeAddress} /> */}
            </>
        )
}

export default BuyOrderView