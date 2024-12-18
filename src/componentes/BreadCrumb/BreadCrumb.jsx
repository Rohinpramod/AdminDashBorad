import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';

function BreadCrumb({children}) {

    const navigate = useNavigate();
    const location = useLocation();
  
    // Generate dynamic breadcrumb items based on the current route
    const generateBreadcrumbItems = () => {
      const pathSegments = location.pathname.split("/").filter((path) => path);
  
      const breadcrumbItems = pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
        return {
          label: segment.charAt(0).toUpperCase() + segment.slice(1),
          path: path,
        };
      });
      // Add a default "Dashboard" item at the beginning
      return [{ label: "Dashboard", path: "/home" }, ...breadcrumbItems];
    };
  
    const breadcrumbItems = generateBreadcrumbItems();
  
    const handleBreadcrumbClick = (path) => {
      navigate(path);
    };
  
    const findPageTitle = (children) => {
      if (!children) return null;
    
      // Handle single React elements
      if (!Array.isArray(children)) {
        const routeProps = children.props;
        if (
          routeProps?.element?.props?.pageTitle &&
          routeProps.path === location.pathname
        ) {
          return routeProps.element.props.pageTitle;
        }
        return findPageTitle(routeProps?.children);
      }
    
      // Handle array of children
      for (const child of children) {
        const routeProps = child.props;
        if (
          routeProps?.element?.props?.pageTitle &&
          routeProps.path === location.pathname
        ) {
          return routeProps.element.props.pageTitle;
        }
        // Recursively check nested routes
        const nestedTitle = findPageTitle(routeProps?.children);
        if (nestedTitle) return nestedTitle;
      }
      return null;
    };
    const pageTitle = findPageTitle(children) || 'Default Title';
  return (
    <div className="p-4 flex flex-col md:flex-row justify-between rounded-md">
        <div>
        <h1 className="text-3xl font-bold text-gray-800">{pageTitle}</h1>
        </div>
      <Breadcrumbs aria-label="breadcrumb">
        {breadcrumbItems.map((item, index) => (
          index === breadcrumbItems.length - 1 ? (
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
              onClick={() =>  handleBreadcrumbClick(item.path)}
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

