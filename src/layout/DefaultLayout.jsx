import React from 'react';
import Navbar from '../componentes/header/Navbar';
import SideBar from '../componentes/SideBar/SideBar';
import BreadCrumb from "../componentes/BreadCrumb/BreadCrumb";
import { useLocation, useNavigate } from 'react-router';

function DefaultLayout({ children }) {
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
    <div className="flex h-[100dvh] overflow-hidden">
      {/* Sidebar */}
      <SideBar />
      <Navbar />
      {/* Content area */}
      <div className="relative flex-1 overflow-y-auto overflow-x-hidden z-50">
        <main className="grow py-20 w-full max-w-9xl mx-auto">
          <BreadCrumb
            items={breadcrumbItems}
            onClick={handleBreadcrumbClick}
            pageTitle={pageTitle}
          />
          {children}
        </main>
      </div>
    </div>
  );
}

export default DefaultLayout;
