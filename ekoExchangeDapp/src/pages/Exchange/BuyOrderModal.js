import React from 'react'
import { useState, useEffect} from 'react'
import { ethers } from 'ethers'
import { Input, Button, Dropdown  } from "@nextui-org/react";
import { useSigner } from 'wagmi';
import { prepareWriteContract, writeContract } from '@wagmi/core'
import { erc20ABI } from '@wagmi/core'
import { readContract } from '@wagmi/core'
import "./style.css"

 function BuyOrderModal({ show , onCancel, trigger}){
    const [acceptedStables, setAcceptedStables] = useState() 
  const [acceptedScoreTokens, setAcceptetScoreTokens] = useState()
    const [ekoAddress, setEkoAddress] = useState()
    const [ekoAmount, setEkoAmount] = useState()
    const [stAmount, setSTAmount] = useState()
    const [stAddress, setSTaddress] = useState()
    const BuyFacetAbi = require('../../abi/BuyFacetAbi.json')
    const { data: signer } = useSigner();
    //console.log(signer)
    const viewFacetAbi = require('../../abi/ViewFacetAbi.json')
    const sellFacetAbi = require('../../abi/SellFacetAbi.json')
    const exchangeAddress = "0x62853E9eBdaaF86C1835Bb959bb0A43e508a1280"
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
    
    async function createBuyScoreTokenOrder(){        
        const ekoStable = new ethers.Contract(ekoAddress, erc20ABI, signer)
        let approve = await ekoStable.approve(exchangeAddress  , ekoAmount)
        await approve.wait()
        const buyFacet = new ethers.Contract(exchangeAddress  , BuyFacetAbi, signer)
        let tx = await buyFacet.createBuyScoreTokensOrder(ekoAddress, ekoAmount, stAddress,stAmount)
        await tx.wait()
        trigger()
    }
    const submitData = event => {
       event.preventDefault();
      // onSubmit(formData);
          onCancel();
       }
      console.log(ekoAddress)
    return(

      show ? (
      
         <div className="modal-overlay">

        <div className='modal'>

            <form style={{ border:'white 2px solid', display:'block', paddingTop:'20px'}} onSubmit={submitData}>

            <div className="modal-section">
            <label>Address</label>
            <div>
            {/* <Input placeholder="Insert ekostable address" value={ekoAddress} onChange={(e) => setEkoAddress(e.target.value)} className="input-edit"/> */}
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

            <div className="modal-section relative block">
            <label>ScoreToken Adress</label>
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