import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import BuyOrder from "./BuyOrderModal";
import SellOrder from "./SellOrderModal";
import DataItem from "./BuyOrderView";
import SellOrderView from "./SellOrderView";
// import CreateBuyScoreTokenOrder from "./BuyFacet"
import { readContract } from "@wagmi/core";
import { BsCoin } from "react-icons/bs";
import { ethers } from "ethers";
function Index() {
  //scroll

  const ref = useRef(null);
  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const exchangeAddress = "0x62853E9eBdaaF86C1835Bb959bb0A43e508a1280";

  const tempIds = [10, 11, 12, 13, 14, 15, 16];
  const [trigger, setTrigger] = useState();
  const [lastOrders, setLastOrders] = useState();
  const [amoutToShow, setAmountToShow] = useState();
  const [buyOrdersInfo, setBuyOrdersInfo] = useState();
  const viewFacetAbi = require("../../abi/ViewFacetAbi.json");
  const RPC = "https://data-seed-prebsc-1-s3.binance.org:8545/";
  const provider = new ethers.providers.JsonRpcProvider(RPC);
  useEffect(() => {
    getLatestBuys();
    getLatestSell();
  }, []);

  useEffect(() => {
    getLatestBuys();
    getLatestSell();
  }, [trigger]);

  async function getLatestBuys() {
    /* const data = await readContract({
      address: exchangeAddress,
      abi: viewFacetAbi,
      functionName: "getLatestBuyOrders",
      args: ["15"],
    }); */
    const c = new ethers.Contract(exchangeAddress, viewFacetAbi, provider)
    const data = await c.getLatestBuyOrders('15')
    console.log("Ethers call latebuyids",data);
    let ids = [];
    for (let i = 0; i < data.length; i++) {
      ids[i] = Number(data[i]);
    }
    console.log(ids);
    setLastOrders(ids);
    await getOrderStruct(ids);
  }

  async function getOrderStruct(orderIds) {
    let ordersStructs = [];
    for (let i = 0; i < orderIds.length; i++) {
     /*  const data = await readContract({
        address: exchangeAddress,
        abi: viewFacetAbi,
        functionName: "getOrderByOrderId",
        args: [orderIds[i]],
      }); */
      const c = new ethers.Contract(exchangeAddress, viewFacetAbi, provider)
      const data = await c.getOrderByOrderId(orderIds[i])
      console.log("buyorder from sc",data);
      let orderStruct = {
        givingToken: data.givingToken,
        givingAmount: Number(data.givingAmount),
        requestingToken: data.requestingToken,
        requestingAmount: Number(data.requestingAmount),

        orderId: Number(data.orderId),
        orderType: data.order,
        orderOwner: data.orderOwner,
      };
      console.log('parsed buy order',orderStruct);
      ordersStructs.push(orderStruct);
    }
    setBuyOrdersInfo(ordersStructs);
  }

  function handleTrigger() {
    setTrigger(!trigger);
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
  };

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

  const [lastSellOrders, setLastSellOrders] = useState();
  const [sellOrdersInfo, setSellOrdersInfo] = useState();
  //const viewFacetAbi = require('../abi/ViewsFacetAbi.json')

  async function getLatestSell() {
    /* const data = await readContract({
      address: exchangeAddress,
      abi: viewFacetAbi,
      functionName: "getLatestSellOrders",
      args: ["15"],
    }); */
    const c = new ethers.Contract(exchangeAddress, viewFacetAbi, provider)
    const data = await c.getLatestSellOrders('15')
    console.log("Ethers call latestsellids",data);
    
    let ids = [];
    for (let i = 0; i < data.length; i++) {
      ids[i] = Number(data[i]);
    }
    console.log(ids);
    setLastSellOrders(ids);
    await getOrderzStruct(ids);
  }

  async function getOrderzStruct(orderIds) {
    let ordersStructs = [];
    for (let i = 0; i < orderIds.length; i++) {
   /*    const data = await readContract({
        address: exchangeAddress,
        abi: viewFacetAbi,
        functionName: "getOrderByOrderId",
        args: [orderIds[i]],
      });
      console.log(data); */
      const c = new ethers.Contract(exchangeAddress, viewFacetAbi, provider)
      const data = await c.getOrderByOrderId(orderIds[i])
      console.log("sellorder from sc",data);
      let orderStruct = {
        givingToken: data.givingToken,
        givingAmount: Number(data.givingAmount),
        requestingToken: data.requestingToken,
        requestingAmount: Number(data.requestingAmount),

        orderId: Number(data.orderId),
        orderType: data.order,
        orderOwner: data.orderOwner,
      };
      console.log('parsed sell',orderStruct);
      ordersStructs.push(orderStruct);
    }
    setSellOrdersInfo(ordersStructs);
  }

  return (
    <div>
      <div className="exchange text-primary dark:text-white">

        <div className="thebg mt-20">

          <h1 className="w-2/5 block mx-auto py-10" >Next Generation Crypto Trading</h1>

          <div className="bitcoin"></div>

          <div className="litecoin"></div>

          <p>Buy and Sell EkoScores and EkoTokens.</p>

          <h6>We Accept</h6>

          <div className="flex gap-4 justify-center accept">
            <div className="flex">
              <BsCoin />
              <h3 className="pl-2">EkoStable</h3>
            </div>

            <div className="flex">
              <BsCoin />
              <h3 className="pl-2">ScoreToken</h3>
            </div>
          </div>

          <div className="theBgButton">
            <div className="theBgButton1 text-white font-bold" onClick={handleClick}>
              Buy Tokens
            </div>

            <div className="theBgButton2 font-bold" onClick={handleClick}>
              Sell Tokens
            </div>
          </div>

          <div className="ethereum"></div>

          <div className="monero"></div>
        </div>

        <div className="msRGContainer" ref={ref}>

          <div className="mSRG-Btn">

            <button
              id="Gallery1 flex"
              className={
                toggleState === 1 ? " mSRG-btn  active-tabss " : "mSRG-btn"
              }
              onClick={() => toggleTab(1)}
            >
              {" "}
              <div className="thebtn1 flex gap-3">
              <svg
                width="39"
                height="39"
                viewBox="0 0 39 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.875 8.53124C4.55177 8.53124 4.24177 8.65964 4.01321 8.8882C3.78465 9.11676 3.65625 9.42676 3.65625 9.74999C3.65625 10.0732 3.78465 10.3832 4.01321 10.6118C4.24177 10.8403 4.55177 10.9687 4.875 10.9687H7.58062L10.7786 23.7656C11.0504 24.8503 12.0218 25.5937 13.1393 25.5937H28.3372C29.4377 25.5937 30.3725 24.8625 30.6613 23.8022L33.8203 12.1875H31.2683L28.3359 23.1562H13.1381L9.94134 10.3594C9.80929 9.83436 9.50488 9.36886 9.07686 9.0374C8.64884 8.70595 8.12197 8.52771 7.58062 8.53124H4.875ZM26.8125 25.5937C24.8077 25.5937 23.1562 27.2451 23.1562 29.25C23.1562 31.2548 24.8077 32.9062 26.8125 32.9062C28.8173 32.9062 30.4688 31.2548 30.4688 29.25C30.4688 27.2451 28.8173 25.5937 26.8125 25.5937ZM15.8438 25.5937C13.8389 25.5937 12.1875 27.2451 12.1875 29.25C12.1875 31.2548 13.8389 32.9062 15.8438 32.9062C17.8486 32.9062 19.5 31.2548 19.5 29.25C19.5 27.2451 17.8486 25.5937 15.8438 25.5937ZM19.5 8.53124V14.625H15.8438L20.7188 19.5L25.5938 14.625H21.9375V8.53124H19.5ZM15.8438 28.0312C16.5311 28.0312 17.0625 28.5626 17.0625 29.25C17.0625 29.9374 16.5311 30.4687 15.8438 30.4687C15.1564 30.4687 14.625 29.9374 14.625 29.25C14.625 28.5626 15.1564 28.0312 15.8438 28.0312ZM26.8125 28.0312C27.4999 28.0312 28.0312 28.5626 28.0312 29.25C28.0312 29.9374 27.4999 30.4687 26.8125 30.4687C26.1251 30.4687 25.5938 29.9374 25.5938 29.25C25.5938 28.5626 26.1251 28.0312 26.8125 28.0312Z"
                  fill="white"
                />
              </svg>
              <p>Buy</p>
              </div>

            </button>

            <button
              id="Gallery2 flex"
              className={
                toggleState === 2 ? " mSRG-btn active-tabs " : "mSRG-btn"
              }
              onClick={() => toggleTab(2)}
            >
              <div className="thebtn2 flex gap-3">
              <svg
                width="27"
                height="41"
                viewBox="0 0 27 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.4817 10.1711H24.9217C25.1902 10.1714 25.4491 10.3054 25.6482 10.547C25.8472 10.7886 25.9723 11.1206 25.9992 11.4788L26.6604 20.3421H24.4794L23.9375 13.0771H20.4817V17.4361C20.4817 17.8215 20.3675 18.191 20.1643 18.4635C19.961 18.736 19.6853 18.8891 19.3978 18.8891C19.1103 18.8891 18.8346 18.736 18.6313 18.4635C18.428 18.191 18.3138 17.8215 18.3138 17.4361V13.0771H9.64198V17.4361C9.64198 17.8215 9.52778 18.191 9.32449 18.4635C9.12121 18.736 8.84549 18.8891 8.558 18.8891C8.27052 18.8891 7.9948 18.736 7.79152 18.4635C7.58823 18.191 7.47403 17.8215 7.47403 17.4361V13.0771H4.01615L2.28178 36.3252H13.9779V39.2312H1.08291C0.931505 39.231 0.781814 39.1883 0.643477 39.1059C0.505141 39.0234 0.381227 38.903 0.279719 38.7524C0.178211 38.6018 0.101361 38.4244 0.0541198 38.2316C0.00687845 38.0388 -0.00970659 37.8349 0.00543362 37.6329L1.95659 11.4788C1.98344 11.1206 2.10852 10.7886 2.30758 10.547C2.50665 10.3054 2.76553 10.1714 3.03406 10.1711H7.47403V9.15686C7.47403 4.11783 10.3704 0 13.9779 0C17.5854 0 20.4817 4.11783 20.4817 9.15686V10.174V10.1711ZM18.3138 10.1711V9.15686C18.3138 5.68708 16.3583 2.90602 13.9779 2.90602C11.5975 2.90602 9.64198 5.68708 9.64198 9.15686V10.174H18.3138V10.1711ZM25.1363 32.1406L22.6497 28.8103V39.2312C22.6497 39.6166 22.5355 39.9862 22.3322 40.2587C22.1289 40.5312 21.8532 40.6843 21.5657 40.6843C21.2782 40.6843 21.0025 40.5312 20.7992 40.2587C20.5959 39.9862 20.4817 39.6166 20.4817 39.2312V28.8103L17.9973 32.1406C17.8973 32.2793 17.7777 32.39 17.6454 32.4662C17.5132 32.5423 17.3709 32.5824 17.227 32.5841C17.0831 32.5858 16.9403 32.549 16.8071 32.4759C16.6739 32.4029 16.5529 32.295 16.4511 32.1586C16.3493 32.0221 16.2688 31.8599 16.2143 31.6813C16.1598 31.5028 16.1324 31.3114 16.1336 31.1185C16.1349 30.9256 16.1648 30.7349 16.2216 30.5576C16.2784 30.3804 16.361 30.22 16.4645 30.086L20.8004 24.274C21.0037 24.0016 21.2794 23.8485 21.5668 23.8485C21.8542 23.8485 22.1299 24.0016 22.3332 24.274L26.6691 30.086C26.7726 30.22 26.8552 30.3804 26.912 30.5576C26.9688 30.7349 26.9987 30.9256 27 31.1185C27.0012 31.3114 26.9738 31.5028 26.9193 31.6813C26.8648 31.8599 26.7843 32.0221 26.6825 32.1586C26.5807 32.295 26.4597 32.4029 26.3265 32.4759C26.1933 32.549 26.0505 32.5858 25.9066 32.5841C25.7627 32.5824 25.6204 32.5423 25.4882 32.4662C25.3559 32.39 25.2363 32.2793 25.1363 32.1406Z"
                  fill="white"
                />
              </svg>

              <p>Sell</p>
              </div>

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
              

              <button className="p-3 mt-4 text-white text-lg rounded-xl block mx-auto bg-btn-bg">
                <div>
                  <button onClick={toggleModal}>Create Buy Order</button>
                </div>
              </button>

              <BuyOrder
                onCancel={toggleModal}
                show={showModal}
                trigger={handleTrigger}
              />

              <DataItem ordersInfo={buyOrdersInfo} trigger={handleTrigger} />
{/* 
              <div className="block mx-auto mt-5">
                <h1 className="text-center">Can’t find your desired order?</h1>

                <button className="p-5 mt-4 text-white text-lg rounded-md bg-primary block mx-auto">
                  <div>
                    <button onClick={toggleModal}>Create Buy Order</button>
                  </div>
                </button>
              </div> */}
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
              

              <button className="p-3 mt-4 text-white text-lg rounded-xl bg-btn-bg block mx-auto">
                <div>
                  <button onClick={toggleModal}>Create Sell Order</button>
                </div>
              </button>

              <SellOrder
                onCancel={toggleModal}
                show={showModal}
                trigger={handleTrigger}
              />
              <SellOrderView
                ordersInfo={sellOrdersInfo}
                trigger={handleTrigger}
              />
              {/* <DataItem data={userData} onEdit={editUserHandler} onDelete={deleteUser} />  */}

              {/* <div className="block mx-auto mt-5">
                <h1 className="text-center">Can’t find your desired order?</h1>

                <button className="p-5 mt-4 text-white text-lg rounded-md bg-primary block mx-auto">
                  <div>
                    <button onClick={toggleModal}>Create Sell Order</button>
                  </div>
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
