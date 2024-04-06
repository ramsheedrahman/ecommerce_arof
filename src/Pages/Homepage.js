import React from 'react'
import Layout from '../Components/Layout/Layout'
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {Checkbox ,Radio} from "antd";
import SearchInput from "../Components/Forms/SerachInput"
import { useNavigate} from "react-router-dom";
import { useState,useEffect } from 'react';
import '../Styles/Homepage.css'
import { useCart } from '../Components/Context/cart';
import ProductsSection from './ProductsSection';
import FilterSection from './FilterSection';
import Products from './Auth/Admin/Products';
function Homepage() {
  const navigate=useNavigate()
  const backendUrl = process.env.REACT_APP_SERVER;


  const [showDropdown, setShowDropdown] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories,setCategories]=useState([])
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [cart,setCart]=useCart()
  const handleCheckboxChange = (value,c) => {
    let all=[...selectedCategories]
    if(value){
      all.push(c)
    }
    else{
      all.filter((category)=> category !== c)
    }
    setSelectedCategories(all)
  //   if(value){
  //   if (selectedCategories.includes(category)) {
  //     setSelectedCategories(selectedCategories.filter((c) => c !== category));
  //   } else {
  //     setSelectedCategories([...selectedCategories, category]);
  //   }
  // }
  };
  
  const handleAddtoCart = (p) => {
    const existingProduct = cart.find((item) => item._id === p._id);
  
    if (existingProduct) {
      // If the product already exists in the cart, update its quantity
      const updatedCart = cart.map((item) =>
        item._id === p._id ? { ...item, quantity: item.quantity + 1 } : item
      );
  
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      // If the product is not in the cart, add it with quantity 1
      const updatedCart = [...cart, { ...p, quantity: 1 }];
  
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  console.log(selectedCategories);
  console.log(cart);
  
    const getAllcategory=async()=>{
      try {
       const {data} =await axios.get(`${process.env.REACT_APP_SERVER}/category/get-category`)
       if(data.success){
        setCategories(data.category)
       }
      } catch (error) {
        console.log(error);
        toast.error("Something wwent wrong in getting catgeory");
      }
    }
    useEffect(()=>{
      getAllcategory()}
      ,[])
    //getall products
    const getAllProducts = async () => {
      try {
       
          const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/product/get-allproducts`);
          setProducts(data.products);
      } catch (error) {
        console.log(error);
        toast.error("Someething Went Wrong");
      }
    };
    const handleDropdownChange = (selectedCategoryId) => {
      if (selectedCategoryId === 'all') {
        // Handle the case where 'All Categories' is selected
        setSelectedCategories([]); // Clear the selected categories array
      } else {
        // Handle the case where a specific category is selected
        setSelectedCategories([selectedCategoryId]);
      }
    };
    
    const getFilteredProducts=async ()=>{
      try {
        const filter= await axios.post(`${process.env.REACT_APP_SERVER}/product/filter-products`,{selectedCategories,selectedPrices})
           console.log(filter);
            setProducts(filter.data.products)
      } catch (error) {
        console.log(error);
        toast.error(error)
      }
      
    }
  
    //lifecycle method
    useEffect(() => {
      if(!selectedCategories.length || !setSelectedPrices.length) getAllProducts();
    }, []);
    useEffect(() => {
      if(selectedCategories.length ||  setSelectedPrices.length) getFilteredProducts();
    }, [selectedCategories,selectedPrices]);
  const data= useSelector((state) => state.user.user);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <Layout>
      <div className="row dashboard" style={{marginTop:'100px' ,zIndex: '-1' }}>
        <div className="col-12 col-md-6 my-1">
          <SearchInput />
        </div>
        <div className="col-12 col-md-6 my-1">
  <div className="responsive-dropdown">
    <button className="cat-btn" onClick={toggleDropdown}>
      Categories
    </button>
    {showDropdown && (
      <ul className="cat-ul">
        {categories && categories.map((category) => (
          <li className="category-list" key={category._id}>
            <Link to={`category/${category._id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    )}
  </div>
</div>


        <div className="row">
          <div className="col-12 m-2">
            <img className="home-image" src="/Web-Banner_Long_Newborn.jpg" alt="mmmm" />
          </div>
        </div>
        <div className='row'>
          <div className="col-12">
          <ProductsSection/>
          </div>
        </div>
        </div>
      
    </Layout>
  );
}

export default Homepage;

  
  


