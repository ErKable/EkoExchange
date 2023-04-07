import React from 'react'
import styles from "../../style";
import Button from "./Button";
import ButtonB from './ButtonB';
import ButtonCreateOrder from './ButtonCreateOrder';
//import CreateOrderModal from './CreateOrderModal';

const Create = () => {

 //Add a way to display the create component according to the order displayed
//    E.G. I'm looking through the Buy order and the Create component should allow me to create a Buy Score Token orders (as it does currently)
//    modify this component to display the create sell score token order button while analyzing the sell orders

  return (
    <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
    <div className="flex-1 flex flex-col">
      {/* <h2 className={styles.heading2}>What Ekolance is offering you!</h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        You can lend out your Ekostable and get interest in return by supplying and
        get ekostable from your friends around by borrowing.
      </p> */}
      <marquee className={styles.paragraph} behavior="" direction="ltr">You Can <span style={{ color:"blue" }}>Create</span> Your Own <span style={{ color:"blue" }}>Order</span> If The Orders We Have Does Not Meet Your <span style={{ color:"blue" }}>Desired</span> Order</marquee>
    </div>

    <div className={`${styles.flexCenter} space-x-12 sm:ml-10 ml-0 sm:mt-0 mt-10`}>
      {/* <Button /> */}
      <ButtonCreateOrder />
    </div>
  </section>
  )
}

export default Create