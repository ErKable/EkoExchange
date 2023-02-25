import { Text } from "@nextui-org/react"
import { Withdraw } from "../components"


export default function WithdrawView(){
    
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
                        WITHDRAW VIEW
                </Text>
                <Withdraw exchangeAddress={exchangeAddress} />
            </>
        )
}