import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { useNavigate } from 'react-router';

const AllRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/restaurant');
      setRestaurants(response.data);
    } catch (err) {
      setError('An error occurred while fetching restaurants.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddRestaurant = () => {
    useNavigate('/add-restaurant');
  };

  const handleEditRestaurant = (id) => {
    window.location.href = `/edit-restaurant/${id}`;
  };

  const handleDeleteRestaurant = async (id) => {
    if (window.confirm('Are you sure you want to delete this restaurant?')) {
      try {
        await axiosInstance.delete(`/restaurant/${id}`);
        setRestaurants((prev) => prev.filter((restaurant) => restaurant.id !== id));
        alert('Restaurant deleted successfully.');
      } catch {
        alert('Failed to delete restaurant. Please try again.');
      }
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">All Restaurants</h1>
          <button
            onClick={handleAddRestaurant}
            className="btn btn-primary"
          >
            Add New Restaurant
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Cuisine</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {restaurants.map((restaurant, index) => (
                  <tr key={restaurant.id}>
                    <th>{index + 1}</th>
                    <td>{restaurant.name}</td>
                    <td>{restaurant.cuisine}</td>
                    <td>{restaurant.location}</td>
                    <td>{restaurant.status}</td>
                    <td>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditRestaurant(restaurant.id)}
                          className="btn btn-warning btn-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteRestaurant(restaurant.id)}
                          className="btn btn-error btn-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRestaurants;
