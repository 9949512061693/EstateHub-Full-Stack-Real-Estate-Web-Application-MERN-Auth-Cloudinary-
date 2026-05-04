import React from "react";
import { useNavigate } from "react-router-dom";

const PropertyCard = (props) => {
  const { propertyObjs } = props;
  const navigate = useNavigate();

  return (
    <li
      data-aos='fade-up'
      data-aos-delay={200 + propertyObjs.title.length}
      className='bg-white flex flex-col items-center rounded-md hover:scale-[1.02] transition-transform duration-200 ease-in-out dark:bg-gray-300 p-4 sm:p-5 shadow-md'
      onClick={() => {
        navigate(`/listings/${propertyObjs._id}`);
      }}
    >
      {/* Image */}
      <img
        src={propertyObjs.images_list?.[0]}
        alt={propertyObjs.title}
        className='w-70 h-40 object-cover text-center rounded-md hover:transition-all hover:duration-200 hover:ease-in-out'
      />

      <div className='mt-3 sm:mt-4'>
        {/* Title */}
        <h2 className='text-base sm:text-lg md:text-xl font-semibold line-clamp-1'>
          {propertyObjs.title}
        </h2>

        {/* Location */}
        <p className='text-xs sm:text-sm text-gray-600 mt-1'>
          {propertyObjs.location}
        </p>

        {/* Description */}
        <p className='text-sm sm:text-base text-gray-700 mt-2 line-clamp-2'>
          {propertyObjs.description}
        </p>

        {/* Price */}
        <div className='flex items-center mt-3 gap-2'>
          <h1 className='text-lg sm:text-xl md:text-2xl font-bold  text-blue-600'>
            ₹ {propertyObjs.price}
          </h1>
          <p className='font-semibold text-lg sm:text-xl text-green-800 md:text-2xl'>{propertyObjs.type}</p>
        </div>

        {/* Beds & Baths */}
        <div className='flex items-center gap-4 mt-3 text-sm sm:text-base'>
          <div className='flex items-center gap-1'>
            <h3 className='font-semibold'>{propertyObjs.bedrooms}</h3>
            <p>Beds</p>
          </div>

          <div className='flex items-center gap-1'>
            <h3 className='font-semibold'>{propertyObjs.bathrooms}</h3>
            <p>Baths</p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default PropertyCard;
