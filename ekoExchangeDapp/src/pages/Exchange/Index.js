import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import BuyOrder from "./BuyOrderModal";
import SellOrder from "./SellOrderModal";
import DataItem from './BuyOrderView';
import SellOrderView from './SellOrderView'
// import CreateBuyScoreTokenOrder from "./BuyFacet"
import { readContract } from '@wagmi/core'


function Index() {

const exchangeAddress = "0x62853E9eBdaaF86C1835Bb959bb0A43e508a1280"  

const tempIds = [10,11,12,13,14,15,16]
const [trigger, setTrigger] = useState()
const [lastOrders, setLastOrders] = useState()
const [amoutToShow, setAmountToShow] = useState()
const [buyOrdersInfo, setBuyOrdersInfo] = useState()
const viewFacetAbi = require('../../abi/ViewFacetAbi.json')

useEffect(() =>{
    getLatestBuys()
    getLatestSell()
}, [])

useEffect(() =>{
    getLatestBuys()
    getLatestSell()
}, [trigger])

async function getLatestBuys(){
    const data = await readContract({
        address: exchangeAddress,
        abi: viewFacetAbi,
        functionName: 'getLatestBuyOrders',
        args: ['15']
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
  setBuyOrdersInfo(ordersStructs)
}

function handleTrigger(){
    setTrigger(!trigger)
}

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const [showModal, setShowModal] = useState(false);
  // const [userData, setUserData] = useState(data);
  // const [currentUser, setCurrentUser] = useState(null);


  const toggleModal = () => {
    setShowModal(!showModal);
  }

  // const addUser = user => {
  //   if (currentUser) {
  //     setUserData(userData.map(data => (data.id === user.id ? user : data)));
  //     setCurrentUser(null);
  //     return;
  //   }
  //   user.id = userData.length + 1;
  //   setUserData([...userData, user]);
  // }

  // const editUserHandler = user => {
  //   setCurrentUser(user);
  //   toggleModal();
  // }

  // const deleteUser = user => {
  //   setUserData(userData.filter(item => item.name !== user.name));
  // }


    const[lastSellOrders, setLastSellOrders] = useState()
    const[sellOrdersInfo, setSellOrdersInfo] = useState()
    //const viewFacetAbi = require('../abi/ViewsFacetAbi.json')



    async function getLatestSell(){
        const data = await readContract({
            address: exchangeAddress,
            abi: viewFacetAbi,
            functionName: 'getLatestSellOrders',
            args: ['15']
          })
        console.log(data)
        let ids = []
        for(let i=0; i < data.length; i++){
            ids[i] = Number(data[i])
            
        }
        console.log(ids)
        setLastSellOrders(ids)
        await getOrderzStruct(ids)
    }

    async function getOrderzStruct(orderIds){
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
      setSellOrdersInfo(ordersStructs)
    }





  return (
    <div>
      <div className="exchange">

     
        <div className="thebg">
    

          <h1 className="font-bold">Buy and Sell EkoScores and EkoTokens.</h1>
          <h3 className="pt-4 font-medium">
            Buy and sell EkoScores and EkoTokens safely and easily on Ekolance
            P2P.
          </h3>
          <p className="">
            Find the best offer below and buy and sell EkoScores and EkoTokens
            today.
          </p>
        </div>

        <div className="msRGContainer">
          <div className="mSRG-Btn">
            <button
              id="Gallery1"
              className={
                toggleState === 1 ? " mSRG-btn  active-tabs " : "mSRG-btn"
              }
              onClick={() => toggleTab(1)}
            >
              {" "}
              Buy
            </button>

            <button
              id="Gallery2"
              className={
                toggleState === 2 ? " mSRG-btn active-tabs" : "mSRG-btn"
              }
              onClick={() => toggleTab(2)}
            >
              Sell
            </button>

               
         
          </div>

          <div id="mSRG-container">
            <div className="block mx-auto"></div>

            <div
              id="Gallery1"
              className={
                toggleState === 1
                  ? "mSRG-container-inner  active-content"
                  : "mSRG-container-inner"
              }
            >
              <form className="flex justify-center gap-10">
                <div>
                  <h3>Amount</h3>

                  <div className="amount">
                    <input placeholder="Enter Amount" />
                    <button>Search</button>
                  </div>
                </div>

                <div>
                  <h3>Payment</h3>
                  <select>
                    <option>EKOSCORES</option>
                    <option>EKOTOKEN</option>
                  </select>
                </div>
              </form>

              <button className="p-3 mt-4 text-white text-lg rounded-xl bg-primary block mx-auto">
                <div>
                <button onClick={toggleModal}>Create Buy Order</button>
                </div>
                </button>

              <BuyOrder onCancel={toggleModal} show={showModal} trigger={handleTrigger}/>

              <DataItem ordersInfo={buyOrdersInfo} trigger={handleTrigger}/>

            
              <div className="block mx-auto mt-5">
                <h1 className="text-center">Can’t find your desired order?</h1>

                <button className="p-5 mt-4 text-white text-lg rounded-md bg-primary block mx-auto">
                <div>
                <button onClick={toggleModal}>Create Buy Order</button>
                </div>
                </button>

              </div>
            </div>
          </div>

          <div id="mSRG-container">
            <div
              id="Gallery2"
              className={
                toggleState === 2
                  ? "mSRG-container-inner  active-content"
                  : "mSRG-container-inner"
              }
            >
                  <form className="flex justify-center gap-10">
                <div>
                  <h3>Amount</h3>

                  <div className="amount">
                    <input placeholder="Enter Amount" />
                    <button>Search</button>
                  </div>
                </div>

                <div>
                  <h3>Payment</h3>
                  <select>
                    <option>EKOSCORES</option>
                    <option>EKOTOKEN</option>
                  </select>
                </div>
              </form>

              <button className="p-5 mt-4 text-white text-lg rounded-md bg-primary block mx-auto">
                <div>
                <button onClick={toggleModal}>Create Sell Order</button>
                </div>
                </button>

                <SellOrder onCancel={toggleModal} show={showModal} trigger={handleTrigger}/>
                <SellOrderView ordersInfo={sellOrdersInfo} trigger={handleTrigger}/>
               {/* <DataItem data={userData} onEdit={editUserHandler} onDelete={deleteUser} />  */}

            
              <div className="block mx-auto mt-5">
                <h1 className="text-center">Can’t find your desired order?</h1>

                <button className="p-5 mt-4 text-white text-lg rounded-md bg-primary block mx-auto">
                <div>
                <button onClick={toggleModal}>Create Sell Order</button>
                </div>
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
