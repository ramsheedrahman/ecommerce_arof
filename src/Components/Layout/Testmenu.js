import React, { useState } from 'react';
import { FaPlus, FaPlusCircle, FaShoppingCart, FaUsers, FaShoppingBag, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './test.css';
import { TfiLayoutGrid4Alt } from "react-icons/tfi";


const Testmenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
      <div className="menu-icon" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to={'/dashboard/admin'}>
            <TfiLayoutGrid4Alt className="icon" />
            <span className="icon-text">Dashborad</span>
          </Link>
        </li>
        <li>
          <Link to={'/dashboard/admin/create-product'}>
            <FaPlus className="icon" />
            <span className="icon-text">Create Products</span>
          </Link>
        </li>
        <li>
          <Link to={"/dashboard/admin/create-category"}
>
            <FaPlusCircle className="icon"/>
            <span className="icon-text">Create Category</span>
          </Link>
        </li>
        <li>
          <Link to={"/dashboard/admin/products"}>
            <FaShoppingCart className="icon" />
            <span className="icon-text">Products</span>
          </Link>
        </li>
        
        <li>
          <Link to={"/dashboard/admin/order"}>
            <FaShoppingBag className="icon"/>
            <span className="icon-text">Orders</span>
            </Link>
                    </li>
        <li className="logout">
          <a href="/logout">
            <FaSignOutAlt className="icon" />
            <span className="icon-text">Logout</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Testmenu;
