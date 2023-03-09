import React, {useState, useEffect} from 'react'

function Loader() {


    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 6000);
    }, []);
  return (
    <div className='flex justify-center'>
        <div class="lds-facebook"><div></div><div></div><div></div></div>
    </div>
  )
}

export default Loader