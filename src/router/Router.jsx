import React from 'react'
import { Route, Routes } from 'react-router'
import Home from '../pages/Home/Home'
import Login from '../componentes/login/Login'
import Signup from '../componentes/signup/Signup'
import Navbar from '../componentes/header/Navbar'
import Footer from '../componentes/footer/Footer'
import AllRestaurant from '../pages/Restaurant/AllRestaurant'

const AdminRouter = () => {
  return (
    <div>
    
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/home" element={<Home />} />
      <Route path="/allrestaurants" element={<AllRestaurant />}/>
    </Routes>
    
    </div>
  )
}

export default AdminRouter