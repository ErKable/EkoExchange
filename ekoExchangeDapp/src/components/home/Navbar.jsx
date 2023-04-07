import { useState } from "react";
import { Link } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { close, logo, menu, ekolance, ekologo, ekologo1} from "../../assets";
import { navLinks } from "../../constants";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <Link to='/'>
        <img src={ekologo1} alt="ekologo" className="w-[124px] h-[32px]" />      
      </Link>

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">

        <Link to='/p2p'>
          <li className="font-poppins font-normal cursor-pointer text-[16px] text-dimWhite mr-10"> P2P </li>
        </Link>

        {/* <Link to='/p2p'>
          <ConnectButton />
        </Link> */}

        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? "text-white" : "text-dimWhite"
            } ${index === navLinks.length - 1 ? "mr-10" : "mr-10"}`}
            onClick={() => setActive(nav.title)}
          >
            <a href={`#${nav.id}`}>{nav.title}</a>
          </li>
        ))}

      {/* <li className="font-poppins font-normal cursor-pointer text-[16px] text-dimWhite mr-10"> <ConnectButton /> </li> */}

      <Link>
          <ConnectButton />
        </Link>

      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">

          <Link to='/p2p'>
          <li className="font-poppins font-normal cursor-pointer text-[16px] text-dimWhite mb-4"> P2P </li>
          </Link>

            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } ${index === navLinks.length - 1 ? "mb-4" : "mb-4"}`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}

        <Link>
           <ConnectButton />
        </Link>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
