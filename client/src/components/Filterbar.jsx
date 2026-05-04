import React, { useState, useEffect } from "react";

const Filterbar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    offer: false,
    parking: false,
    furnished: false,
    sort: "latest",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value, type, checked } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // send data to parent whenever filters change
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  return (
    <form className='mt-2 p-5 flex flex-col gap-4 w-full rounded-md'>
      {/* Search */}
      <section className='flex items-center gap-3'>
        <h4 className='text-lg dark:text-white text-md md:text-xl font-semibold'>
          Search:
        </h4>
        <input
          type='text'
          name='search'
          value={filters.search}
          onChange={handleChange}
          placeholder='Enter keyword...'
          className='h-10 px-3 rounded-md bg-white dark:bg-gray-300'
        />
      </section>

      {/* Type */}
      <div className='flex items-center flex-wrap gap-3'>
        <h4 className='font-semibold dark:text-white text-md md:text-xl mb-2'>
          Type:
        </h4>
        <div className='flex items-center gap-2'>
          <label className='font-semibold text-gray-600 dark:text-white/90 flex items-center gap-1'>
            <input
              type='radio'
              name='type'
              value='all'
              checked={filters.type === "all"}
              onChange={handleChange}
            />
            Rent & Sale
          </label>
          <label className='font-semibold text-gray-600 dark:text-white/90 flex items-center gap-1'>
            <input
              type='radio'
              name='type'
              value='sale'
              checked={filters.type === "sale"}
              onChange={handleChange}
            />
            Sale
          </label>
          <label className='font-semibold text-gray-600 dark:text-white/90 flex items-center gap-1'>
            <input
              type='radio'
              name='type'
              value='rent'
              checked={filters.type === "rent"}
              onChange={handleChange}
            />
            Rent
          </label>
        </div>

        <label className='font-semibold text-gray-600 dark:text-white/90 flex items-center gap-1'>
          <input
            type='checkbox'
            name='offer'
            checked={filters.offer}
            onChange={handleChange}
          />
          Offers
        </label>
      </div>

      {/* Amenities */}
      <div className='flex items-center gap-3'>
        <h4 className='font-semibold dark:text-white text-md md:text-xl mb-2'>
          Amenities:
        </h4>
        <label
          className='block'
          className='font-semibold text-gray-600 dark:text-white/90 flex items-center gap-0.5'
        >
          <input
            type='checkbox'
            name='parking'
            checked={filters.parking}
            onChange={handleChange}
          />
          Parking
        </label>
        <label
          className='block'
          className='font-semibold text-gray-600 dark:text-white/90 flex items-center gap-0.5'
        >
          <input
            type='checkbox'
            name='furnished'
            checked={filters.furnished}
            onChange={handleChange}
          />
          Furnished
        </label>
      </div>

      {/* Sort */}
      <div className='flex items-center gap-2'>
        <h4 className='font-semibold text-md dark:text-white md:text-xl mb-2'>
          Sort:
        </h4>
        <select
          name='sort'
          value={filters.sort}
          onChange={handleChange}
          className='rounded-md bg-white dark:bg-gray-300 font-semibold px-2 py-1'
        >
          <option value='latest'>Latest</option>
          <option value='high'>Price High to Low</option>
          <option value='low'>Price Low to High</option>
          <option value='oldest'>Oldest</option>
        </select>
      </div>
    </form>
  );
};

export default Filterbar;
