import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Layout from '../../../Components/Layout/Layout'
import UserMenu from '../../../Components/Layout/UserMenu'
import { useNavigate } from 'react-router-dom'
function CategoryProduct() {
  const navigate=useNavigate()
    const [products ,setProducts]=useState([])
    const params=useParams()
    console.log(params.id);
    useEffect(() => {
      console.log('Fetching products by category');
      const getProductsByCategory = async () => {
        try {
          const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/product/get-productbyCategory/${params.id}`);
          console.log('Received data:', data);
          setProducts(data?.products);
        } catch (error) {
          console.log('Error:', error.message);
        }
      };
    
      if (params?.id) {
        getProductsByCategory();
      }
    }, [params.id]);
    
   const handleAddtoCart=()=>{

   }          
  return (
    <Layout>
      <div className="container-fluid " style={{marginTop:'100px'}}>
        <div className="row">
          
          <div className="col-12 product-section"  >
          <div className="row">
            {products?.map((p) => (
              <div className=" col-md-3 d-flex justify-content-center ">
              {/* <Li
                key={p._id}
                to={`/dashboard/admin/product/${p._id}`}
                className="product-link"
                style={{textDecoration:'none'}}
              > */}
                <div className="card m-2" style={{ width: "16rem"}}>
                  <img 
                    src={`${process.env.REACT_APP_SERVER}/product/get-productphoto/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={{height:'14rem', minHeight:'14rem',maxHeight:'14rem'}}
                  />
                  <div className="card-body" >
                    <h5 className="card-title">{p.name}</h5>
                    <p className="product-card-text">${p.price}</p>
                    <button className="about-more mx-1" onClick={()=> navigate(`/productdetails/${p._id}`)}>Aboutmore</button>
                    <button className="add-to-cart" onClick={()=>handleAddtoCart(p)}>Add to Cart</button>
                  </div>
                </div>
            </div>))} 
          </div>
        </div>
        </div>
      </div>
        </Layout>

     
  )
}

export default CategoryProduct