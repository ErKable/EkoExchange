import React, {useState, useEffect} from 'react'

function Loader() {


    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 8000);
    }, []);
  return (
    <div>
        <div class="lds-facebook"><div></div><div></div><div></div></div>
    </div>
  )
}

export default Loader