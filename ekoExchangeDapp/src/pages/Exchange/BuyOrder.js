import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useSigner } from "wagmi";
import { readContract, erc20ABI } from "@wagmi/core";

export default function BuyOrder({ orderInfo, trigger, data }) {
  const exchangeAddress = "0x62853E9eBdaaF86C1835Bb959bb0A43e508a1280";
  const viewFacetAbi = require("../../abi/ViewFacetAbi.json");
  const buyFacetAbi = require("../../abi/BuyFacetAbi.json");
  const [orderId, setOrderId] = useState();
  const [ekoAddress, setEkoAddress] = useState();
  const [ekoAmount, setEkoAmount] = useState();

  const [tokenName, setTokenName] = useState();
  const [stableName, setStableName] = useState();
  const { data: signer } = useSigner();

  useEffect(() => {
    fetchEkoStableAddress();
    getTokenNames();
  }, []);

  async function fetchEkoStableAddress() {
    const data = await readContract({
      address: exchangeAddress,
      abi: viewFacetAbi,
      functionName: "getOrderByOrderId",
      args: [orderInfo.orderId],
    });
    console.log(data.requestingToken);
    setEkoAddress(data.requestingToken);
    console.log(Number(data.requestingAmount));
    setEkoAmount(Number(data.requestingAmount));
  }

  async function getTokenNames() {
    const stable = await readContract({
      address: orderInfo.givingToken,
      abi: erc20ABI,
      functionName: "name",
    });
    setStableName(stable);
    const token = await readContract({
      address: orderInfo.requestingToken,
      abi: erc20ABI,
      functionName: "name",
    });
    setTokenName(token);
  }

  async function buyFromSellOrder() {
    const token = new ethers.Contract(
      orderInfo.requestingToken,
      erc20ABI,
      signer
    );
    let app = await token.approve(exchangeAddress, orderInfo.requestingAmount);

    await app.wait();

    const buyFacet = new ethers.Contract(exchangeAddress, buyFacetAbi, signer);
    let buy = await buyFacet.sellScoreTokenToABuyOrder(orderInfo.orderId);
    await buy.wait();
    trigger();
  }

  return (
    <>


      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table >
          <thead></thead>
          <tbody>
            <td class="px-12 py-4">{orderInfo.orderId}</td>
            <td class="px-12 py-4">{tokenName}</td>
            <td class="px-12 py-4">{orderInfo.requestingAmount}</td>
            <td class="px-20 py-4">{stableName}</td>
            <td class="px-16 py-4"> {orderInfo.givingAmount}</td>
          </tbody>
        </table>

        {/*  
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Product name
                </th>
                <th scope="col" class="px-6 py-3">
                    Color
                </th>
                <th scope="col" class="px-6 py-3">
                    Category
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">
                    Silver
                </td>
                <td class="px-6 py-4">
                    Laptop
                </td>
                <td class="px-6 py-4">
                    $2999
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
          
          
       
        </tbody>
    </table>
</div> */}

        {/* <p>ORDER ID: {orderInfo.orderId}</p>
                <p>Requesting Token: {tokenName}</p>
                <p>Requesting Amount: {orderInfo.requestingAmount}</p>
                <p>Giving Token: {stableName}</p>
                <p>Giving Amount: {orderInfo.givingAmount}</p>

                <Button onClick={() => buyFromSellOrder()}>Buy from sell order</Button>  */}
      </div>
    </>
  );
}
