import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiBuildingsDuotone } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import {
  signSuccess,
  signInFailure,
  signInStart,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

function SignUp() {
  const { loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signInFailure(null));
  }, []);

  const eventHandler = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const BASE_URL = import.meta.env.VITE_API_URL || "";

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(signInFailure(data.message));
        return;
      }
      if (res.ok) {
        setFormData({
          username: "",
          email: "",
          password: "",
        });
      }

      dispatch(signSuccess(data));
      navigate("/login");
    } catch (err) {
      dispatch(signInFailure(err.message));
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-3 max-w-lg mx-auto'>
      <div className='w-full max-w-lg  p-3'>
        <div className='bg-white/90 rounded-lg p-8 shadow-2xs'>
          <section className='flex justify-center items-center  gap-3'>
            <PiBuildingsDuotone size={50} />
            <h1 className='text-4xl font-poppins font-semibold my-7'>SignUp</h1>
          </section>
          <form
            className='flex flex-col gap-4'
            onSubmit={submitForm}
          >
            <section className='flex flex-col gap-1 '>
              <label
                htmlFor='username'
                className='font-semibold text-xl'
              >
                Username
              </label>
              <input
                type='text'
                placeholder='Enter Username'
                value={formData.username}
                onChange={eventHandler}
                className='border bg-white font-semibold p-3 rounded-lg'
                id='username'
              />
            </section>
            <section className='flex flex-col gap-1 '>
              <label
                htmlFor='email'
                className='font-semibold text-xl'
              >
                Email
              </label>
              <input
                type='email'
                placeholder='Enter Email'
                value={formData.email}
                onChange={eventHandler}
                className='border font-semibold bg-white p-3 rounded-lg'
                id='email'
              />
            </section>
            <section className='flex flex-col gap-1'>
              <label
                htmlFor='password'
                className='font-semibold text-xl'
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                placeholder='Enter Password'
                value={formData.password}
                onChange={eventHandler}
                className='border font-semibold bg-white p-3 rounded-lg'
              />
            </section>
            <button
              disabled={loading}
              type='submit'
              className='bg-slate-700 text-white cursor-pointer py-3 rounded-lg uppercase 
          hover:disabled:opacity-80 hover:opacity-95'
            >
              {loading ? "Loading..." : "SignUp"}
            </button>
            <OAuth />
          </form>
          <div className='flex gap-1 mt-5 justify-center'>
            <p className='text-gray-700 font-medium'>Have an account?</p>
            <Link to='/login'>
              <span className='text-blue-700 font-medium hover:underline cursor-pointer'>
                Sign in
              </span>
            </Link>
          </div>
          {error && <p className='text-red-500 text-lg'>{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
