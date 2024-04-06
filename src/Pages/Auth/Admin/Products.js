import React, { useState, useEffect } from "react";
import Testmenu from "../../../Components/Layout/Testmenu";
import Layout from "../../../Components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {Checkbox ,Radio} from "antd";
import { Prices } from "../../../Components/Routes/Price";
import SearchInput from "../../../Components/Forms/SerachInput";
import { useNavigate} from "react-router-dom";
import '../Admin/products.css'
const Products = () => {
  const navigate=useNavigate()
  const [products, setProducts] = useState([]);
  const [categories,setCategories]=useState([])
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
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

console.log(selectedCategories);

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
     
        const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/product/get-allproduct`);
        setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
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
  return (
    <Layout>
      <div className="row dashboard" style={{zIndex:"-1"}}>
      <div className="col-3 col-md-2">
          <Testmenu/>
        </div>
        <div className="col-9 col-md-10" >
          <div className="input w-50 my-3" style={{marginLeft:'48%'}}>
          <SearchInput/>
          </div>
        
          <div className="row">
            {products?.map((p) => (
              <div className=" col-md-3 d-flex justify-content-center ">
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p._id}`}
                className="product-link"
                style={{textDecoration:'none'}}
              > 
                <div className="card m-2" style={{ width: "16rem"}}>
                  <img 
                    src={`${process.env.REACT_APP_SERVER}/product/get-productphoto/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={{height:'14rem', minHeight:'14rem',maxHeight:'14rem'}}
                  />
                  <div className="card-body" >
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">₹{p.price}</p>
                                 
                  </div>
                </div>
                </Link>
            </div>))} 
          </div>
        </div>
      
            </div>

    </Layout>
  );
};

export default Products;