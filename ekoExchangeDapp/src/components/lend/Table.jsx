import React, { useEffect, useState } from 'react';
import { ekologo1, ekologo, ekologo2 } from '../../assets';
import Modal from './Modal';
import styles from "../../style";
import Card from './Card';
import viewFacetAbiz from "../../abi/ViewFacetAbi.json"
import { ethers } from 'ethers';
import { buyTable } from "../../constants";
import SellOrderComp from './SellOrderComp';
import BuyOrderComp from './BuyOrderComp';




const Table = () => {

/*      // new state variables
     const [modalOn, setModalOn] = useState(false);
     const [choice, setChoice] = useState(false);

    //  new onClick event to toggle modal
    const clicked = () => {
        setModalOn(true);
    } */

    const [option, setOption] = useState('1');

    const exchangeAddress = "0x62853E9eBdaaF86C1835Bb959bb0A43e508a1280";
    const [buyOrdersInfo, setBuyOrdersInfo] = useState();
    const [sellOrdersInfo, setSellOrdersInfo] = useState()
    const viewFacetAbi = viewFacetAbiz;
    const RPC = "https://data-seed-prebsc-1-s1.binance.org:8545";
    const provider = new ethers.providers.JsonRpcProvider(RPC);
    
    const [lastOrders, setLastOrders] = useState();

   useEffect(() =>{
    getLatestBuys()
    getLatestSell()
   }, [])

    async function getLatestBuys() {   
        const c = new ethers.Contract(exchangeAddress, viewFacetAbi, provider)
        const data = await c.getLatestSellOrders('15')
        //console.log("Ethers call latebuyids",data);
        let ids = [];
        for (let i = 0; i < data.length; i++) {
          ids[i] = Number(data[i]);
        }
        console.log(ids);
        setLastOrders(ids);
        await getOrderStruct(ids);
      }

      async function getOrderStruct(orderIds) {
        let ordersStructs = [];
        for (let i = 0; i < orderIds.length; i++) {
        
          const c = new ethers.Contract(exchangeAddress, viewFacetAbi, provider)
          const data = await c.getOrderByOrderId(orderIds[i])
          //console.log("buyorder from sc",data);
          let orderStruct = {
            givingToken: data.givingToken,
            givingAmount: Number(data.givingAmount),
            requestingToken: data.requestingToken,
            requestingAmount: Number(data.requestingAmount),
    
            orderId: Number(data.orderId),
            orderType: data.order,
            orderOwner: data.orderOwner,
          };
          //console.log('parsed buy order',orderStruct);
          ordersStructs.push(orderStruct);
        }
        setBuyOrdersInfo(ordersStructs);
      }
      //console.log('BUY ORDERS INFO', buyOrdersInfo)

      async function getLatestSell(){
        const c = new ethers.Contract(exchangeAddress, viewFacetAbi, provider)
        const data = await c.getLatestBuyOrders('15')
        console.log('latest buy orders from sc: ', data)
        let ids = []
        for(let i = 0; i < data.length; i++){
            ids[i] = Number(data[i])
        }
        getLatestParsedSell(ids)
      }

      async function getLatestParsedSell(orderIds){
        let ordersStruct = []
        for(let i = 0; i < orderIds.length; i++){
            const c = new ethers.Contract(exchangeAddress, viewFacetAbi, provider)
            const data = await c.getOrderByOrderId(orderIds[i])

            let orderStruct = {
                givingToken: data.givingToken,
                givingAmount: Number(data.givingAmount),
                requestingToken: data.requestingToken,
                requestingAmount: Number(data.requestingAmount),
    
                orderId: Number(data.orderId),
                orderType: data.order,
                orderOwner: data.orderOwner,
            }
            console.log('Parsed sell order', orderStruct)
            ordersStruct.push(orderStruct);
        }
        setSellOrdersInfo(ordersStruct)
      }



  return (

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
{/* <h5 className={styles.heading2}>Latest <span className="text-gradient">Buy</span> Order Created</h5> */}
    {/* <div className="flex items-center justify-between py-4 bg-white dark:bg-gray-800"> */}
    <div className="flex items-center justify-between py-4 bg-white bg-black-gradient-2">
        <div>

            {/* <span>
                <marquee behavior="" direction="ltr">you can create a new order if you order is not availabel</marquee>
            </span> */}

            <span className='text-gray-900 dark:bg-black-gradient-2'>hel</span>

        {/* <button id="dropdownActionButton" data-dropdown-toggle="dropdownAction" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                <span className="sr-only">Action button</span>
                CREATE BUY ORDER
                <svg className="w-3 h-3 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button> */}


            <a className={`option ${option === '1'? 'selected' : ''}`} onClick={(e) => setOption('1')}>
            <button className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-blue-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                Buy
                <svg className="w-3 h-3 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            </a>

            <a className={`option ${option === '2'? 'selected' : ''}`} onClick={(e) => setOption('2')}>
            <button id="dropdownActionButton" data-dropdown-toggle="dropdownAction" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-white dark:text-black dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                {/* <span className="sr-only">Action button</span> */}
                Sell
                <svg className="w-3 h-3 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            </a>



{/* dont forget to check here */}


            {/* <span className='text-gray-900 dark:bg-black-gradient-2'>hel</span>

            <button id="dropdownActionButton" data-dropdown-toggle="dropdownAction" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                <span className="sr-only">Action button</span>
                ekoST
                <svg className="w-3 h-3 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>

            <button id="dropdownActionButton" data-dropdown-toggle="dropdownAction" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                <span className="sr-only">Action button</span>
                ekoTK10
                <svg className="w-3 h-3 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>

            <button id="dropdownActionButton" data-dropdown-toggle="dropdownAction" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                <span className="sr-only">Action button</span>
                ekoTk20
                <svg className="w-3 h-3 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>

            <button id="dropdownActionButton" data-dropdown-toggle="dropdownAction" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                <span className="sr-only">Action button</span>
                ekoTk30
                <svg className="w-3 h-3 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>

            <button id="dropdownActionButton" data-dropdown-toggle="dropdownAction" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                <span className="sr-only">Action button</span>
                ekoTk100
                <svg className="w-3 h-3 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button> */}

{/* na here you dey check end */}


            {/* <!-- Dropdown menu --> */}


            {/* <div id="dropdownAction" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reward</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Promote</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Activate account</a>
                    </li>
                </ul>
                <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete User</a>
                </div>
            </div> */}



        </div>
        <label for="table-search" className="sr-only">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            </div>
            <input type="text" id="table-search-users" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for coin" />
        </div>
        {/* <span className='text-gray-900 dark:bg-black-gradient-2'>hel</span> */}
    </div>
    {/* <span className='text-gray-900 dark:bg-black-gradient-2'>hel</span> */}

    <h5 className={styles.paragraph}>Latest <span className="text-gradient">Buy</span> Order Created</h5>

    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 bg-black-gradient-2 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Owned Token
                </th>
                <th scope="col" className="px-6 py-3">
                    Giving Amount 
                </th>
                <th scope="col" className="px-6 py-3">
                    Requested Token
                </th>
                <th scope="col" className="px-6 py-3">
                    Requested Amount
                </th>
                <th scope="col" className="px-6 py-3">
                    Order
                </th>
            </tr>
        </thead>
        <tbody>
             {/* <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">  */}


      {buyOrdersInfo && option === '1' ?  buyOrdersInfo.map((order) =>{
        return(
            <SellOrderComp order={order} />
        )
        }) : "LOADING"}


      {sellOrdersInfo && option === '2' ? sellOrdersInfo.map((order) => {
        return(
            <BuyOrderComp order={order}/>
        )
      }) : 'Loading'}


        </tbody>

        
    </table>

    


{/*     {choice && 
        <div className='flex' justify-center>
            <div className='flex' justify-center bg-blue-400 p-4 m-6 text-lg text-white> Your Order Has Successfully Sent!! 
                <button>hello</button>
            </div>
        </div>
    }

    {modalOn && <Modal setModalOn={setModalOn} setChoice={setChoice} />}
 */}
    
</div>


   




   
  )
}

export default Table



// https://flowbite.com/docs/components/tables/
// https://delightful-cobbler-637104.netlify.app/
// ekoexchangedapp
// https://rpc.info/


//<div className="orderDisplay">     
//{ordersInfo ? (
//    ordersInfo.map((orderInfo) => {
//      return <BuyOrder orderInfo={orderInfo} trigger={trigger} />;
//    })
//  ) : (
//   <Loader />
//  )}

////<CreateBuyScoreTokenOrder exchangeAddress={exchangeAddress} />    
//</div>





// exchange address 0x62853E9eBdaaF86C1835Bb959bb0A43e508a1280

// sdscoretoken 0x18C6ba01Bc9308e3275329CCD65F64216c909d5f 
// ccscoretoken 0xBA06c171193DC86464b9EbEc7dc5180a4002ca2b
// cmscoretoken 0xE846391784D023c8fb42FC861D47f87cd7A0b080
// scoretoken 0xaBa35b3BCc7Cc84faAAa62a2928d6381274B64DF

// ekousdt 0x4446086122b9e54c23D21Fbfa8Dc784c4a8B3AB4
// ekoDai 0x99aA6A33462f87a54ef5ccC8a8BF74E240294FB1
// ekoUSDT/eBUSD 0xA828D05c83990B31878Dee09AFd4Eb2EbaeE1B40
// ekoStable 0xc7Bf89a43eaC3B19fC01F3b4aeCee750a821b821 
// Gianluigi Alfredo Capriello says:exchange address 0x62853E9eBdaaF86C1835Bb959bb0A43e508a1280

// sdscoretoken 0x18C6ba01Bc9308e3275329CCD65F64216c909d5f 
// ccscoretoken 0xBA06c171193DC86464b9EbEc7dc5180a4002ca2b
// cmscoretoken 0xE846391784D023c8fb42FC861D47f87cd7A0b080
// scoretoken 0xaBa35b3BCc7Cc84faAAa62a2928d6381274B64DF

// ekousdt 0x4446086122b9e54c23D21Fbfa8Dc784c4a8B3AB4
// ekoDai 0x99aA6A33462f87a54ef5ccC8a8BF74E240294FB1
// ekoUSDT/eBUSD 0xA828D05c83990B31878Dee09AFd4Eb2EbaeE1B40
// ekoStable 0xc7Bf89a43eaC3B19fC01F3b4aeCee750a821b821 



// react update and downgrade

// https://upmostly.com/tutorials/how-to-check-my-react-version-and-update-it#:~:text=To%20check%20which%20React%20version,of%20those%20should%20be%20React.


// https://www.rainbowkit.com/docs/introduction


// https://www.rainbowkit.com/docs/installation