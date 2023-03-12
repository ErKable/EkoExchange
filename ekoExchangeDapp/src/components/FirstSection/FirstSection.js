import React,{useEffect, useRef} from 'react'
import lottie from "lottie-web"
import { Link } from 'react-router-dom';


function FirstSection() {

  const container = useRef(null);

	useEffect(() => {
		const instance = lottie.loadAnimation({
		  container:container.current,
		  renderer: 'svg',
		  loop: true,
		  autoplay: true,
		  animationData: require('../../assets/Animations/hero.json')
		});
		return () => instance.destroy();
	  }, []);

  
  return (
    
  <div>

  <section class="bg-gray-50 dark:bg-slate-900 mt-5">

  <div class="overflow-hidden pt-16">
    <div class="container px-2 mx-auto">
      <div class="flex flex-wrap justify-center">

        <div class="w-full md:w-1/2 px-8 pt-10 pb-5">


        <div class="inline-block mb-6 px-2 py-1 font-semibold bg-green-100 dark:text-black rounded-full">

            <div class="flex flex-wrap items-center -m-1">
              <div class="w-auto p-1"><Link class="text-sm" to="/exchange">&#x1F44B; P2P Exchange </Link></div>
              <div class="w-auto p-1">
                {/* <svg width="15" height="15" viewbox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.66667 3.41675L12.75 7.50008M12.75 7.50008L8.66667 11.5834M12.75 7.50008L2.25 7.50008" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg> */}
              </div>
            </div>
          </div>

          <h1 class="mb-10 text-3xl md:text-8xl lg:text-6xl font-bold font-heading md:max-w-xl leading-none text-primary dark:text-white"> EXCHANGE EKOSTABLES & SCORETOKENS.</h1>
          <p class="mb-11 text-lg text-gray-900 dark:text-gray-300 font-medium md:max-w-md">As a member of the Ekolance community, exchange your ekostables for ekotokens & vice-versa without hassles. </p>
          <div class="flex flex-wrap -m-2.5 mb-20">
            <div class="w-full md:w-auto p-2.5">
              <div class="block">
                <Link to="/exchange">
                <button class="py-4 px-6 w-full text-white font-semibold border border-primary rounded-xl focus:ring focus:ring-indigo-300 bg-primary hover:bg-primary transition ease-in-out duration-200" type="button">Get Started</button>
                </Link> 
                 </div>
            </div>
           
          </div>
        </div>
        <div className=''>
        <div ref={container} className="animation "></div>
        </div>
     
      </div>
    </div>
  </div>
</section>
</div>


  )
}

export default FirstSection