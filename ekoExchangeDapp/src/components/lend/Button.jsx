import { useState } from 'react';
import styles from '../../style';
import CreateBuyScoreTokenOrderModal from './CreateBuyScoreTokenOrderModal';
import CreateSellScoreTokenOrderModal from './CreateSellScoreTokenOrderModal'


const Button = () => { 

      // new state variables
      const [modalOn, setModalOn] = useState(false);
      const [choice, setChoice] = useState(false);
   
     //  new onClick event to toggle modal
     const clicked = () => {
         setModalOn(true);
     }

  const Buy = () => { console.log('hello') }

 return (
    <div>
      <a onClick={clicked}>
      <button onClick={Buy} type="button" className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}>
      Create BuyOrd
    </button>
    </a>

    {modalOn && <CreateBuyScoreTokenOrderModal setModalOn={setModalOn} setChoice={setChoice} />}
    </div>
  );
}

export default Button