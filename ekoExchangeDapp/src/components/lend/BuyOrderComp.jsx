import React from 'react'
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { erc20ABI } from 'wagmi';
import ModalBuy from './ModalBuy';

const BuyOrderComp = ({order}) => {

  const [modalOn, setModalOn] = useState(false);
  const [choice, setChoice] = useState(false);
  const [ekoStableName, setEkoStableName] = useState()
  const [scoreTokenName, setScoreTokenName] = useState()
  const RPC = "https://data-seed-prebsc-1-s1.binance.org:8545";
  const provider = new ethers.providers.JsonRpcProvider(RPC);
  const clicked = () => {
          setModalOn(true);
      }


      useEffect(() => {
        getTokensName()
    }, [])

async function getTokensName(){
    const EkoStable = new ethers.Contract(order.givingToken, erc20ABI, provider)
    let scoreName = await EkoStable.name()
    console.log('EkoStable', scoreName)
    setEkoStableName(scoreName)

    const ScoreToken = new ethers.Contract(order.requestingToken, erc20ABI, provider)
    let ekoName = await ScoreToken.name()
    console.log('ScoreToken', ekoName)
    setScoreTokenName(ekoName)
}   

  return (
    <><tr className="bg-black-gradient-2 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    <td scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
        {/* <img className="w-5 h-5 rounded-full" src={item.img} alt="Jese image" /> */}
        <div className="pl-3">
            <div className="text-base font-semibold">{ekoStableName}</div>
            {/* <div className="font-normal text-gray-500">paulpoles@gmail.com</div> */}
        </div>  
    </td>
    <td className="px-6 py-4">
        <span>
            {order.givingAmount}
        </span>
    </td>
    <td className="px-6 py-4">
        <div className="flex items-center">
            {/* <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>  */}
            <div>
                <span>{scoreTokenName}</span><br />
                
            </div>
        </div>
    </td>
    <td className="px-6 py-4">
        <div className="flex items-center">
            {/* <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>  */}
            <div>
                
                <span>{order.requestingAmount}</span>
            </div>
        </div>
    </td>
    <td className="px-6 py-4">
        {/* <!-- Modal toggle --> */}
        {/* onclicked event is called on click button */}
        {/* <a type="button" data-modal-target="editUserModal" data-modal-show="editUserModal" className="font-medium text-blue-600 dark:text-blue-500 hover:underline"><button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Approve</button></a>
        <span className='text-gray-700 dark:bg-black-gradient-2'>hel</span> */}
        <a type="button" data-modal-target="editUserModal" data-modal-show="editUserModal" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={clicked}><button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sell</button></a> 
    </td>
</tr>
{/* {choice && 
        <div className='flex' justify-center>
            <div className='flex' justify-center bg-blue-400 p-4 m-6 text-lg text-white> Your Order Has Successfully Sent!! 
                <button>hello</button>
            </div>
        </div>
    } */}

    {modalOn && <ModalBuy setModalOn={setModalOn} setChoice={setChoice} givingToken={scoreTokenName} 
    requestingToken={ekoStableName} orderInfo={order} />}
</>
  )
}

export default BuyOrderComp