import React from "react";
import { Route, Routes } from "react-router";
import Home from "../pages/Home/Home";
import Login from "../componentes/login/Login";
import Signup from "../componentes/signup/Signup";
import Navbar from "../componentes/header/Navbar";
import Footer from "../componentes/footer/Footer";
import AllRestaurant from "../pages/Restaurant/AllRestaurant";
import DefaultLayout from "../layout/DefaultLayout";
import NotFound from "../componentes/NotFound/NoteFound";

const AdminRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/*"
          element={
            <DefaultLayout>
              <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/allrestaurants" element={<AllRestaurant />} />
              <Route path="*" element={<NotFound />} />
              </Routes>
            </DefaultLayout>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default AdminRouter;
