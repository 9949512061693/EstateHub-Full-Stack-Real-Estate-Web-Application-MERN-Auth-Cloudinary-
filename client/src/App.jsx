import { Routes, Route } from "react-router-dom";
import AOS from "aos";
import { useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import PropertyListings from "./pages/PropertyListings";
import NotFoundPage from "./pages/NotFoundPage";
import { useSelector, useDispatch } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import SelectedPropertyById from "./pages/SelectedPropertyById";
import AddingProperty from "./pages/AddingProperty";

import "aos/dist/aos.css";

function App() {
  const { darkTheme } = useSelector((state) => state.user);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkTheme);
    localStorage.setItem("theme", JSON.stringify(darkTheme));
  }, [darkTheme]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: false,
    });
    AOS.refresh();
  }, []);

  return (
    <div className='dark:bg-gray-800 min-h-screen min-w-full '>
      <Routes>
        <Route
          path='/'
          element={<Home></Home>}
        />
        <Route
          path='/login'
          element={<Login></Login>}
        />
        <Route
          path='/signup'
          element={<SignUp></SignUp>}
        />
        <Route element={<ProtectedRoute />}>
          <Route
            path='/about'
            element={<About />}
          />
          <Route
            path='/profile'
            element={<Profile />}
          />
          <Route
            path='/listings'
            element={<PropertyListings />}
          />
          <Route
            path='/listings/:id'
            element={<SelectedPropertyById />}
          />
          <Route
            path='/addproperty'
            element={<AddingProperty />}
          />
        </Route>
        <Route
          path='/*'
          element={<NotFoundPage></NotFoundPage>}
        />
      </Routes>
    </div>
  );
}

export default App;
