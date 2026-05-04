import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import { updateNewData, userLogout } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import MyPropertiesCard from "../components/MyPropertiesCard";
import Spinner from "../components/Spinner";

const status = {
  initial: "INITIAL",
  loading: "LOADING",
  failure: "FAILURE",
  success: "SUCCESS",
};

function Profile() {
  const [image, setImage] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [username, changeUsername] = useState(currentUser.username || "");
  const [email, changeEmail] = useState(currentUser.email || "");
  const [file, setFile] = useState(null);
  const [password, changePassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [myProperties, setMyProperties] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [apiStatus, setApiStatus] = useState(status.initial);

  useEffect(() => {
    setApiStatus(status.loading);
    console.log(status.loading);
    getingMyPropertyList();
  }, []);

  const BASE_URL = import.meta.env.VITE_API_URL || "";

  const getingMyPropertyList = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/property/my-properties`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        setApiStatus(status.failure);
        //console.log("Backend error:", data);
        return;
      }
      setMyProperties(data.data || []);
      setApiStatus(status.success);
      console.log(status.success);
    } catch (err) {
      setApiStatus(status.failure);
      console.log(err);
    }
  };

  // handling user Logout section
  const logoutHandling = async () => {
    try {
      await fetch(`${BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      dispatch(
        userLogout({
          username: null,
          email: null,
          password: null,
          avatar: null,
        }),
      );
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  //handling user profile date  delete

  const handleDeleteData = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/delete`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: currentUser._id }),
      });

      dispatch(userLogout());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  //Updating the Profile data

  const updateTheProfileData = async (event) => {
    event.preventDefault();

    try {
      const formatData = new FormData();
      setLoading(true);
      formatData.append("id", currentUser._id);

      if (file) {
        formatData.append("avatar", file);
      }

      if (username) {
        formatData.append("username", username);
      }
      if (email) {
        formatData.append("email", email);
      }

      if (password) {
        formatData.append("password", password);
      }

      const res = await fetch(`${BASE_URL}/api/user/update`, {
        method: "PUT",
        body: formatData,
        credentials: "include",
      });

      const data = await res.json();

      setLoading(false);
      dispatch(updateNewData(data));
    } catch (err) {
      setLoading(false);
      setError(err);
      //console.log(err);
    }
  };

  // geting and storing the user Profile image change data
  const handleChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    const previewUrl = URL.createObjectURL(file);
    setImage(previewUrl);
  };

  const successView = () => {
    if (myProperties.length === 0) {
      return failureView(); // reuse your empty UI
    }

    return (
      <ul className='flex flex-col items-center gap-4 px-4'>
        {myProperties.map((each) => (
          <MyPropertiesCard
            key={each._id}
            properties={each}
          />
        ))}
      </ul>
    );
  };

  const failureView = () => (
    <p className='col-span-full text-center mt-5 text-2xl font-semibold dark:text-gray-300 text-gray-500'>
      No properties found. Add your first property 🚀
    </p>
  );

  const renderView = () => {
    switch (apiStatus) {
      case status.loading:
        return <Spinner color='#6B7280' />;
      case status.failure:
        return failureView();
      case status.success:
        return successView();
      default:
        return;
    }
  };

  return (
    <div className='min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors'>
      <Header />

      {/* Main Content */}
      <div className='max-w-6xl mx-auto px-4 py-10 flex flex-col items-center'>
        {/* Title */}
        <h1 className='text-2xl md:text-4xl font-bold text-gray-700 dark:text-slate-200 mb-8 animate-fade-in'>
          Profile
        </h1>

        {/* Profile Card */}
        <div className='w-full max-w-md bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 flex flex-col items-center gap-6 transition-all duration-300 hover:shadow-lg'>
          {/* Avatar */}
          <label className='cursor-pointer group relative'>
            <img
              src={image || currentUser?.avatar}
              alt='profile'
              className='rounded-full h-28 w-28 md:h-36 md:w-36 object-cover border-2 border-gray-300 transition group-hover:opacity-80'
            />
            <div className='absolute inset-0 rounded-full bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm transition'>
              Change
            </div>

            <input
              type='file'
              accept='image/*'
              className='hidden'
              onChange={handleChange}
            />
          </label>

          {/* Form */}
          <form
            className='flex flex-col gap-4 w-full'
            onSubmit={updateTheProfileData}
          >
            <input
              type='text'
              placeholder='Enter New Username'
              value={username}
              onChange={(e) => {
                changeUsername(e.target.value);
              }}
              className='w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
            />
            <input
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => {
                changeEmail(e.target.value);
              }}
              className='w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
            />

            <input
              type='password'
              placeholder='Enter New Password'
              value={password}
              onChange={(e) => {
                changePassword(e.target.value);
              }}
              className='w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
            />
            {/* Buttons */}
            <div className='flex flex-col sm:flex-row gap-3 mt-2'>
              <button
                type='submit'
                disabled={loading}
                className='flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-transform duration-200 hover:scale-[1.02]'
              >
                {loading ? "Uploading..." : "Update"}
              </button>

              <button
                type='button'
                className='flex-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white py-3 rounded-lg font-medium transition'
                onClick={() => navigate("/addproperty")}
              >
                Add Property
              </button>
            </div>
          </form>

          {/* Bottom Actions */}
          <div className='flex justify-between w-full text-sm mt-2'>
            <button
              className='text-red-500 hover:underline transition'
              onClick={handleDeleteData}
            >
              Delete Account
            </button>
            <button
              className='text-slate-700 dark:text-slate-300 hover:underline transition'
              onClick={logoutHandling}
            >
              Logout
            </button>
          </div>
          {error && <p className='text-red-500 text-sm text-center'>{error}</p>}
        </div>

        {/* Future Section (Listings Placeholder) */}
        <div className='w-full mt-10 flex flex-col items-center'>
          <h2 className='text-3xl font-semibold text-slate-700 dark:text-slate-200 mb-4'>
            My Listings
          </h2>

          {renderView()}
        </div>
      </div>
    </div>
  );
}

export default Profile;
