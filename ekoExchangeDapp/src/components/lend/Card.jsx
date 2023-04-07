import React from 'react'
import styles from "../../style";
import Button from "./Button";
import ButtonB from './ButtonB';

const Card = () => 
 (
    <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
    <div className="flex-1 flex flex-col">
      <h2 className={styles.heading2}>What Ekolance is offering you!</h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        You can lend out your Ekostable and get interest in return by supplying and
        get ekostable from your friends around by borrowing.
      </p>
    </div>

    <div className={`${styles.flexCenter} space-x-12 sm:ml-10 ml-0 sm:mt-0 mt-10`}>
      <Button />
      <ButtonB />
    </div>
  </section>
  )


export default Card