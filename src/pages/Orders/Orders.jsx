import React from 'react';
import { useParams } from 'react-router';
import useFetch from '../../Hooks/UseFetch';
import DataTable from 'react-data-table-component';

const Orders = () => {
  const { id } = useParams();
  const [orderData, isLoading, error] = useFetch(`/order/get-all-restaurant-orders/${id}`);
  
  const orders = orderData?.orders;

  const columns = [
    {
      name: 'Order ID',
      selector: row => row._id,
    },
    {
      name: 'Restaurant',
      selector: row => row.restaurant.name,
    },
    {
      name: 'Status',
      selector: row => row.status,
    },
    {
      name: 'Total Amount',
      selector: row => row.totalAmount,
    },
    {
      name: 'Final Price',
      selector: row => row.finalPrice,
    },
    {
      name: 'Created At',
      selector: row => new Date(row.createdAt).toLocaleString(),
    },
  ];

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {orders && (
        <DataTable
          columns={columns}
          data={orders}
          pagination
        />
      )}
    </div>
  );
};

export default Orders;
