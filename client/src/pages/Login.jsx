import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiBuildingsDuotone } from "react-icons/pi";
import OAuth from "../components/OAuth";
import { useDispatch, useSelector } from "react-redux";
import { signSuccess, signInFailure } from "../redux/user/userSlice";

function Login() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
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
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      //console.log(data);
      if (!res.ok) {
        setError(data.message);
        setLoading(false);
        return;
      }
      if (res.ok) {
        setFormData({
          email: "",
          password: "",
        });
      }

      setLoading(false);
      setError(null);
      navigate("/");
      dispatch(signSuccess(data));
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='w-full max-w-lg p-3'>
        <div className='bg-white/90 rounded-lg p-4 shadow-2xs'>
          <section className='flex justify-center items-center  gap-3'>
            <PiBuildingsDuotone size={50} />
            <h1 className='text-4xl text-center font-semibold my-7'>Login</h1>
          </section>

          <form
            className='flex flex-col gap-4 px-4'
            onSubmit={submitForm}
          >
            <section className='flex flex-col gap-1'>
              <label
                htmlFor='email'
                className='font-semibold text-xl'
              >
                Email
              </label>
              <input
                type='email'
                placeholder='Enter Email @gmail.com'
                id='email'
                value={formData.email}
                onChange={eventHandler}
                className='border p-3 rounded-lg font-semibold'
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
                placeholder='Enter Password'
                id='password'
                value={formData.password}
                onChange={eventHandler}
                className='border p-3 rounded-lg font-semibold'
              />
            </section>

            <button
              disabled={loading}
              type='submit'
              className='bg-slate-700 text-white cursor-pointer  py-3 rounded-lg uppercase 
          hover:disabled:opacity-80 hover:opacity-95'
            >
              {loading ? "Loading..." : "Login"}
            </button>
            <OAuth />
          </form>

          <div className='flex gap-1 mt-5 justify-center'>
            <p className='text-gray-700 font-medium'>Have an account?</p>
            <Link to='/signup'>
              <span className='text-blue-700 font-medium hover:underline cursor-pointer'>
                Sign up
              </span>
            </Link>
          </div>
          {error && <p className='text-red-500 text-lg text-center'>{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
