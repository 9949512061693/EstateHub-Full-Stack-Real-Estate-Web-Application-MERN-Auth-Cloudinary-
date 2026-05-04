import React, { useContext } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";

function NotFoundPage() {
  const { darkTheme } = useSelector((state) => state.user);
  return (
    <>
      <Header />
      <div className='flex flex-col justify-center items-center h-screen'>
        <img
          src={
            darkTheme
              ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png"
              : "https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
          }
          alt='not found image'
          className='h-60 w-60 md:h-90 md:w-90'
        />
        <h1 className='text-sm md:text-2xl font-bold m-4 text-gray-900 dark:text-white/90'>
          Page Not Found
        </h1>
        <p className=' px-2 text-center text-sm font-semibold dark:text-slate-400'>
          We are sorry, the Page you requested could not be found.
        </p>
      </div>
      <Footer />
    </>
  );
}

export default NotFoundPage;
