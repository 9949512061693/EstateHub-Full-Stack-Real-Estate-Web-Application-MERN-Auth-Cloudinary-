import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { VscThreeBars } from "react-icons/vsc";
import { toggleTheme } from "../redux/user/userSlice";

const menu = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Properties",
    link: "/listings",
  },
  {
    name: "About",
    link: "/about",
  },
];

function Header() {
  const { currentUser, darkTheme } = useSelector((state) => state.user);
  const [showMenu, setMenu] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  //checking user is login or not through useEffect and if conditional Statements

  return (
    <>
      <header className='sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 shadow-md transition-all duration-300'>
        <div className='max-w-7xl mx-auto flex justify-between items-center px-4 py-3'>
          {/* LEFT */}
          <div className='flex items-center gap-6'>
            <h1
              className='text-slate-800 dark:text-slate-100 text-xl sm:text-2xl 
            tracking-wider italic font-bold cursor-pointer transition hover:scale-105'
              onClick={() => navigate("/")}
            >
              EstateHub
            </h1>

            {/* Desktop Menu */}
            <nav>
              <ul className='hidden md:flex gap-6 items-center'>
                {menu.map((each) => (
                  <li
                    key={each.name}
                    onClick={() => navigate(each.link)}
                    className='text-slate-700 dark:text-gray-200 font-medium relative hover:scale-105 cursor-pointer group'
                  >
                    {each.name}

                    {/* underline animation */}
                    <span className='absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-500 transition-all duration-300 group-hover:w-full'></span>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* RIGHT */}
          <div className='flex items-center gap-2 sm:gap-4'>
            {/* Search */}
            <form
              className='hidden sm:flex items-center bg-gray-200 dark:bg-slate-700 px-3 py-2 
            rounded-lg transition focus-within:ring-2 focus-within:ring-blue-500'
            >
              <input
                type='text'
                placeholder='Search...'
                className='bg-transparent outline-none text-sm w-24 sm:w-40 text-gray-700 dark:text-white'
              />
              <FaSearch className='text-gray-500' />
            </form>

            {/* Mobile Menu Icon */}
            <VscThreeBars
              size={26}
              className='md:hidden cursor-pointer text-slate-700 dark:text-gray-300 hover:scale-110 transition'
              onClick={() => setMenu(!showMenu)}
            />

            {/* Theme Toggle */}
            <button
              type='button'
              onClick={() => dispatch(toggleTheme())}
              className='p-2 rounded-full hover:bg-gray-300 dark:hover:bg-slate-700 transition'
            >
              {darkTheme ? (
                <MdLightMode
                  size={22}
                  className='text-white'
                />
              ) : (
                <MdDarkMode
                  size={22}
                  className='text-slate-700'
                />
              )}
            </button>

            {/* User / Login */}
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt='User profile'
                className='rounded-full h-9 w-9 object-cover cursor-pointer hover:scale-105 transition'
                onClick={() => navigate("/profile")}
              />
            ) : (
              <button
                onClick={() => navigate("/login")}
                className='relative overflow-hidden border border-blue-500 rounded-md px-4 py-1 text-blue-500 group'
              >
                <span className='absolute inset-0 bg-blue-500 -translate-x-full group-hover:translate-x-0 transition duration-300'></span>
                <span className='relative z-10 group-hover:text-white transition'>
                  Login
                </span>
              </button>
            )}
          </div>
        </div>
      </header>
      {showMenu && (
        <ul className='md:hidden flex flex-col gap-4 px-6 py-4 bg-white dark:bg-slate-800 shadow-md animate-slide-down'>
          {menu.map((each) => (
            <li
              key={each.name}
              onClick={() => navigate(each.link)}
              className='text-slate-700 dark:text-gray-200 hover:scale-105 font-medium cursor-pointer hover:translate-x-2 transition'
            >
              {each.name}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Header;
