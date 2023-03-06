import { Text } from "@nextui-org/react";
import CreateBuyScoreTokenOrder from "./BuyOrderModal";
import { useState, useEffect } from "react";
import BuyOrder from "./BuyOrder";
import GetLatestBuyOrders from "./GetLatestBuyOrders";
import SellScoreTokenToBuyOrder from "./SellScoreTokenToBuyOrder";
import { readContract } from "@wagmi/core";
import Loader from "../../components/Loader";
import "./style.css";

function BuyOrderView({ ordersInfo, trigger }) {

  console.log(`ORDER INFO: ${ordersInfo}`);
  const exchangeAddress = "0x62853E9eBdaaF86C1835Bb959bb0A43e508a1280";

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

  return (

    <>
    <div>
      <table className="text-black flex justify-center">
        <thead className="text-black flex justify-center">
          <tr className="text-black flex justify-center">
            <th scope="col" className="px-6 py-3">
              ORDER ID
            </th>
            <th scope="col" className="px-6 py-3">
              Requesting Token
            </th>
            <th scope="col" className="px-6 py-3">
              Requesting Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Giving Token
            </th>
            <th scope="col" className="px-6 py-3">
              Giving Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
     
        </tbody>
      </table>

      <div className="block mx-auto text-center" >
      {ordersInfo ? (
            ordersInfo.map((orderInfo) => {
              return <BuyOrder orderInfo={orderInfo} trigger={trigger} />;
            })
          ) : (
            <Loader />
          )}
      </div>

      <CreateBuyScoreTokenOrder exchangeAddress={exchangeAddress} />
      {/* <SellScoreTokenToBuyOrder exchangeAddress={exchangeAddress} /> */}
      {/* <GetLatestBuyOrders exchangeAddress={exchangeAddress} /> */}
    </div>
  </>
 
  );
}

export default BuyOrderView;