import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // For accessing route parameters
import { axiosInstance } from '../../config/axiosInstance'; // Axios instance

const MenuItems = () => {
  const { id } = useParams(); // Get the restaurant ID from the URL
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch menu items for the restaurant
  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/restaurant/${id}`);
      setMenuItems(response.data.menuItems);
    } catch (err) {
      setError("Failed to fetch menu items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, [id]);

  // Render Loading, Error, or Menu Items
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-20">{error}</div>
    );
  }

  return (
    <div className="container mx-auto mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {menuItems.length > 0 ? (
          menuItems.map((item) => (
            <div
              key={item._id}
              className="border  w-80 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-semibold text-lg">${item.price}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No menu items available.
          </p>
        )}
      </div>
    </div>
  );
};

export default MenuItems;
