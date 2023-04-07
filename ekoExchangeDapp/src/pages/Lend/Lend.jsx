import React from 'react';
import styles from '../../style';
import { Billing, Business, CardDeal, Clients, CTA, Footer, Navbar, Stats, Testimonials, Hero } from "../../components/home";
// import { Card, Button, ButtonB, Table } from "../../components/lend";
import Card from "../../components/lend/Card";
import Table from "../../components/lend/Table";
import Create from "../../components/lend/Create";


const Lend = () => 
 (
  <div className="bg-primary w-full overflow-hidden">
  <div className={`${styles.paddingX} ${styles.flexCenter}`}>
    <div className={`${styles.boxWidth}`}>
      <Navbar />
    </div>
  </div>

  <div className={`bg-primary ${styles.flexStart}`}>
    <div className={`${styles.boxWidth}`}>
      {/* <Hero /> */}
    </div>
  </div>
  
  <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
    <div className={`${styles.boxWidth}`}>
      {/* <Stats />
      <Business />
      <Billing />
      <CardDeal />
      <Testimonials />
      <Clients /> */}
      <Card />
      <Table />
      <Create />
      <Footer />
    </div>
  </div>
</div>
  )


export default Lend