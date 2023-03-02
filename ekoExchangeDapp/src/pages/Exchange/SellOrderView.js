import { Text } from "@nextui-org/react";
import CreateBuyScoreTokenOrder from "./BuyOrderModal";
import { useState, useEffect } from "react";
import SellOrderz from "./SellOrderz";
import GetLatestBuyOrders from "./GetLatestBuyOrders";
import SellScoreTokenToBuyOrder from "./SellScoreTokenToBuyOrder";
import { readContract } from "@wagmi/core";
import Loader from "../../components/Loader";

function SellOrderView({ ordersInfo, trigger }) {
  console.log(`ORDER INFO: ${ordersInfo}`);
  const exchangeAddress = "0x62853E9eBdaaF86C1835Bb959bb0A43e508a1280";

  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
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
            {/* <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td> */}
          </tbody>
        </table>

        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {ordersInfo ? (
            ordersInfo.map((orderInfo) => {
              return <SellOrderz orderInfo={orderInfo} trigger={trigger} />;
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

export default SellOrderView;
