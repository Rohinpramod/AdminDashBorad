import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

const AddItems = () => {
  const { id } = useParams(); // Extract the restaurantId from the URL
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    isAvailable: false,
    description: "",
    image: null,
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: e.target.files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("price", formData.price);
    payload.append("category", formData.category);
    payload.append("isAvailable", formData.isAvailable);
    payload.append("description", formData.description);
    if (formData.image) {
      payload.append("image", formData.image);
    }

    try {
      await axiosInstance.post(`restaurant/${id}`, payload);
      setSuccessMessage("Menu item added successfully!");
      setError("");
      setFormData({
        name: "",
        price: "",
        category: "",
        isAvailable: false,
        description: "",
        image: null,
      });
      navigate(`all-restaurants-name`); // Redirect after success
    } catch (err) {
      setError("Failed to add menu item. " + (err.response?.data?.message || ""));
    }finally{
      alert('Item added successfuly');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-gray-800  shadow-lg  rounded-lg p-8">
        <div className="text-center text-white mb-6">
          
          <h1 className="text-2xl font-bold mt-4">Add New Menu Item</h1>
       
        </div>


        <form onSubmit={handleSubmit} className="space-y-4  rounded-lg">
          <div>
            <label className="block text-sm font-medium text-white">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium  text-white">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              required
            ></textarea>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="text-sm font-medium  text-white">
              Is Available
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium  text-white">
              Image
            </label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="mt-1 block w-full text-sm  text-white border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              accept="image/*"
            />
            {formData.image && (
              <p className="text-sm text-gray-500 mt-1">{formData.image.name}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
