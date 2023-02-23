import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "./style.css"

function SellOrder() {

  return (
    
    <div className="container block mx-auto my-10 w-3/5">
      
        <Link to="/exchange" class="inline-block mb-6 px-2 py-1 font-semibold bg-green-100 dark:text-primary rounded-full">
            <div class="flex flex-wrap items-center -m-1">
            <div class="w-auto p-1">
               <AiOutlineArrowLeft/>
              </div>
              <div class="w-auto p-1 text-sm">&#x1F44B; Back to Exchange Page</div>
            </div>
          </Link>


      <form className="buyForm">
        <div class="w-full relative mb-6 group block mx-auto">
          <h4 className="mt-2">Choose Token Type</h4>
          <select className="mt-4">
            <option>EKOSCORES</option>
            <option>EKOTOKEN</option>
          </select>
        </div>

        <div class="relative z-0 w-full mb-9 group">
          <input
            type="number"
            name="number"
            id="number"
            class="block py-2.5 px-0 w-full text-sm pt-6 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="E.g 0.001"
            required
          />
          <label
            for="number"
            class="peer-focus:font-medium absolute text-sm text-primary  duration-300 transform -translate-y-6 scale-75 top-1 -z-1 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-105 peer-focus:-translate-y-6"
          >
            How Much Token do you want to sell?
          </label>
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <input
            type="number"
            name="number"
            id="=number"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="E.g 0x4191fd...."
            required
          />
          <label
            for="floating_password"
            class="peer-focus:font-medium absolute text-sm text-primary duration-300 transform -translate-y-6 scale-75 -top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-105 peer-focus:-translate-y-6"
          >
          How much are you willing to accept?
          </label>
        </div>

        <Link to="/sell_order" className="">
          <button
            type="submit"
            className="p-3 mt-4 text-white text-lg rounded-md bg-primary"
          >
            Submit Sell Order
          </button>
        </Link>
      </form>
    </div>
  );
}

export default SellOrder;
