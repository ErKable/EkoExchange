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

<div style={{width: '100%', display:'flex', flexDirection:'row', justifyContent:'center'}}>
    <Text
        h1
        size={60}
        css={{
          color: '#E1B530',
        }}
        weight="bold"
      >
        Latest Sell Order Created
      </Text></div>
    <div className="orderDisplay">     
        {ordersInfo ? (
            ordersInfo.map((orderInfo) => {
              return <SellOrderz orderInfo={orderInfo} trigger={trigger} />;
            })
          ) : (
            <Loader />
          )}
      {/*   </tbody>
      </table>    */}

        
    </div>
</>
  );
}

export default SellOrderView;
