import {React} from "react";
import { Link, NavLink } from "react-router-dom";
import { FaPlus, FaPlusCircle, FaShoppingCart, FaShoppingBag, FaSignOutAlt,FaUsers } from "react-icons/fa";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import '../../Styles/usermenu.css'
import { useState } from "react";
const UserMenu = () => {
  const User=  useSelector((state) => state.user.user);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <div className={`sidebar ${menuOpen ? 'open':''}`}>
      <div className="menu-icon" onClick={toggleMenu}>
      <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
     <div className="profile-section">
     <FaUserCircle className='user-icon'/>
        <div className="profile-details">
          <p className="name"> {User.name}</p>
          <p>{User.email}</p>
        </div>
        </div>
      <ul className="sidebar-menu">
        <li>
          <Link to={'dashboard/user'}>
            <TfiLayoutGrid4Alt className="icon" />
            <span className="icon-text">Dashborad</span>
            </Link>
            </li>

        <li>
          <Link  to={"/cartpage"}>
            <FaShoppingCart className="icon" />
            <span className="icon-text">Cart</span>
            </Link>
            </li>
        <li>
          <Link to={"/dashboard/user/orders"}>
            <FaShoppingBag className="icon"/>
            <span className="icon-text">Orders</span>
            </Link>
                    </li>
        <li className="logout">
          <a href="">
            <FaSignOutAlt className="icon" />
            <span className="icon-text" onClick={()=>localStorage.removeItem("auth")} >Logout</span>
            </a>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
