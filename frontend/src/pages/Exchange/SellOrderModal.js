import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


const SellOrderModal = ({show, data, onSubmit, onCancel, editUser}) => {

  useEffect(() => {
    console.log(editUser);
    if (editUser) setFormData(editUser);
  }, [editUser]);

  const initialFormState = () => {
    return editUser ? {id: null, token: 123 , payment: 123} : {id: null, token:  '', payment: ''};
  } 

  const [formData, setFormData] = useState(initialFormState);

  const onInputChange = event => {
    const { token, value } = event.target;
    setFormData({ ...formData, [token]: (token === 'payment' ? parseInt(value) : value )});
  }

  const submitData = event => {
    event.preventDefault();
    onSubmit(formData);
    onCancel();
  }


  return (

  show ? (

  <div className="modal-overlay">

  <div  className='modal'>

  <div className="container block mx-auto my-10 w-full">
  
  <form className="buyForm" onSubmit={submitData}>

  <h3>{editUser ? 'edit details' : 'new details'}</h3>

  <div>

   {/* <div class="w-full relative mb-6 group block mx-auto modal-section"> 

      <h4 className="mt-2">Choose Token Type</h4>

      <select className="mt-4" value={formData.name} >
        <option>EKOSCORES</option>
        <option>EKOTOKEN</option>
      </select>
    </div>  */}

    <div class="relative z-0 w-full mb-9 group modal-section">
      <input
        type="number"
        // name="number"
        // id="number"
        class="block py-2.5 px-0 w-full text-sm pt-6 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder="E.g 0.001"
        required
        value={formData.token} 
        onChange={onInputChange}
      />
      <label
        for="number"
        class="peer-focus:font-medium absolute text-sm text-primary  duration-300 transform -translate-y-6 scale-75 top-1 -z-1 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-105 peer-focus:-translate-y-6"
      >
        How Much Token do you need?
      </label>
    </div>

    <div class="relative z-0 w-full mb-6 group modal-section">
      <input
        type="number"
        name="number"
        id="number"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder="E.g 0x4191fd...."
        required
        value={formData.payment} 
        onChange={onInputChange}
      />
      <label
        for="floating_password"
        class="peer-focus:font-medium absolute text-sm text-primary duration-300 transform -translate-y-6 scale-75 -top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-105 peer-focus:-translate-y-6"
      >
       How much are you willing to pay?
      </label>
    </div>


    <button
      type="submit"
      className="p-3 mt-4 text-white text-lg rounded-md bg-primary"
    >
      Submit Buy Order
    </button>

    <button type="button" onClick={onCancel}>cancel</button>
       
    </div>
  
  </form>
</div>
  </div>
  </div>

  

    ) : null
  );
}

export default SellOrderModal;
