import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";

const AddingProperty = () => {
  const { darkTheme } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "sale",
    price: "",
    location: "",
    offer: false,
    parking: false,
    furnished: false,
    bedrooms: 1,
    bathrooms: 1,
    area: "",
    images: [],
  });

  // Handle input changes
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + formData.images.length > 5) {
      return alert("Maximum 5 images allowed");
    }

    const filesWithPreview = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...filesWithPreview],
    }));
  };

  // Remove image
  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Cleanup previews (important)
  useEffect(() => {
    return () => {
      formData.images.forEach((img) => URL.revokeObjectURL(img.preview));
    };
  }, [formData.images]);

  // Submit
  const BASE_URL = import.meta.env.VITE_API_URL || "";
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      // append text fields
      Object.keys(formData).forEach((key) => {
        if (key !== "images") {
          data.append(key, formData[key]);
        }
      });

      // append images (real files)
      formData.images.forEach((img) => {
        data.append("images", img.file);
      });

      //const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/api/property/upload`, {
        method: "POST",
        credentials: "include",
        body: data,
      });

      if (res.ok) {
        alert("Property added successfully 🎉");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />

      <div
        className={`min-h-screen p-6 ${
          darkTheme ? "bg-gray-900 text-white" : "bg-gray-100"
        }`}
      >
        <h1 className='text-3xl text-center font-bold mb-6'>
          Add Your Property
        </h1>

        <form
          onSubmit={handleSubmit}
          className='max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-4'
        >
          {/* Title */}
          <input
            type='text'
            id='title'
            placeholder='Property Title'
            onChange={handleChange}
            className='w-full p-2 border rounded-md'
            required
          />

          {/* Description */}
          <textarea
            id='description'
            placeholder='Description'
            onChange={handleChange}
            className='w-full p-2 border rounded-md'
            required
          />

          {/* Type */}
          <select
            id='type'
            onChange={handleChange}
            className='w-full p-2 border rounded-md'
          >
            <option value='rent&sale'>Sale & Rent</option>
            <option value='sale'>Sale</option>
            <option value='rent'>Rent</option>
          </select>

          {/* Price */}
          <input
            type='number'
            id='price'
            placeholder='Price'
            onChange={handleChange}
            className='w-full p-2 border rounded-md'
            required
          />

          {/* Location */}
          <input
            type='text'
            id='location'
            placeholder='Location'
            onChange={handleChange}
            className='w-full p-2 border rounded-md'
            required
          />

          {/* Checkboxes */}
          <div className='flex gap-4'>
            <label>
              <input
                type='checkbox'
                id='offer'
                onChange={handleChange}
              />{" "}
              Offer
            </label>
            <label>
              <input
                type='checkbox'
                id='parking'
                onChange={handleChange}
              />{" "}
              Parking
            </label>
            <label>
              <input
                type='checkbox'
                id='furnished'
                onChange={handleChange}
              />{" "}
              Furnished
            </label>
          </div>

          {/* Numbers */}
          <div className='grid grid-cols-2 gap-4'>
            <input
              type='number'
              id='bedrooms'
              placeholder='Bedrooms'
              onChange={handleChange}
              className='border rounded-md p-3'
            />
            <input
              type='number'
              id='bathrooms'
              placeholder='Bathrooms'
              onChange={handleChange}
              className='border rounded-md p-3'
            />
            <input
              type='number'
              id='area'
              placeholder='Area (sqft)'
              onChange={handleChange}
              className='border rounded-md p-3'
            />
          </div>

          {/* Images */}
          <div>
            <p className='mb-2'>Upload Images (Max 5)</p>
            <input
              type='file'
              multiple
              accept='image/*'
              onChange={handleImageUpload}
              className='border rounded-md p-3'
            />

            {/* Preview */}
            <div className='flex gap-3 flex-wrap mt-3'>
              {formData.images.map((img, index) => (
                <div
                  key={index}
                  className='relative'
                >
                  <img
                    src={img.preview}
                    alt='preview'
                    className='w-24 h-24 object-cover rounded-md border'
                  />

                  <button
                    type='button'
                    onClick={() => handleRemoveImage(index)}
                    className='absolute top-0 right-0 cursor-pointer bg-red-500 text-white text-xs px-1 rounded'
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 cursor-pointer transition'>
            Add Property
          </button>
        </form>
      </div>
    </>
  );
};

export default AddingProperty;
