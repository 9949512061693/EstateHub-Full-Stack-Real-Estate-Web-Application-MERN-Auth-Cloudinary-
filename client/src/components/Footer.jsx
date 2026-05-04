import React from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";

const FooterLinks = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "About",
    link: "/about",
  },
  {
    title: "Contact",
    link: "/#",
  },
  {
    title: "Propertis",
    link: "/#",
  },
];

const consumerPolicy = [
  "Cancellation and Return",
  "Terms of Use",
  "Privacy",
  "EPR compliance",
  "Security",
];

const Footer = () => {
  return (
    <div className='dark:bg-gray-900'>
      <div className='grid md:grid-cols-4 pb-20 pt-5'>
        <div className='py-8 px-4'>
          <a
            href='#'
            className='text-primary font-semibold
          tracking-widest text-2xl uppercase sm:text-3xl'
          >
            EstateHub
          </a>
          <p className='text-sm font-semibold lg:pr-24 pr-3 text-gray-600'>
           Your trusted platform for premium properties and intelligent real 
           estate, crafted to enhance your living experience.
          </p>
          <p className='text-gray-500 mt-4 text-sm'>
            Made with ❤️ by The coding Journey.
          </p>
          <button
            type='button'
            className='text-white h-[30] px-6 rounded hover:text-primary font-semibold
          mt-3 hover:bg-transparent hover:border hover:border-primary bg-primary dark:bg-transparent dark:border dark:border-white dark:text-gray-300'
          >
            Visit
          </button>
        </div>
        {/*Footer Links*/}
        <div className='py-8 px-4'>
          <h1 className='text-xl font-bold sm:text-left mb-3 w-full dark:text-gray-300'>
            Important Links
          </h1>
          <ul className='space-y-3'>
            {FooterLinks.map((data, index) => (
              <li key={index}>
                <a className='text-gray-600 font-semibold dark:hover:text-white cursor-pointer hover:text-black duration-300'>
                  {data.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className='py-8 px-4'>
          <h1 className='text-xl font-bold sm:text-left mb-3 w-full dark:text-gray-300'>
            Consumer Policy
          </h1>
          <ul className='space-y-3'>
            {consumerPolicy.map((data, index) => (
              <li key={index}>
                <a className='text-gray-600 font-semibold dark:hover:text-white cursor-pointer hover:text-black duration-300'>
                  {data}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Address Card */}
        <div className='py-8 px-4 grid gap-4'>
          <h1 className='text-xl font-bold sm:text-left  w-full dark:text-gray-300'>
            Address
          </h1>

          <div className='flex items-center text-gray-600 font-semibold mt-0 dark:hover:text-white cursor-pointer hover:text-black duration-300'>
            <FaLocationArrow
              size={25}
              className='hover:text-black dark:text-gray-300 dark:hover:text-white'
            />
            <p
              id='address'
              className='ml-2'
            >
              Rajahmundry, Andhra Pradesh
            </p>
          </div>

          <div className='flex items-center text-gray-600 font-semibold dark:hover:text-white cursor-pointer hover:text-black duration-300'>
            <MdOutlinePhoneAndroid
              size={25}
              className='hover:text-black dark:text-gray-300 dark:hover:text-white'
            />
            <p className='ml-2'>+91 1234567890</p>
          </div>
          <div className='flex gap-4 items-center '>
            <BsInstagram
              size={25}
              className='hover:text-black dark:text-gray-300 cursor-pointer dark:hover:text-white'
            />
            <FaFacebook
              size={25}
              className='hover:text-black dark:text-gray-300 cursor-pointer dark:hover:text-white'
            />
            <BsLinkedin
              size={25}
              className='hover:text-black dark:text-gray-300 cursor-pointer dark:hover:text-white'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
