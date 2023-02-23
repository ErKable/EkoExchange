import React from 'react'
import { useState} from 'react'
import { ethers } from 'ethers'
import { Input, Button  } from "@nextui-org/react";
import { useSigner } from 'wagmi';
import { prepareWriteContract, writeContract } from '@wagmi/core'
import { erc20ABI } from '@wagmi/core'
import "./style.css"

 function BuyOrderModal({exchangeAddress, show , onCancel}){
    
    const [ekoAddress, setEkoAddress] = useState()
    const [ekoAmount, setEkoAmount] = useState()
    const [stAmount, setSTAmount] = useState()
    const BuyFacetAbi = require('../../abi/BuyFacetAbi.json')
    const { data: signer } = useSigner();
    console.log(signer)

    async function createBuyScoreTokenOrder(){
        
        const ekoStable = new ethers.Contract(ekoAddress, erc20ABI, signer)
        let approve = await ekoStable.approve("0xE1D5D978FB6162d94DB7aD0572bfFF2EeEc02DC3"  , ekoAmount)
        await approve.wait()
        const buyFacet = new ethers.Contract("0xE1D5D978FB6162d94DB7aD0572bfFF2EeEc02DC3"  , BuyFacetAbi, signer)
        let tx = await buyFacet.createBuyScoreTokensOrder(ekoAddress, ekoAmount, stAmount)
        await tx.wait()
    }
    const submitData = event => {
       event.preventDefault();
      // onSubmit(formData);
          onCancel();
       }
      
    return(

      show ? (
      
         <div className="modal-overlay">

        <div className='modal'>

            <form style={{ border:'white 2px solid', display:'block', paddingTop:'20px'}} onSubmit={submitData}>

            <div className="modal-section">
            <label>Address</label>
            <div>
            <Input placeholder="Insert ekostable address" value={ekoAddress} onChange={(e) => setEkoAddress(e.target.value)} className="input-edit"/>
            </div>
            </div>

            <div className="modal-section relative block">
            <label>Amount</label>
            <div>
            <Input placeholder="Insert ekostable amount" value={ekoAmount} onChange={(e) => setEkoAmount(e.target.value)} className="input-edit" />
            </div>
            </div>


            <div className="modal-section block">
            <label>Requesting Amount</label>
            <div>
            <Input placeholder="Insert requesting amount" value={stAmount} onChange={(e) => setSTAmount(e.target.value)} className="input-edit" />
            </div>
            </div>

            <div className='flex mx-auto justify-center mt-10 '>
            <button onClick={() => createBuyScoreTokenOrder()} className="create-btn">Create buy order</button>
            <button onClick={onCancel} className="bg-red-500 cancel-btn"> Cancel </button>
            </div>

        </form>
        </div>
        </div>
        ) : null
  );
 }

export default BuyOrderModal