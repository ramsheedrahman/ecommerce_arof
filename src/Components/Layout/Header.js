import {React,useState}from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './navbar.css'
import { useCart } from '../Context/cart';
import { Badge } from 'react-bootstrap';
import { useRef } from 'react';
function Header() {
  const[cart,setCart]=useCart([])
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const [isOpen, setIsOpen] = useState(false);
  const User=  useSelector((state) => state.user.user);
  const logOut=()=>{
    localStorage.removeItem("auth");

  }
  const productsSectionRef = useRef();

  const scrollToProducts = () => {
    productsSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }
  return (
    <nav  style={{zIndex:'1'}} className={`navbar ${isOpen ? 'mbscreen' : ''}`}>
      <div className="navbar-logo">
      <li>  <img className='logo-img' src="../logo.jpg" alt="A-rof Traders Logo" />
<Link to={"/"}>A-rof Traders</Link></li>
      </div>
      <ul className="navbar-menu">
        <li>
        <Link to={"/cartpage"}>
        <Badge count={0} showZero>

                    Cart {totalQuantity}
                    </Badge>
                    </Link>
                  
                  </li>
                  <li onClick={scrollToProducts}>
          <Link to={'/products'}>Products</Link>
        </li>
        {User ? 
        <li><Link to={`/dashboard/${User.role === 1 ? 'admin' : 'user'}`}>Dashboard</Link></li>
         :
         null
        }
        {!User ? 
        <li><Link to={"/login"}>Login</Link></li>
        :

        <li> <Link href="" onClick={logOut}>Logout</Link> </li>
        
}
      </ul>
      <div className="navbar-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  )
}

export default Header