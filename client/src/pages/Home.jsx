import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PropertiesSliders from "../components/PropertiesSliders";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";

function Home() {
  const navigate = useNavigate();
  const [saleProperties, setProperty] = useState([]);
  const [rentProperties, setRentProperty] = useState([]);
  const image = [
    "https://res.cloudinary.com/dzpxww5gp/image/upload/v1777449293/estate_sliders_card/real-estate-8874196_1280_cq3qdq.jpg",
    "https://res.cloudinary.com/dzpxww5gp/image/upload/v1777451198/estate_sliders_card/modern-residential-luxury-d-rendering-real-estate-hd-resolution_974629-184356_ommt6y.jpg",
    "https://res.cloudinary.com/dzpxww5gp/image/upload/v1777451268/estate_sliders_card/real-estate-home-interior-9-1760-1000_ucikc9.jpg",
    "https://res.cloudinary.com/dzpxww5gp/image/upload/v1777451336/estate_sliders_card/2-real-estate-photography_axo0x7.jpg",
    "https://res.cloudinary.com/dzpxww5gp/image/upload/v1777451232/estate_sliders_card/red-contemporary-living-room-real-estate-agent-interior-decorator-white-sofa-luxury-style-271147779_rxun21.jpg",
    "https://res.cloudinary.com/dzpxww5gp/image/upload/v1777451376/estate_sliders_card/wp8179513_rttmxi.jpg",
  ];

  const filterSales = {
    type: "sale",
    sort: "latest",
    limit: 5,
  };

  const filterRents = {
    type: "rent",
    sort: "latest",
    limit: 5,
  };

  useEffect(() => {
    getRecentSalesProperties();
    getRecentRentProperties();
  }, []);

  const BASE_URL = import.meta.env.VITE_API_URL || "";
  const getRecentSalesProperties = async () => {
    try {
      const query = new URLSearchParams(filterSales).toString();

      const res = await fetch(`${BASE_URL}/api/property/properties?${query}`);

      const data = await res.json();

      if (res.ok) {
        setProperty(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getRecentRentProperties = async () => {
    try {
      const query = new URLSearchParams(filterRents).toString();

      const res = await fetch(`${BASE_URL}/api/property/properties?${query}`);

      const data = await res.json();

      if (res.ok) {
        setRentProperty(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Header />
      <div className='flex flex-col justify-center items-start px-10 h-150'>
        <div className=' flex flex-col gap-5'>
          <h1 className='text-2xl md:text-5xl dark:text-gray-200 italic font-bold text-gray-700'>
            Find your next <span className='text-gray-400'>perfect</span> <br />
            place with ease
          </h1>
          <p className='font-semibold dark:text-gray-300 text-md md:text-lg'>
            <span className='font-bold italic'>ESTATEHUB</span> will help you
            find your home fast, easy and comfortable. Our expert support are
            always available.
          </p>
          <button
            className='text-blue-500 hover:underline hover:transition hover:delay-100 cursor-pointer hover:ease-in-out h-10 w-40 text-sm md:text-lg text-left font-bold'
            onClick={() => navigate("/listings")}
          >
            Let's Start now...
          </button>
        </div>
      </div>
      <PropertiesSliders
        images={image}
        className='h-100 lg:h-200 w-full object-cover rounded-md'
      />
      <div className=' flex flex-col gap-4 mt-5 px-5'>
        <h1 className='text-xl md:text-3xl font-bold text-gray-700 dark:text-gray-200 '>
          Recent Properties For Sale
        </h1>
        <p
          className='text-blue-400 text-lg font-medium cursor-pointer hover:underline'
          onClick={() => navigate("/listings")}
        >
          show more Properties
        </p>
        <ul className='grid grid-col-1 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
          {saleProperties.map((each) => (
            <PropertyCard
              key={each._id}
              propertyObjs={each}
            />
          ))}
        </ul>
      </div>

      <div className=' flex flex-col gap-4 mt-5 mb-5 px-5'>
        <h1 className='text-xl md:text-3xl font-bold text-gray-700 dark:text-gray-200 '>
          Recent Properties For Rent
        </h1>
        <p
          className='text-blue-400 text-lg font-medium cursor-pointer hover:underline'
          onClick={() => navigate("/listings")}
        >
          show more Properties
        </p>
        <ul className='grid grid-col-1 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
          {rentProperties.map((each) => (
            <PropertyCard
              key={each._id}
              propertyObjs={each}
            />
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
