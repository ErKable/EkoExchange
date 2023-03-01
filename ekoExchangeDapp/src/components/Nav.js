import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import Logo from "../assets/images/thelogo.png";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import useThemeSwitcher from "../hooks/useThemeSwitcher";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

const Nav = () => {

  const [activeTheme, setTheme] = useThemeSwitcher();

  return (
    <div class=" w-full fixed top-0 bg-white dark:bg-black z-10 px-10">
      <div class="flex items-center justify-between px-2 py-2  w-full">
        <div class="w-auto">
          <div class="flex flex-wrap items-center w-full">
            <div class="">
              <Link to="/">
                <img
                  src={Logo}
                  alt="logo"
                  className=" mr-28 object-contain h-16 w-16"
                />
              </Link>
            </div>
          </div>
        </div>

        <div class="w-auto">
          <div class="flex flex-wrap items-center ">
            <div class="w-auto hidden lg:block">
              <ul class="flex items-center mr-16 text-primary">
                <li class="mr-9 font-medium text-lg hover:text-gray-700">
                  <Link to="/Ekoswap">Swap</Link>
                </li>
                <li class="mr-9 font-medium text-lg hover:text-gray-700">
                  <Link to="Ekolend">Lend</Link>
                </li>
                <li class="mr-9 font-medium text-lg hover:text-gray-700">
                  <Link to="/Exchange">P2P</Link>
                </li>
                <li>
                  <div
                    onClick={() => setTheme(activeTheme)}
                    aria-label="Theme Switcher"
                    className="ml-3 bg-primary-light dark:bg-black p-3 shadow-sm rounded-xl cursor-pointer"
                  >
                    {activeTheme === "dark" ? (
                      <FiMoon className="text-ternary-dark hover:text-gray-400 dark:text-ternary-light dark:hover:text-primary-light text-xl" />
                    ) : (
                      <FiSun className="text-gray-200 hover:text-gray-50 text-xl" />
                    )}
                  </div>
                </li>
              </ul>
            </div>

            <div class="w-auto hidden lg:block">
              <ConnectButton />
            </div>
          </div>
        </div>

        <div className="lg:hidden ">
          <ConnectButton />
        </div>
      </div>
    </div>
  );
};

export default Nav;
