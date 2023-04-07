
import React from 'react'
import { useEffect, useState } from 'react';
import { ethers } from "ethers";
import { useAccount, useSigner } from "wagmi";
import { ContractResultDecodeError, erc20ABI } from "@wagmi/core";
import viewFacetAbiz from "../../abi/ViewFacetAbi.json"
import SellFacetAbiz from '../../abi/SellFacetAbi.json'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; 

import { Dropdown } from "@nextui-org/react";


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const CreateSellScoreTokenOrderModal = ({ setModalOn, setChoice }) => {
    const viewFacetAbi = viewFacetAbiz;
    const sellFacetAbi = SellFacetAbiz
    //const buyFacetAbi = require("../../../abi/BuyFacetAbi.json");
    const { data: signer } = useSigner();
    const {account, isConnected} = useAccount()
    const [tokenName, setTokenName] = useState();
  const [stableName, setStableName] = useState();
  const [acceptedScoreTokens, setAcceptedScoreToken] = useState([])
  const [acceptedEkoStables, setAcceptedEkoStable] = useState([])
  const [selectedST, setSelectedST] = useState()
  const [selectedES, setSelectedES] = useState()
  const [givingAmount, setGivingAmount] = useState()
  const [requestingAmount, setRequestingAmount] = useState()
  //const [selectedSTName, setSelectedSTname] = useState()
  const RPC = "https://data-seed-prebsc-1-s1.binance.org:8545";
  const provider = new ethers.providers.JsonRpcProvider(RPC);
  const exchangeAddress = "0x62853E9eBdaaF86C1835Bb959bb0A43e508a1280";
  const notyf = new Notyf();



    const handleOkClick = () => {
        setChoice(true)
        setModalOn(false)
    }

    const handleCancelClick = () => {
        setChoice(false)
        setModalOn(false)
    }


    
  useEffect(() => {
    
    
    getAcceptedEkoStablesAndScoreTokens()
  }, []);


  async function getAcceptedEkoStablesAndScoreTokens(){
    //console.log('called')
    const viewFacet = new ethers.Contract(exchangeAddress, viewFacetAbi, provider)
    //console.log('contract created')
    let acceptedScoreTokens = await viewFacet.getAcceptedScoreTokens()
    //console.log("accpetted score tokens ",acceptedScoreTokens)
    let tokens = []
    for(let i=0; i < acceptedScoreTokens.length; i++){
      const token = new ethers.Contract(acceptedScoreTokens[i], erc20ABI, provider)
      let tokenName = await token.name()
      let STstruct = {
        scoreTokenAddress: acceptedScoreTokens[i],
        scoreTokenName: tokenName
      }
      tokens.push(STstruct)
    }
    setAcceptedScoreToken(tokens)
    let acceptedEkoStables = await viewFacet.getAcceptedEkoStables()
    //console.log("accepted srtables ", acceptedEkoStables)
    let stables = []
    for(let i=0; i < acceptedEkoStables.length; i++){
      const stable = new ethers.Contract(acceptedEkoStables[i], erc20ABI, provider)
      let stableName = await stable.name()
      let ESstruct = {
        ekoStableAddress: acceptedEkoStables[i],
        ekoStableName: stableName
      }
      stables.push(ESstruct)
    }
    setAcceptedEkoStable(stables)
  }


    async function approve(){
        if(isConnected){
        try{
          const token = new ethers.Contract(selectedST, erc20ABI, signer);
          let app = await token.approve(exchangeAddress, givingAmount);
          //setIsLoading(true)
          await app.wait();
          notyf.success(`${selectedST} approved succesfully`)
          //setIsApproved(true)
        } catch{
          notyf.error(`Error while approving ${selectedST}`)
        }finally{
          //setIsLoading(false)
        }
      } else{
        notyf.error("Not connected")
      }
      }

      async function BuyScoreTokensFromSellOrder(){
        if(isConnected){
          try{
            const sellFacet = new ethers.Contract(exchangeAddress, sellFacetAbi, signer)
            let ex = await sellFacet.createSellScoreTokenOrder(selectedST, givingAmount, selectedES, requestingAmount)
            await ex.wait()
            notyf.success('Order created succesfully')
          } catch {
            notyf.error('Error while fulfilling the order')
          }
        } else {
          notyf.error("Not connected")
        }
      }


      //console.log('ACEPTED SCORE TOKENS',acceptedScoreTokens)
      //console.log(selectedSTName)
      //console.log('giving amount', givingAmount)
      console.log('selected score token ',selectedST)
      console.log('selected ekostable', selectedES)
  return (
    // <div style={{ backgroundColor:'red' }}>Hello

 <div  id="editUserModal" tabindex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 flex z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full"> 
{/* <div  id="editUserModal" tabindex="-1" aria-hidden="true" className="absolute w-[150%] top-0 left-0 right-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full"> */}
        <div className="relative w-full h-full max-w-2xl md:h-auto">
            {/* <!-- Modal content --> */}
            <form action="#" className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* <!-- Modal header --> */}
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Create SELL score token order
                    </h3>
                    <button onClick={handleOkClick} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="editUserModal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                    </button>
                </div>
                {/* <!-- Modal body --> */}

                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <label for="first-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Giving Token</label>
                            {/* Dropdown menu */}




                            {/* <Menu as="div" className="relative inline-block text-left" 
                            onSelect={(e) => {setSelectedST(e.target.value)
                           }}>
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                   Choose the scoreToken to sell
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {acceptedScoreTokens ?  
            acceptedScoreTokens.map((scoreToken) =>{
              return(
                <Menu.Item key={scoreToken.scoreTokenName} value={scoreToken.scoreTokenAddress} id={scoreToken.scoreTokenName}>
                  {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-black text-white' : 'text-white',
                    'block px-4 py-2 text-sm'
                  )} 
                >
                  {scoreToken.scoreTokenName}
                </a>
              )}
                   </Menu.Item>
              )
            }) : 
            "Fetching"            
          }
          </div> 
        </Menu.Items>
      </Transition>
    </Menu> */}
                  <Dropdown>
      <Dropdown.Button flat>Choose the score token to sell</Dropdown.Button>
      <Dropdown.Menu aria-label="Static Actions"
      onAction={(key) => setSelectedST(key)}>
        {acceptedScoreTokens ?  
            acceptedScoreTokens.map((scoreToken) =>{
              return(
              <Dropdown.Item key={scoreToken.scoreTokenAddress} value={scoreToken.scoreTokenAddress}>{scoreToken.scoreTokenName}</Dropdown.Item>
              ) }) 
              : null}
      </Dropdown.Menu>
    </Dropdown>







                            {/* <input type="text" name="first-name" id="first-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ScoreToken" required="" /> */}
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label for="last-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Input Giving Amount</label>
                            <input type="text" name="last-name" id="last-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="250$" required="" 
                            onChange={(e) => setGivingAmount(e.target.value)}
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Requesting Token</label>
                            {/* Dropdown menu */}


                            {/* <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Select the EkoStable you want
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {acceptedEkoStables ?  
            acceptedEkoStables.map((ekoStable) =>{
              return(
                <Menu.Item key={ekoStable.ekoStableAddress} value={ekoStable.ekoStableAddress}>
                  {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-black text-white' : 'text-white',
                    'block px-4 py-2 text-sm'
                  )} 
                >
                  {ekoStable.ekoStableName}
                </a>
              )}
                   </Menu.Item>
              )
            }) : 
            "Fetching"            
          }
          </div> 
        </Menu.Items>
      </Transition>
    </Menu>

 */}

<Dropdown>
      <Dropdown.Button flat>Select Eko Stable</Dropdown.Button>
      <Dropdown.Menu aria-label="Static Actions"
      onAction={(key) => setSelectedES(key)}>
        {acceptedEkoStables ?  
            acceptedEkoStables.map((ekoStable) =>{
              return(
              <Dropdown.Item key={ekoStable.ekoStableAddress} value={ekoStable.ekoStableAddress}>{ekoStable.ekoStableName}</Dropdown.Item>
              ) }) 
              : null}
      </Dropdown.Menu>
    </Dropdown>



                            {/* <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="EkoStable" required="" /> */}
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label for="phone-number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Requesting Amount</label>
                            <input type="number" name="phone-number" id="phone-number" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="250$" required="" 
                            onChange={(e) => setRequestingAmount(e.target.value)}
                            />
                        </div>


                        {/* <div className="col-span-6 sm:col-span-3">
                            <label for="department" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                            <input type="text" name="department" id="department" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Development" required="" />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label for="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company</label>
                            <input type="number" name="company" id="company" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123456" required="" />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label for="current-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Password</label>
                            <input type="password" name="current-password" id="current-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required="" />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label for="new-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                            <input type="password" name="new-password" id="new-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required="" />
                        </div> */}


                    </div>
                </div>
                {/* <!-- Modal footer --> */}
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button onClick={()=> approve()} className="text-blue bg-blue-600 hover:bg-red focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-red-100 dark:focus:ring-blue-800" >Approve</button>
                    <button onClick={()=> BuyScoreTokensFromSellOrder()} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create SELL score token order</button>
                    <button onClick={handleOkClick} type="submit" className="text-blue bg-blue-600 hover:bg-red focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-red-100 dark:focus:ring-blue-800">Cancel</button>
                </div>
            </form>
        </div>
    </div>


    // </div>

  
  )
}

export default CreateSellScoreTokenOrderModal