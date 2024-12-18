import React from 'react'
import Navbar from '../componentes/header/Navbar'
import Footer from '../componentes/footer/Footer'
import SideBar from '../componentes/SideBar/SideBar'

function DefaultLayout({children}) {
    return (
      <div className="flex h-[100dvh] overflow-hidden">
        
        {/* Sidebar for small screens on top */}
        <SideBar />
  
        {/* Content area */}
        <div className="relative flex-1 overflow-y-auto overflow-x-hidden z-10">
          <Navbar />
  
          <main className="grow mt-20 px-4 sm:px-6 lg:px-8 w-full max-w-9xl mx-auto">
            {children}
          </main>
        </div>
      </div>
    );
  } 
  export default DefaultLayout;
  
