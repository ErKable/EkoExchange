import { ethers } from "ethers";
import {GetOrderIdsByOwner, GetLatestBuyOrders, GetLatestSellOrders, GetAcceptedEkostable, GetScoreTokenAddress, GetOrderByOrderId} from "../components"
import { Text } from "@nextui-org/react"

export default function viewsView(){
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
            VIEWS FACET
            </Text>
            <GetOrderIdsByOwner exchangeAddress={exchangeAddress}/>
            <GetOrderByOrderId exchangeAddress={exchangeAddress} />
            <GetLatestBuyOrders exchangeAddress={exchangeAddress}/>
            <GetLatestSellOrders exchangeAddress={exchangeAddress}/>
            <GetAcceptedEkostable exchangeAddress={exchangeAddress}/>
            <GetScoreTokenAddress exchangeAddress={exchangeAddress}/>
        </>
    )
}