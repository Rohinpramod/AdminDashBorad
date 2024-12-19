import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // For accessing route parameters
import { axiosInstance } from '../../config/axiosInstance'; // Axios instance
import DataTable from 'react-data-table-component';

const MenuItems = () => {
  const { id } = useParams(); // Get the restaurant ID from the URL
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  // Navigate to AddItems page with the restaurant ID
  const handleAddMenuItems = () => {
    navigate(`/addItems/${id}`);
  };

  useEffect(() => {
    fetchMenuItems();
  }, [id]);

  // Columns configuration for DataTable
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
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => `$${row.price}`,
      sortable: true,
    },
  ];

  return (
    <div className="container mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <button
          className="bg-black text-white px-4 mx-8 py-2 rounded"
          onClick={handleAddMenuItems}
        >
          Add Items
        </button>
      </div>
      <div>
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 mt-20">{error}</div>
        ) : (
          <DataTable
            columns={columns}
            data={menuItems}
            pagination
            highlightOnHover
            responsive
            customStyles={{
              headCells: {
                style: {
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  fontSize: '16px',
                },
              },
              rows: {
                style: {
                  fontSize: '14px',
                  borderBottomColor: '#e5e7eb',
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MenuItems;
