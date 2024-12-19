import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import useFetch from "../../Hooks/UseFetch";
import { useNavigate } from 'react-router';
import { Pencil, Trash2 } from "lucide-react";
import axios from 'axios';
import { axiosInstance } from '../../config/axiosInstance';
import {  formatDate } from '../../utils/Moment';

function Coupons() {

  const [couponData,setCouponData ] = useState([])
  const [isLoading, setLoading] = useState()
  const [error, setError] = useState()

  useEffect(()=>{
    const [coupons, isLoading, error] = useFetch("/coupon/get-coupon");
    setCouponData(  coupons?.coupons)

    setLoading(isLoading)
    setError(error)
    
  },[])
 
  
  const navigate = useNavigate();

  const handleAddCoupon = () => {
    navigate("/add-coupon");
  };
  
  const handleEditCoupon = (row) => {
    navigate("/add-coupon",{state:{data:row}});
  };
  

  const handleDeleteCoupon = async (id) => {
    try {
      const response = await axiosInstance.delete(`/coupon/delete-coupon/${id}`);
      if (response.status === 200) {
        // alert("Coupon deleted successfully");
        // Refresh the data
        window.location.reload();
      } else {
        // alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      // alert(`Error: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  const columns = [
   
    {
      name: "Code",
      selector: row => row.code,
      sortable: true,
    },
    {
      name: "Discount Percentage",
      selector: row => row.discountPercentage,
      sortable: true,
    },
    {
      name: "Max Discount Value",
      selector: row => row.maxDiscountValue,
      sortable: true,
    },
    {
      name: "Min Order Value",
      selector: row => row.minOrderValue,
      sortable: true,
    },
    {
      name: "Expiry Date",
      selector: row => formatDate(row.expiryDate),
      sortable: true,
    },
    {
      name: "Is Active",
      selector: row => row.isActive ? "Yes" : "No",
      sortable: true,
    },
    {
      name: "Created At",
      selector: row => formatDate(row.createdAt),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2">
          <Trash2
            className="w-4 h-4 text-red-500 cursor-pointer"
            onClick={() => handleDeleteCoupon(row._id)}
          />
          <Pencil
            className="w-4 h-4 text-yellow-500 cursor-pointer"
            onClick={() => handleEditCoupon(row)} 
          />
        </div>
      ),
    },
  ];
  

  return (
    <div className="container mx-auto px-4 min-h-screen flex justify-start">
      <div className="w-full">
        <h1 className="text-3xl font-semibold text-center my-6">Available Coupons</h1>
        <button onClick={handleAddCoupon} className='mb-4 bg-black text-white px-3 py-2 rounded-lg'>Add Coupon</button>
        {isLoading ? (
          <p className="text-center text-gray-700">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <DataTable
            columns={columns}
            data={couponData || []}
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
}

export default Coupons;
