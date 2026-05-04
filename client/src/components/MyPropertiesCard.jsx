import React from "react";
import { MdDelete } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

const MyPropertiesCard = (props) => {
  const { properties } = props;
  const { _id, title, description, price, location, type, images_list } =
    properties;
  const BASE_URL = import.meta.env.VITE_API_URL || "";
  const deleteMyProperty = async (id) => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/property/delete-myProperty/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const data = await res.json();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <li className='flex justify-between items-center gap-3 bg-white px-6 py-4 dark:bg-gray-500 rounded-lg'>
      <img
        src={images_list[0]}
        alt={title}
        className='h-20 w-20 md:h-25 md:w-25 rounded-lg'
      />
      <div className='flex flex-col'>
        <h2 className='text-md md:text-3xl font-semibold text-gray-600 dark:text-gray-200'>
          {title}
        </h2>
        <p className='text-sm md:text-2xl font-semibold text-gray-600 dark:text-gray-300'>
          {description}
        </p>
        <div className='flex gap-2 mt-2'>
          <p className='text-md md:text-xl font-semibold text-green-400'>
            {price}
          </p>
          <p className='text-md md:text-xl font-semibold text-blue-400'>
            {type}
          </p>
          <p className='flex items-center gap-0.5'>
            <FaLocationDot className='text-red-300' />
            <span className='text-sm md:text-lx text-gray-500 font-semibold dark:text-slate-200'>
              {location}
            </span>
          </p>
        </div>
      </div>
      <button
        type='button'
        className='text-gray-700 dark:text-gray-200'
        onClick={() => deleteMyProperty(_id)}
      >
        <MdDelete size={35} />
      </button>
    </li>
  );
};

export default MyPropertiesCard;
