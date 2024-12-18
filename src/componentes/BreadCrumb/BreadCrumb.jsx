import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';

function BreadCrumb({ items, onClick ,pageTitle}) {
  return (
    <div className="p-4 flex flex-col md:flex-row justify-between rounded-md">
        <div>
        <h1 className="text-3xl font-bold text-gray-800">{pageTitle}</h1>
        </div>
      <Breadcrumbs aria-label="breadcrumb">
        {items.map((item, index) => (
          index === items.length - 1 ? (
            <Typography
              key={index}
              color="text.primary"
              className="font-medium"
            >
              {item.label}
            </Typography>
          ) : (
            <Link
              key={index}
              color="inherit"
              underline="hover"
              onClick={() => onClick(item.path)}
              className="cursor-pointer hover:text-blue-500"
            >
              {item.label}
            </Link>
          )
        ))}
      </Breadcrumbs>
    </div>
  );
}

export default BreadCrumb;

