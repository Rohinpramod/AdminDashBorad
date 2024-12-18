import React from "react";
import { Route, Routes, useNavigate } from "react-router";
import Home from "../pages/Home/Home";
import Login from "../componentes/login/Login";
import Signup from "../componentes/signup/Signup";
import DefaultLayout from "../layout/DefaultLayout";
import NotFound from "../componentes/NotFound/NoteFound";
import EditRestaurant from "../pages/Restaurant/EditRestaurant";
import AllRestaurant from "../pages/Restaurant/AllRestaurant";

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
                <Route
                  path="/home"
                  element={<Home pageTitle="Dashboard" />}
                />
                <Route
                  path="/allrestaurants"
                  element={<AllRestaurant pageTitle="All Restaurants" />}
                />
                <Route
                  path="/edit-restaurant"
                  element={<EditRestaurant pageTitle="Edit Restaurant" />}
                />
                <Route path="*" element={<NotFound pageTitle="404 - Not Found" />} />
              </Routes>
            </DefaultLayout>
          }
        />
      </Routes>
    </div>
  );
};

export default AdminRouter;
