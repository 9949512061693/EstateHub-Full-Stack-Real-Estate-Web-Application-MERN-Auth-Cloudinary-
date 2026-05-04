import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Aboutpage from "../assets/Aboutpage.png";

const weFocus = [
  "Verified Listings: Every property is carefully reviewed to ensure authenticity",
  "Affordable Options: Properties that suit different budgets and lifestyles",
  "Seamless Experience: Easy browsing, searching, and decision-making",
  "Reliable Service: Fast, responsive, and dependable platform performance",
];

const whyWeChose = [
  "✔ Trusted Platform with reliable and verified listings",
  "✔ Transparent Process with no hidden surprises",
  "✔ Modern Technology for faster and smarter property search",
  "✔ User-Centric Design focused on ease and convenience",
  "✔ End-to-End Support from search to final decision",
];

function About() {
  return (
    <>
      <Header />
      <div className='bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white py-10 px-4 md:px-10'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold mb-4'>
            About
            <em>
              <span
                className='text-primary font-semibold ml-2 tracking-widest 
                            text-2xl uppercase sm:text-3xl'
              >
                EstateHub
              </span>
            </em>
          </h1>
          <p className='text-gray-500 max-w-2xl mx-auto dark:text-gray-300'>
            Your trusted platform for premium properties and intelligent real
            estate choices, crafted to enhance your living experience.
          </p>
        </div>
        <img
          src={Aboutpage}
          alt='about image'
          className='h-[180] md:h-[300] text-center mx-auto rounded-lg mb-4'
        />
        {/* About Section */}
        <div className='max-w-5xl mx-auto mb-16 '>
          <p className='text-lg leading-relaxed text-gray-600 dark:text-gray-300'>
            EstateHub is a modern real estate platform dedicated to helping
            individuals buy, sell, and rent properties in the most desirable
            locations. Our team focuses on delivering a seamless and transparent
            experience, ensuring every step of your real estate journey is
            simple and stress-free. Our mission is to empower clients with the
            right tools, expert insights, and personalized support to make
            confident property decisions. Whether you're searching for your
            dream home, listing a property, or exploring rental options,
            EstateHub is here to guide you at every stage. With a strong
            understanding of the market and a commitment to excellence, we aim
            to transform the way people experience real estate — making it
            smarter, faster, and more rewarding. At EstateHub, we leverage
            modern technology to simplify property discovery, offering intuitive
            search features, detailed listings, and real-time updates. Our
            platform is designed to connect buyers, sellers, and renters
            efficiently, reducing complexity and saving valuable time. We
            prioritize trust, transparency, and user satisfaction by ensuring
            accurate property information, secure interactions, and a
            user-friendly experience. Our goal is not just to facilitate
            transactions, but to build long-term relationships with our users by
            consistently delivering value and reliability. Whether you're a
            first-time homebuyer, a seasoned investor, or someone looking for
            the perfect rental, EstateHub provides the resources, insights, and
            support needed to make your journey smooth and successful.
          </p>
        </div>

        {/* Grid Sections */}
        <div className='grid gap-8 max-w-6xl mx-auto'>
          {/* Mission */}
          <div className='bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition'>
            <div className='flex'>
              <h2 className='text-xl font-semibold mr-2'>🌟 Our Mission</h2>
            </div>
            <p className='text-gray-500 dark:text-gray-300'>
              Our mission is to simplify the real estate experience by providing
              users with smart tools, reliable information, and personalized
              support. We aim to empower individuals to make confident property
              decisions with ease, transparency, and trust.
            </p>
          </div>

          {/* Vision */}
          <div className='bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition'>
            <div className='flex'>
              <h2 className='text-xl font-semibold mr-2'>🔭 Our Vision</h2>
            </div>
            <p className='text-gray-500 dark:text-gray-300'>
              Our vision is to become a leading digital real estate platform
              that transforms how people discover, buy, sell, and rent
              properties. We strive to create a future where real estate is
              accessible, efficient, and stress-free for everyone.
            </p>
          </div>

          {/* What We Offer */}
          <div className='bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition'>
            <div className='flex'>
              <h2 className='text-xl font-semibold mr-2'>🏡 What We Offer</h2>
            </div>
            <p className='text-gray-500 dark:text-gray-300'>
              EstateHub makes buying, selling, and renting properties simple
              with verified listings, smart search tools, and a seamless user
              experience.
            </p>
            <p className='text-gray-600 dark:text-white/90 mt-2'>
              We focus on:
            </p>
            <ul className='list-disc pl-5 ml-5 text-gray-500 dark:text-gray-300 mb-2'>
              {weFocus.map((data, index) => (
                <li key={index}>
                  <span>{data}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Why Choose Us */}
          <div className='bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition'>
            <div className='flex'>
              <h2 className='text-xl font-semibold mr-2'>
                💡 Why Choose EstateHub
              </h2>
            </div>

            <p className='text-gray-500 mb-1 dark:text-gray-300'>
              Choosing EstateHub means choosing reliability, transparency, and a
              customer-first approach to real estate.
            </p>
            <p className='text-gray-600 dark:text-white/90 mb-2 '>
              Here’s what sets us apart:
            </p>
            <ul className='text-gray-500 dark:text-gray-300 ml-5 mb-2'>
              {whyWeChose.map((data, index) => (
                <li key={index}>{data}</li>
              ))}
            </ul>
          </div>

          {/* Commitment */}
          <div className='bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition'>
            <div className='flex'>
              <h2 className='text-xl font-semibold mr-2'>🤝 Our Commitment</h2>
            </div>
            <p className='text-gray-500 dark:text-gray-300'>
              At EstateHub, we are committed to delivering excellence in every
              aspect of our platform. From providing verified property listings
              to ensuring a smooth and reliable experience, our goal is to offer
              a real estate service you can trust. We believe in transparency,
              ethical practices, and accurate information, helping users make
              confident and informed decisions. Your satisfaction is at the
              heart of everything we do, and we continuously strive to improve
              and exceed expectations at every step of your property journey.
            </p>
          </div>

          {/* Support */}
          <div className='bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition'>
            <div className='flex'>
              <h2 className='text-xl font-semibold mr-2'>
                🎧 Customer Support
              </h2>
            </div>
            <p className='text-gray-500 dark:text-gray-300'>
              At EstateHub, we are committed to providing excellent customer
              support. Our team is always ready to assist you with your queries,
              guide you through the platform, and ensure a smooth and
              hassle-free experience. Your satisfaction is our top priority.
            </p>
          </div>
        </div>

        {/* Thank You Section */}
        <div className='text-center mt-16 max-w-3xl mx-auto'>
          <h2 className='text-2xl font-semibold mb-4'>Thank You ❤️</h2>
          <p className='text-gray-500 dark:text-gray-300'>
            Thank you for choosing EstateHub. We are honored to be a part of
            your real estate journey and look forward to helping you find the
            perfect property that fits your lifestyle and goals.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
