import React from 'react'
import { useState, useEffect} from 'react'
import { ethers } from 'ethers'
import { Input, Button, Dropdown  } from "@nextui-org/react";
import { useSigner } from 'wagmi';
import { readContract, erc20ABI } from '@wagmi/core'

export default function Withdraw({exchangeAddress}){
    const [withdrawn, setWithdrawn] = useState(false)
    const [orderType, setOrderType] = useState()
    const [orderId, setOrderId] = useState()
    const withdrawFacetAbi = require('../abi/WithdrawFacetAbi.json') 
    const { data: signer } = useSigner();

    async function withdraw(){
        const withdrawFacet = new ethers.Contract(exchangeAddress, withdrawFacetAbi, signer)
        let withdrawOrder = await withdrawFacet.withdrawOrder(orderId, orderType)
        await withdrawOrder.wait()
        setWithdrawn(true)
    }
    console.log(orderType)
    return(
        <div style={{margin:'2%', border:'white 2px solid'}}>
        <Input placeholder="order Id" onChange={(e) => setOrderId(e.target.value)} />
        
        <Dropdown>
            <Dropdown.Button flat>ORDER TYPE</Dropdown.Button>
                <Dropdown.Menu
                    disabledKeys={["edit", "delete"]}
                    aria-label="Example with disabled actions"
                    onAction={(orderType) => {
                        setOrderType(orderType)
                    }}
                >
                <Dropdown.Item key="0" value='0'>BUY</Dropdown.Item>
                <Dropdown.Item key="1" value='1'>SELL</Dropdown.Item>                
            </Dropdown.Menu>
        </Dropdown>
        <Button onClick={() => withdraw()}>Withdraw order</Button>
        <p>order withdrawn: {withdrawn ? '🟢' : '🔴'}</p>
        </div>
    )
}