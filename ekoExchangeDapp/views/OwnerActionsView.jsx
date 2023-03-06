import { Text } from "@nextui-org/react"
import { AddEkoStable, RemoveEkoStable, SetScoreTokenAddress } from "../components"
export default function OwnerActionsView(){

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
                    OWNER ACTIONS VIEW
            </Text>
            <AddEkoStable exchangeAddress={exchangeAddress} />
            <RemoveEkoStable exchangeAddress={exchangeAddress} />
            <SetScoreTokenAddress exchangeAddress={exchangeAddress} />
        </>
    )
}