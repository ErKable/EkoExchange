import React from 'react'
import { useState, useEffect} from 'react'
import { ethers } from 'ethers'
import { Input, Button, Dropdown  } from "@nextui-org/react";
import { useSigner } from 'wagmi';
import { prepareWriteContract, writeContract } from '@wagmi/core'
import { erc20ABI } from '@wagmi/core'
import { readContract } from '@wagmi/core'
import "./style.css"

 function SellOrderModal({trigger, show , onCancel}){
  const exchangeAddress = "0x62853E9eBdaaF86C1835Bb959bb0A43e508a1280"  
  const [acceptedStables, setAcceptedStables] = useState() 
  const [acceptedScoreTokens, setAcceptetScoreTokens] = useState()
  const [stAddress, setSTaddress] = useState()
  const [stAmount, setSTamount] = useState()
  const [ekoAddress, setEkoAddress] = useState()
  const [ekoAmount, setEkoAmount] = useState()
  

  //const [stAddress, setStAddress] = useState()
  const viewFacetAbi = require('../../abi/ViewFacetAbi.json')
  const sellFacetAbi = require('../../abi/SellFacetAbi.json')
  const { data: signer } = useSigner();
  const ekoUSDTaddress = '0x1AafC53444bd066a3F29482e7e75511baBb2d770'
  useEffect(() => {
      fetchScoreTokenAddress()
      fetchAcceptedStable()
  }, [])

  async function fetchScoreTokenAddress(){
      const data = await readContract({
          address: exchangeAddress,
          abi: viewFacetAbi,
          functionName: 'getAcceptedScoreTokens',          
        })
        let score = []
        for(let i = 0; i < data.length; i++){
            const tkName = await readContract({
                address: data[i],
                abi: erc20ABI,
                functionName: 'name',          
              })
              console.log('tkName', tkName)
            let tkStruct = {
                address : data[i],
                name: tkName,
            }
            score.push(tkStruct)
        }
        setAcceptetScoreTokens(score);
  }

  async function fetchAcceptedStable(){
    const data = await readContract({
        address: exchangeAddress,
        abi: viewFacetAbi,
        functionName: 'getAcceptedEkoStables',          
      })
      let stables = []

      for(let i = 0; i < data.length; i++){
        const tkName = await readContract({
            address: data[i],
            abi: erc20ABI,
            functionName: 'name',          
          })
          console.log('tkName', tkName)
        let tkStruct = {
            address : data[i],
            name: tkName,
        }
        stables.push(tkStruct)
      }
      setAcceptedStables(stables)
}



  async function createSellOrder(){
      const st = new ethers.Contract(stAddress, erc20ABI, signer)
      let app = await st.approve(exchangeAddress, stAmount)
      await app.wait()

      const sellFacet = new ethers.Contract(exchangeAddress, sellFacetAbi, signer)
      let order = await sellFacet.createSellScoreTokenOrder(stAddress, stAmount, ekoAddress, ekoAmount)
      await order.wait()
      trigger()
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
            <label>ScoreToken Amount</label>
            <div>
            <Input placeholder="Insert st amount" onChange={(e) => setSTamount(e.target.value)} />
            </div>
            </div>

            <div className="modal-section relative block">
            <label>ScoreTokenAddress Adress</label>
            <div>
            
            <Dropdown>
                <Dropdown.Button flat>Score Token</Dropdown.Button>
                    <Dropdown.Menu aria-label="Static Actions" onAction={(stAdd) => setSTaddress(stAdd)}>
                        {acceptedScoreTokens ? acceptedScoreTokens.map((scoreToken) => {
                            return(
                                <Dropdown.Item key={scoreToken.address} value={scoreToken.address}>{scoreToken.name}</Dropdown.Item>
                            )}
                        ) : 'FETCHING ST'}
                        
                                                
                </Dropdown.Menu>
            </Dropdown>
            </div>
            </div>


            <div className="modal-section block">
            <label>Requesting Amount</label>
            <div>
            <Input placeholder="Insert requesting amount" onChange={(e) => setEkoAmount(e.target.value)} />
            </div>
            </div>
                    
            <div className="modal-section relative block">
            <label>EkoStable Adress</label>
            <div>
            <Dropdown>
                <Dropdown.Button flat>EKO Stable</Dropdown.Button>
                    <Dropdown.Menu aria-label="Static Actions" onAction={(ekoAdd) => setEkoAddress(ekoAdd)}>
                        {acceptedStables ? acceptedStables.map((ekoStable) => {
                            return(
                                <Dropdown.Item key={ekoStable.address} value={ekoStable.address}>{ekoStable.name}</Dropdown.Item>
                            )}
                        ) : 'FETCHING STABLES'}
                        
                                                
                </Dropdown.Menu>
            </Dropdown>
            </div>
            </div>

            <div className='flex mx-auto justify-center mt-10 '>
            <button onClick={() => createSellOrder()} className="create-btn">Create Sell order</button>
            <button onClick={onCancel} className="bg-red-500 cancel-btn"> Cancel </button>
            </div>

        </form>
        </div>
        </div>
        ) : null
  );
 }

export default SellOrderModal