import { Text } from "@nextui-org/react"
import CreateBuyScoreTokenOrder from "./BuyOrderModal"
import GetLatestBuyOrders from "./GetLatestBuyOrders"
import SellScoreTokenToBuyOrder from "./SellScoreTokenToBuyOrder"


function BuyOrderView(){
    
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
                        BUY ORDERS
                </Text>

                <CreateBuyScoreTokenOrder exchangeAddress={exchangeAddress} />
                {/* <SellScoreTokenToBuyOrder exchangeAddress={exchangeAddress} /> */}
                <GetLatestBuyOrders exchangeAddress={exchangeAddress} />
            </>
        )
}

export default BuyOrderView