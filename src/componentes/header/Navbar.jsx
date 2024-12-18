import React from 'react'

const Navbar = () => {
  return (
    <div className="navbar shadow-md bg-gray-900 text-white fixed top-0 left-0 w-full z-50">
      <div className="flex-1">
        <a className="text-2xl font-bold hidden md:block  text-white hover:text-gray-300 transition-all duration-300">MyApp</a>
      </div>
      <div className="flex-none gap-4">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar relative">
            <div className="w-12 h-12 rounded-full border-2 border-white">
              <img
                alt="User Avatar"
                className="w-full h-full rounded-full object-cover"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full"></span> {/* Notification indicator */}
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-gray-800 text-white rounded-lg shadow-lg mt-3 w-52 p-2">
            <li>
              <a className="justify-between flex items-center">
                <span>Profile</span>
                <span className="badge badge-sm badge-secondary">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
