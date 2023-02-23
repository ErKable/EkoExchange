import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import BuyOrder from "./BuyOrderModal";
import SellOrder from "./SellOrderModal";
import data from './data.json';
import DataItem from './data-item';



function Index() {

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState(data);
  const [currentUser, setCurrentUser] = useState(null);


  const toggleModal = () => {
    setShowModal(!showModal);
  }

  const addUser = user => {
    if (currentUser) {
      setUserData(userData.map(data => (data.id === user.id ? user : data)));
      setCurrentUser(null);
      return;
    }
    user.id = userData.length + 1;
    setUserData([...userData, user]);
  }

  const editUserHandler = user => {
    setCurrentUser(user);
    toggleModal();
  }

  const deleteUser = user => {
    setUserData(userData.filter(item => item.name !== user.name));
  }




  return (
    <div>
      <div className="exchange">

     
        <div className="thebg">
    

          <h1 className="font-bold">Buy and Sell EkoScores and EkoTokens.</h1>
          <h3 className="pt-4 font-medium">
            Buy and sell EkoScores and EkoTokens safely and easily on Ekolance
            P2P.
          </h3>
          <p className="">
            Find the best offer below and buy and sell EkoScores and EkoTokens
            today.
          </p>
        </div>

        <div className="msRGContainer">
          <div className="mSRG-Btn">
            <button
              id="Gallery1"
              className={
                toggleState === 1 ? " mSRG-btn  active-tabs " : "mSRG-btn"
              }
              onClick={() => toggleTab(1)}
            >
              {" "}
              Buy
            </button>

            <button
              id="Gallery2"
              className={
                toggleState === 2 ? " mSRG-btn active-tabs" : "mSRG-btn"
              }
              onClick={() => toggleTab(2)}
            >
              Sell
            </button>

               
         
          </div>

          <div id="mSRG-container">
            <div className="block mx-auto"></div>

            <div
              id="Gallery1"
              className={
                toggleState === 1
                  ? "mSRG-container-inner  active-content"
                  : "mSRG-container-inner"
              }
            >
              <form className="flex justify-center gap-10">
                <div>
                  <h3>Amount</h3>

                  <div className="amount">
                    <input placeholder="Enter Amount" />
                    <button>Search</button>
                  </div>
                </div>

                <div>
                  <h3>Payment</h3>
                  <select>
                    <option>EKOSCORES</option>
                    <option>EKOTOKEN</option>
                  </select>
                </div>
              </form>

              <button className="p-3 mt-4 text-white text-lg rounded-xl bg-primary block mx-auto">
                <div>
                <button onClick={toggleModal}>Create Buy Order</button>
                </div>
                </button>

              <BuyOrder onCancel={toggleModal} onSubmit={addUser} show={showModal} data={userData} editUser={currentUser} />
              <DataItem data={userData} onEdit={editUserHandler} onDelete={deleteUser} />

            
              <div className="block mx-auto mt-5">
                <h1 className="text-center">Can’t find your desired order?</h1>

                <button className="p-5 mt-4 text-white text-lg rounded-md bg-primary block mx-auto">
                <div>
                <button onClick={toggleModal}>Create Buy Order</button>
                </div>
                </button>

              </div>
            </div>
          </div>

          <div id="mSRG-container">
            <div
              id="Gallery2"
              className={
                toggleState === 2
                  ? "mSRG-container-inner  active-content"
                  : "mSRG-container-inner"
              }
            >
                  <form className="flex justify-center gap-10">
                <div>
                  <h3>Amount</h3>

                  <div className="amount">
                    <input placeholder="Enter Amount" />
                    <button>Search</button>
                  </div>
                </div>

                <div>
                  <h3>Payment</h3>
                  <select>
                    <option>EKOSCORES</option>
                    <option>EKOTOKEN</option>
                  </select>
                </div>
              </form>

              <button className="p-5 mt-4 text-white text-lg rounded-md bg-primary block mx-auto">
                <div>
                <button onClick={toggleModal}>Create Sell Order</button>
                </div>
                </button>

              <SellOrder onCancel={toggleModal} onSubmit={addUser} show={showModal} data={userData} editUser={currentUser} />
              <DataItem data={userData} onEdit={editUserHandler} onDelete={deleteUser} />

            
              <div className="block mx-auto mt-5">
                <h1 className="text-center">Can’t find your desired order?</h1>

                <button className="p-5 mt-4 text-white text-lg rounded-md bg-primary block mx-auto">
                <div>
                <button onClick={toggleModal}>Create Sell Order</button>
                </div>
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
