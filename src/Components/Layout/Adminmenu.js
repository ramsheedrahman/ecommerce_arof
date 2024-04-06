import React from "react";
import { NavLink } from "react-router-dom";
import './adminmenu.css'
const AdminMenu = () => {
  return (
    <>
      <div className="text-center" style={{backgroundColor:"#6C3483"}}>
        <div className="list-group dashboard-menu">
          <h4 className="list-group-item ">Admin Panel</h4>
          {/* Category */}
          <NavLink
            to="/dashboard/admin/create-category"

          >
             Create Category
          </NavLink>
          {/* Product */}
          <NavLink
            to="/dashboard/admin/create-product"
            // className="list-group-item list-group-item-action"
            style={{ backgroundColor: '#343a40' }}

          >
             Create Product
          </NavLink>
          {/* Products */}
          <NavLink
            to="/dashboard/admin/products"
            // className="list-group-item list-group-item-action"
            // style={{ backgroundColor: '#343a40' }}

          >
             Products
          </NavLink>
          {/* Orders */}
          <NavLink
            to="/dashboard/admin/orders"
            // className="list-group-item list-group-item-action"
            // style={{ backgroundColor: '#343a40' }}

          >
           Orders
          </NavLink>
          {/* Users */}
          <NavLink
            to="/dashboard/admin/users"
            // className="list-group-item list-group-item-action"
            // style={{ backgroundColor: '#343a40' }}

          >
            Users
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
