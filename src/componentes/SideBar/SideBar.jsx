import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Toggle the sidebar visibility
  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { path: '/home', label: 'Dashboard' },
    { path: '/allrestaurants', label: 'All Restaurants' },
    { path: '/allmenuitems', label: 'All MenuItems' },
    { path: '/allcoupons', label: 'All Coupons' },
    { path: '/allrestaurantorders', label: 'All Restaurant Orders' },
  ];

  return (
    <div>
      {/* Sidebar */}
      <div
        className={`bg-gray-900 text-white w-full md:w-64 h-full p-6 fixed md:static transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="text-2xl font-semibold mb-4 text-center">Admin Dashboard</div>
        <ul className="flex flex-col gap-6 mt-20">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path}>
                <div
                  className={`p-2 rounded-lg w-full text-left hover:bg-gray-700 transition ${
                    location.pathname === item.path ? 'bg-gray-700' : ''
                  }`}
                >
                  {item.label}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Content Area */}
      <div className="flex-1 md:ml-64 p-6">
        {/* Mobile Hamburger Icon */}
        <button
          className={`md:hidden text-white p-4  absolute top-4 left-4 z-50`}
          onClick={toggleSidebar}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default SideBar;