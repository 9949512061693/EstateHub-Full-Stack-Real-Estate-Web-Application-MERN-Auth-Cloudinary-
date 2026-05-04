import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "../firebase";
import { useDispatch } from "react-redux";
import { signInFailure, signSuccess } from "../redux/user/userSlice";
import { FcGoogle } from "react-icons/fc";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL || "";
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await fetch(`${BASE_URL}/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      if (!res.ok) {
        throw new Error("Backend failed");
      }

      const data = await res.json();
      dispatch(signSuccess(data));
      navigate("/");
    } catch (err) {
      //console.log("could not sign in with google");
      if (err.code === "auth/popup-closed-by-user") {
        dispatch(signInFailure("User closed the popup"));
      } else {
        dispatch(signInFailure(err.message));
      }
    }
  };
  return (
    <button
      type='button'
      className='bg-gray-400 flex justify-center items-center gap-2 text-white p-3 rounded-lg
  uppdercase hover:opacity-85'
      onClick={handleGoogleClick}
    >
      <FcGoogle
        size={25}
        className='font-bold'
      />
      Countinue with google
    </button>
  );
};

export default OAuth;
