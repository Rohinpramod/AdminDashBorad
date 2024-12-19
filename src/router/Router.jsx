import React from "react";
import { Route, Routes, useNavigate } from "react-router";
import Home from "../pages/Home/Home";
import Login from "../componentes/login/Login";
import Signup from "../componentes/signup/Signup";
import DefaultLayout from "../layout/DefaultLayout";
import NotFound from "../componentes/NotFound/NoteFound";
import EditRestaurant from "../pages/Restaurant/EditRestaurant";
import AllRestaurant from "../pages/Restaurant/AllRestaurant";
import MenuItems from "../pages/MenuItems/MenuItems";
import RestaurantsMenu from "../pages/MenuItems/RestaurantsMenu";

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
                <Route 
                  path="/all-restaurants-name"
                  element={< RestaurantsMenu pageTitle="All Restaurants And MenuItems" />}
                />
                 <Route 
                  path="/restautarnt-menu/:id"
                  element={< MenuItems pageTitle="MenuItems" />}
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
