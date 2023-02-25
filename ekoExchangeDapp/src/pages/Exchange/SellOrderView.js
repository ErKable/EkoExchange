import { Text } from "@nextui-org/react"
import CreateBuyScoreTokenOrder from "./BuyOrderModal"
import {useState, useEffect} from 'react'
import SellOrderz from "./SellOrderz"
import GetLatestBuyOrders from "./GetLatestBuyOrders"
import SellScoreTokenToBuyOrder from "./SellScoreTokenToBuyOrder"
import { readContract } from '@wagmi/core'

function SellOrderView({ordersInfo, trigger}){
    
const exchangeAddress = "0xE1D5D978FB6162d94DB7aD0572bfFF2EeEc02DC3" 

   
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
                        SELL ORDERS
                        <div style={{display: 'flex', flexDirection:'row', flexWrap: 'wrap'}}>
                        { ordersInfo ?
                            ordersInfo.map((orderInfo) => {
                                return(
                                    <SellOrderz orderInfo={orderInfo} trigger={trigger}/>
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

export default SellOrderView