import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Input, Button, Dropdown } from "@nextui-org/react";
import { useSigner } from "wagmi";
import { erc20ABI } from "@wagmi/core";
import { readContract } from "@wagmi/core";
import "./style.css";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import Loader from "../../components/Loader";

function SellOrderModal({ trigger, show, onCancel }) {
  const [selected, setSelected] = React.useState(new Set(["EkoStable"]));
  const [selectedSecond, setSelectedSecond] = React.useState(
    new Set(["ScoreToken"])
  );
  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );
  const secondSelectedValue = React.useMemo(
    () => Array.from(selectedSecond).join(", ").replaceAll("_", " "),
    [selectedSecond]
  );
  const [stBal, setSTBal] = useState('0.00')
  const [ekoBal, setEkoBal] = useState("0.00")
  const [isLoading, setIsLoading] = useState(false)
  const exchangeAddress = "0x62853E9eBdaaF86C1835Bb959bb0A43e508a1280";
  const [acceptedStables, setAcceptedStables] = useState();
  const [acceptedScoreTokens, setAcceptetScoreTokens] = useState();
  const [stAddress, setSTaddress] = useState();
  const [stAmount, setSTamount] = useState();
  const [ekoAddress, setEkoAddress] = useState();
  const [ekoAmount, setEkoAmount] = useState();
  const viewFacetAbi = require("../../abi/ViewFacetAbi.json");
  const sellFacetAbi = require("../../abi/SellFacetAbi.json");
  const RPC = "https://data-seed-prebsc-1-s3.binance.org:8545/";
  const provider = new ethers.providers.JsonRpcProvider(RPC);
  
  const { data: signer } = useSigner();
  const notyf = new Notyf({
    position: { x: "center", y: "top" },
    duration: 5000,
  });
  useEffect(() => {
    fetchScoreTokenAddress();
    fetchAcceptedStable();
  }, []);

  useEffect(() => {
    stableBalance()
  }, [ekoAddress])

  useEffect(() => {
    tokenBalance()
  }, [stAddress])

  async function fetchScoreTokenAddress() {
    const data = await readContract({
      address: exchangeAddress,
      abi: viewFacetAbi,
      functionName: "getAcceptedScoreTokens",
    });
    let score = [];
    for (let i = 0; i < data.length; i++) {
      const tkName = await readContract({
        address: data[i],
        abi: erc20ABI,
        functionName: "name",
      });
      console.log("tkName", tkName);
      let tkStruct = {
        address: data[i],
        name: tkName,
      };
      score.push(tkStruct);
    }
    setAcceptetScoreTokens(score);
  }

  async function fetchAcceptedStable() {
    const data = await readContract({
      address: exchangeAddress,
      abi: viewFacetAbi,
      functionName: "getAcceptedEkoStables",
    });
    let stables = [];

    for (let i = 0; i < data.length; i++) {
      const tkName = await readContract({
        address: data[i],
        abi: erc20ABI,
        functionName: "name",
      });
      console.log("tkName", tkName);
      let tkStruct = {
        address: data[i],
        name: tkName,
      };
      stables.push(tkStruct);
    }
    setAcceptedStables(stables);
  }

  async function createSellOrder() {
    try{
      const sellFacet = new ethers.Contract(exchangeAddress, sellFacetAbi, signer);
      let order = await sellFacet.createSellScoreTokenOrder(stAddress, stAmount, ekoAddress, ekoAmount);
      setIsLoading(true)
      await order.wait();
      notyf.success('Order created successfully')
      trigger();
      }catch{
        notyf.error("Order creation failed")
      } 
      finally{
        setIsLoading(false)
      }
  }
  
  async function approve(){
    try{
      const st = new ethers.Contract(stAddress, erc20ABI, signer);
      let app = await st.approve(exchangeAddress, stAmount);
      setIsLoading(true)
      await app.wait();
      notyf.success('Token approved successfully')
    } catch {
      notyf.error('Error while approving token')
    } finally{
      setIsLoading(false)
    }
  }

  async function stableBalance(){
    if(ekoAddress != 0){
      if(signer){
        try{      
          const c = new ethers.Contract(ekoAddress, erc20ABI, provider)
          const bal = await c.balanceOf(signer._address)
          console.log("signer._address", signer._address)
          console.log('bal', ethers.utils.parseUnits(bal.toString(), 9).toString())
          setEkoBal(ethers.utils.parseUnits(bal.toString(),9).toString())
        } catch{}
      } else {
        //notyf.error("Remember to log in with your wallet to create an order")
      }
    }
  }

  async function tokenBalance(){
    if(stAddress != 0){
      if(signer){
        try{      
          const c = new ethers.Contract(stAddress, erc20ABI, provider)
          const bal = await c.balanceOf(signer._address)
          console.log("signer._address", signer._address)
          console.log('bal', ethers.utils.parseUnits(bal.toString(), 9).toString())
          setSTBal(ethers.utils.parseUnits(bal.toString(),9).toString())
        } catch{}
      } else {
        //notyf.error("Remember to log in with your wallet to create an order")
      }
    }
  }

  const submitData = (event) => {
    event.preventDefault();
    // onSubmit(formData);
    onCancel();
  };

  return show ? (
    <div className="modal-overlay">
      <div className="modal">
        <form onSubmit={submitData}>

        <div className="modal-section relative block">
            <label>Select ScoreToken Address</label>
            <div className="flex justify-center w-full mt-3">
              <Dropdown>
                <Dropdown.Button flat>{secondSelectedValue}</Dropdown.Button>
                <Dropdown.Menu
                  aria-label="Single selection actions"
                  selectionMode="single"
                  selectedKeys={selectedSecond}
                  disallowEmptySelection
                  onSelectionChange={setSelectedSecond}
                  onAction={(stAdd) => setSTaddress(stAdd)}
                >
                  {acceptedScoreTokens
                    ? acceptedScoreTokens.map((scoreToken) => {
                        return (
                          <Dropdown.Item
                            key={scoreToken.address}
                            value={scoreToken.address}
                            required={true}
                          >
                            {scoreToken.name}
                          </Dropdown.Item>
                        );
                      })
                    : "FETCHING ST"}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          <div className="modal-section relative block">
            <label>Giving Amount</label>
            <div className="mt-3">
              <Input
                placeholder="Insert ST amount"
                required
                type="number"
                className="input-edit"
                onChange={(e) => setSTamount(e.target.value)}
              />
            </div>
          </div>
          <p style={{color: 'black'}}>ST bal {stBal} </p>

          <div className="modal-section relative block">
            <label>Select EkoStable Address </label>
            <div className="flex justify-center w-full mt-3">
              <Dropdown>
                <Dropdown.Button flat>{selectedValue}</Dropdown.Button>
                <Dropdown.Menu
                  aria-label="Single selection actions"
                  selectionMode="single"
                  selectedKeys={selected}
                  disallowEmptySelection
                  onSelectionChange={setSelected}
                  onAction={(ekoAdd) => setEkoAddress(ekoAdd)}
                >
                  {acceptedStables
                    ? acceptedStables.map((ekoStable) => {
                        return (
                          <Dropdown.Item
                            key={ekoStable.address}
                            value={ekoStable.address}
                            required={true}
                          >
                            {ekoStable.name}
                          </Dropdown.Item>
                        );
                      })
                    : "FETCHING STABLES"}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          

          <div className="modal-section block">
            <label>Requesting Amount</label>
            <div className="mt-3">
              <Input
                placeholder="Insert ES amount"
                required
                className="input-edit"
                type="number"
                onChange={(e) => setEkoAmount(e.target.value)}
              />
            </div>
          </div>
          <p style={{color: 'black'}}>EkoStable Balance: {ekoBal}</p>
          

          <div className="flex mx-auto justify-center mt-10 ">
          {isLoading ? <Loader/> : <button onClick={() => approve()} className="create-btn">
              Approve
            </button>}
            {isLoading ? <Loader /> : <button onClick={() => createSellOrder()} className="create-btn">
              Create Sell order
            </button>}
            <button onClick={onCancel} className="text-red-500 text-lg">
              {" "}
              Cancel{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}

export default SellOrderModal;
