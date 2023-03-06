import React, { useState } from 'react';
import { RiSettings3Fill } from 'react-icons/ri';
import { AiOutlineDown } from 'react-icons/ai';
import Modal from 'react-modal';
import { Link } from "react-router-dom";
import Header from './Header';
import TransactionLoader from './TransactionLoader';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#0a0b0d',
    padding: 0,
    border: 'none',
  },
  overlay: {
    backgroundColor: 'rgba(10, 11, 13, 0.75)',
  },
};

const Ekoswap = () => {
  const [fromToken, setFromToken] = useState('EKO');
  const [toToken, setToToken] = useState('USDT');
  const [amount, setAmount] = useState('');
  const [addressTo, setAddressTo] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Swapping ${amount} ${fromToken} for ${toToken} and sending to ${addressTo}`);
    setModalIsOpen(true);
    // Perform the actual swap and send the transaction
    // ...
    // After the transaction is complete, close the modal
    setModalIsOpen(false);
  };

  return (
    <div className='pt-24 h-screen'>
      <Header />
      <div className='w-screen flex items-center justify-center '>
        <div className='bg-[#191B1F] w-[40rem] rounded-2xl p-4'>
          <div className='px-2 flex items-center justify-between font-semibold text-xl'>
            <div>Swap</div>
            <div>
              <RiSettings3Fill />
            </div>
          </div>
          <div className='bg-[#20242A] my-3 rounded-2xl p-6 text-3xl  border border-[#20242A] hover:border-[#41444F]  flex justify-between'>
            <input
              type='text'
              className='bg-transparent placeholder:text-[#B2B9D2] outline-none mb-6 w-full text-2xl'
              placeholder='0.0'
              pattern='^[0-9]*[.,]?[0-9]*$'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className='flex w-1/4'>
              <div className='w-full h-min flex justify-between items-center bg-[#2D2F36] hover:bg-[#41444F] rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem]'>
                <div className='flex items-center'>
                  <div className='mx-2'>{fromToken}</div>
                  <AiOutlineDown className='text-lg' />
                </div>
              </div>
            </div>
          </div>
          <div className='bg-[#20242A] my-3 rounded-2xl p-6 text-3xl  border border-[#20242A] hover:border-[#41444F]  flex justify-between'>
            <input
              type='text'
              className='bg-transparent placeholder:text-[#B2B9D2] outline-none mb-6 w-full text-2xl'
              placeholder='0.0'
              readOnly
              value={toToken === 'EKO' ? '0.0' : '∞'}
              />
              <div className='flex w-1/4'>
              <div className='w-full h-min flex justify-between items-center bg-[#2D2F36] hover:bg-[#41444F] rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem]'>
              <div className='flex items-center'>
              <div className='mx-2'>{toToken}</div>
              <AiOutlineDown className='text-lg' />
              </div>
              </div>
              </div>
              </div>
              <div className='bg-[#20242A] my-3 rounded-2xl p-6 text-3xl border border-[#20242A] hover:border-[#41444F]'>
              <input
              type='text'
              className='bg-transparent placeholder:text-[#B2B9D2] outline-none mb-6 w-full text-2xl'
              placeholder='Recipient address'
              value={addressTo}
              onChange={(e) => setAddressTo(e.target.value)}
              />
              </div>
              <div className='flex justify-center'>
              <button
                         className='bg-[#9C51B6] w-1/2 rounded-full text-white font-bold text-lg py-4 hover:bg-[#A566C1]'
                         onClick={handleSubmit}
                       >
              Swap
              </button>
              </div>
              </div>
              </div>
              <Modal isOpen={modalIsOpen} style={customStyles}>
              <TransactionLoader />
              </Modal>
              </div>
              );
              };
              
              export default Ekoswap;
