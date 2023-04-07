
import { useState } from 'react';
import styles from '../../style';
import CreateBuyScoreTokenOrderModal from './CreateBuyScoreTokenOrderModal';
import CreateSellScoreTokenOrderModal from './CreateSellScoreTokenOrderModal'

const ButtonCreateOrder = () => {
  
    // new state variables
    const [modalOn, setModalOn] = useState(false);
    const [choice, setChoice] = useState(false);
 
   //  new onClick event to toggle modal
   const clicked = () => {
       setModalOn(true);
   }
 

   return(
    <div>
      <a onClick={clicked}>
      <button  type="button" className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-white rounded-[10px] outline-none ${styles}`}>
      Create Order
    </button>
      </a>

    {modalOn && <CreateBuyScoreTokenOrderModal setModalOn={setModalOn} setChoice={setChoice} />}
    </div>

  )
}

export default ButtonCreateOrder