import React from 'react'
import Logo from "../../assets/images/thelogo.png"
import { Link } from 'react-router-dom'
function Index() {
  return (
   
<footer class="p-4 bg-gray-100 dark:bg-slate-900 shadow md:px-6 md:py-8 ">
<hr class="my-6 border-gray-200 sm:mx-auto dark:border-primary lg:my-8" />
    <div class="sm:flex sm:items-center sm:justify-between">
        <Link to="/" class="flex items-center mb-4 sm:mb-0">
            <img src={Logo} class="h-8 mr-3" alt="Eko Logo" />
        </Link>
        <ul class="flex flex-wrap items-center mb-6 text-lg text-primary dark:text-white sm:mb-0 d">
          
            <li>
                <Link to="/exchange" class="mr-4 hover:underline md:mr-6 ">P2P Exchange</Link>
            </li>
            <li>
                
    <span class="block text-sm text-primary dark:text-white sm:text-center ">© 2023 <a href="https://flowbite.com/" class="hover:underline">Eko™</a>. All Rights Reserved.
    </span>
            </li>
        </ul>
    </div>
 
</footer>

  )
}

export default Index