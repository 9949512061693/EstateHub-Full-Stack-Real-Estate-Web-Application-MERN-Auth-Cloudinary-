import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import PropertiesSliders from "../components/PropertiesSliders";
import { useSelector } from "react-redux";

const status = {
  initial: "INITIAL",
  loading: "LOADING",
  failure: "FAILURE",
  success: "SUCCESS",
};

const SelectedPropertyById = () => {
  const { id } = useParams();
  const [apiStatus, setApiStatus] = useState(status.initial);
  const [propertyData, setPropertyData] = useState(null);
  const { darkTheme } = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [usertext, setUsertext] = useState("");

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (username === "" || email === "" || usertext === "") {
      return alert("Enter full details");
    }
    alert(
      "Your message has been sent successfully. Thank you! The owner will get in touch with you shortly.",
    );
  };

  useEffect(() => {
    setApiStatus(status.loading);
    getTheDetailsProperty();
  }, [id]);

  const BASE_URL = import.meta.env.VITE_API_URL || "";

  const getTheDetailsProperty = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/property/properties/${id}`);
      const data = await res.json();

      if (res.ok) {
        setPropertyData(data.data);
        setApiStatus(status.success);
      } else {
        setApiStatus(status.failure);
      }
    } catch (err) {
      setApiStatus(status.failure);
    }
  };

  const failureView = () => (
    <div className='py-5 flex flex-col justify-center items-center'>
      <img
        src={
          darkTheme
            ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
            : "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        }
        alt='not found image'
        className='h-100 w-100'
      />
      <h1 className='text-2xl font-bold m-4 text-gray-900 dark:text-white/90'>
        Oops! Something Went Worng
      </h1>
      <p className='font-semibold'>
        We are having some trouble to complete you request. Please Try again
      </p>
      <button
        type='button'
        onClick={() => {
          getTheDetailsProperty();
        }}
      >
        Retry
      </button>
    </div>
  );
  const InfoCard = ({ label, value }) => (
    <div className='bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center shadow-sm hover:scale-105 transition'>
      <p className='text-sm text-gray-500 dark:text-gray-200'>{label}</p>
      <h4 className='text-lg font-semibold dark:text-white'>{value}</h4>
    </div>
  );
  const Badge = ({ text, className }) => (
    <span className={className}>{text}</span>
  );

  const successView = () => (
    <div className='max-w-6xl mx-auto px-4 py-6 animate-fadeIn'>
      {/* Image Slider */}
      <PropertiesSliders
        images={propertyData?.images_list || []}
        className='w-full h-60 sm:h-72 md:h-96 rounded-xl overflow-hidden shadow-lg'
      />

      {/* Title + Price */}
      <div className='mt-6 flex flex-col md:flex-row md:justify-between md:items-center gap-3'>
        <div>
          <h1 className='text-2xl dark:text-slate-100 md:text-3xl font-bold'>
            {propertyData.title}
          </h1>
          <p className='text-gray-500 dark:text-gray-300'>
            {propertyData.location}
          </p>
        </div>

        <h2 className='text-2xl md:text-3xl font-bold text-blue-600'>
          ₹ {propertyData.price.toLocaleString()}
        </h2>
      </div>

      {/* Quick Info */}
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6'>
        <InfoCard
          label='Bedrooms'
          value={propertyData.bedrooms}
        />
        <InfoCard
          label='Bathrooms'
          value={propertyData.bathrooms}
        />
        <InfoCard
          label='Area'
          value={`${propertyData.area} sqft`}
        />
        <InfoCard
          label='Type'
          value={propertyData.type}
        />
      </div>

      {/* Description */}
      <div className='mt-6'>
        <h3 className='text-xl font-semibold mb-2 dark:text-gray-300'>Description</h3>
        <p className='text-gray-600 dark:text-gray-200 leading-relaxed'>
          {propertyData.description}
        </p>
      </div>

      {/* Features */}
      <div className='mt-6 flex flex-wrap gap-3'>
        {propertyData.parking ? (
          <Badge
            text='Parking Available'
            className='bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium'
          />
        ) : (
          <Badge
            text='Parking Not Available'
            className='bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium'
          />
        )}
        {propertyData.furnished ? (
          <Badge
            text='Fully Furnished'
            className='bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium'
          />
        ) : (
          <Badge
            text='Not Fully Furnished'
            className='bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium'
          />
        )}
        {propertyData.offer ? (
          <Badge
            text='Special Offer'
            className='bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium'
          />
        ) : (
          <Badge
            text='No Special Offer'
            className='bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium'
          />
        )}
      </div>


      {/* Contact Owner */}
      <div className='bg-white dark:bg-gray-900 mt-5 p-4 rounded-xl shadow-md'>
        <h3 className='text-xl dark:text-white font-semibold mb-3'>Contact Owner</h3>

        <form
          className='space-y-3'
          onSubmit={handleSubmitForm}
        >
          <input
            type='text'
            placeholder='Your Name'
            className='w-full p-2 border dark:text-slate-50 rounded-md'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type='email'
            placeholder='Your Email'
            className='w-full p-2 border dark:text-slate-50 rounded-md'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <textarea
            rows='4'
            placeholder='Write your message...'
            className='w-full p-2 border dark:text-slate-50 rounded-md resize-none'
            value={usertext}
            onChange={(e) => setUsertext(e.target.value)}
          ></textarea>

          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition'
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );

  const renderViews = () => {
    switch (apiStatus) {
      case status.failure:
        return failureView();
      case status.loading:
        return <Spinner />;
      case status.success:
        return successView();
      default:
        return;
    }
  };

  return (
    <div>
      <Header />
      {renderViews()}
      <Footer />
    </div>
  );
};

export default SelectedPropertyById;
