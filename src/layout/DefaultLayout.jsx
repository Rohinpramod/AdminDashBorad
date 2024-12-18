import React from 'react';
import Navbar from '../componentes/header/Navbar';
import SideBar from '../componentes/SideBar/SideBar';

function DefaultLayout({ children }) {
  return (
    <div className="flex h-[100dvh] overflow-hidden">
      {/* Sidebar */}
      <SideBar />
      <Navbar/>
      {/* Content area */}
      <div className="relative flex-1 overflow-y-auto overflow-x-hidden z-10">
        <main className="grow py-20 w-full max-w-9xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DefaultLayout;
