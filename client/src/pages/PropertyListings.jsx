import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Filterbar from "../components/Filterbar";
import PropertyCard from "../components/PropertyCard";
import Spinner from "../components/Spinner";
import { useSelector } from "react-redux";

const status = {
  initial: "INITIAL",
  loading: "LOADING",
  failure: "FAILURE",
  success: "SUCCESS",
};

function PropertyListings() {
  const [filters, setFilters] = useState({});
  const [property, setProperty] = useState([]);
  const [apiStatus, setApiStatus] = useState(status.initial);
  const { darkTheme } = useSelector((state) => state.user);
  const handleFilterChange = (data) => {
    setFilters(data);
  };

  useEffect(() => {
    setApiStatus(status.loading);
    getThePropertiesServer();
  }, [filters]);
  const BASE_URL = import.meta.env.VITE_API_URL || "";
  const getThePropertiesServer = async () => {
    const query = new URLSearchParams(filters).toString();
    const res = await fetch(`${BASE_URL}/api/property/properties?${query}`);
    const data = await res.json();

    if (res.ok) {
      setApiStatus(status.success);
      setProperty(data.data);
    } else {
      setApiStatus(status.failure);
    }
  };

  const successView = () => (
    <ul className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
      {property.map((eachObj) => (
        <PropertyCard
          key={eachObj._id}
          propertyObjs={eachObj}
        />
      ))}
    </ul>
  );

  const failureView = () => (
    <div className='py-5  justify-center items-center'>
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
          getThePropertiesServer();
        }}
      >
        Retry
      </button>
    </div>
  );

  const renderViews = () => {
    switch (apiStatus) {
      case status.failure:
        return failureView();
      case status.loading:
        return <Spinner color='#3b82f6' />;
      case status.success:
        return successView();
      default:
        return;
    }
  };

  return (
    <div>
      <Header />

      <div className='flex flex-col md:flex-row gap-4 p-4'>
        {/* Sidebar */}
        <div className='md:border-r md:w-80 md:top-4 h-fit md:h-screen'>
          <Filterbar onFilterChange={handleFilterChange} />
        </div>

        {/* Listings */}
        <div className='w-full md:w-3/4 lg:w-4/5'>
          <h2 className='text-2xl dark:text-white/80 font-bold mb-4'>
            Properties
          </h2>
          {renderViews()}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PropertyListings;
