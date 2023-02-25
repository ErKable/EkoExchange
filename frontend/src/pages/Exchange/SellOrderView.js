import { Text } from "@nextui-org/react"
import CreateSellScoreTokenOrder from "./SellOrderModal"
import GetLatestBuyOrders from "./GetLatestSellOrder"

export default function SellFacetView(){
    
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
                        SELL ORDER VIEW
                </Text>
                <CreateSellScoreTokenOrder exchangeAddress={exchangeAddress} />
                <GetLatestBuyOrders exchangeAddress={exchangeAddress} />
            </>
        )
}