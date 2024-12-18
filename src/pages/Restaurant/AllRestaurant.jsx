import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { data, useNavigate, useParams } from "react-router";
import DataTable from "react-data-table-component";
import { Pencil, Trash2 } from "lucide-react";


const AllRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {id} = useParams();

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/restaurant");
      setRestaurants(response.data);
    } catch (err) {
      setError("An error occurred while fetching restaurants.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddRestaurant = () => {
    navigate("/add-restaurant");
  };

  const handleEditRestaurant = (id) => {
    navigate(`/editrestaurants/${id}`) ;
  };

  const handleDeleteRestaurant = async (id) => {
    if (window.confirm("Are you sure you want to delete this restaurant?")) {
      try {
        await axiosInstance.delete(`/restaurant/${id}`);
        setRestaurants((prev) =>
          prev.filter((restaurant) => restaurant.id !== id)
        );
        alert("Restaurant deleted successfully.");
      } catch {
        alert("Failed to delete restaurant. Please try again.");
      }
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, [id]);

  

  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Cuisine",
      selector: (row) => row.cuisine,
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => row.location,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2">
          <Pencil
            className="w-4 h-4 text-yellow-500 cursor-pointer"
            onClick={() => handleEditRestaurant(data._id)}
          />
          <Trash2
            className="w-4 h-4 text-red-500 cursor-pointer"
            onClick={() => handleDeleteRestaurant(row._id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">All Restaurants</h1>
          <button
            onClick={handleAddRestaurant}
            className=" h-[30px] bg-black text-white text-sm px-3 rounded-lg hover:bg-gray-800 focus:outline-none"
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
          <DataTable
            columns={columns}
            data={restaurants}
            pagination
            highlightOnHover
            responsive
          />
        )}
      </div>
    </div>
  );
};

export default AllRestaurants;
