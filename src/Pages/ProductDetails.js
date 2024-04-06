import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/ProductDetails.css';
import { useParams } from 'react-router-dom';
import Layout from '../Components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Components/Context/cart';

function ProductDetails() {
  const navigate=useNavigate()
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [similarProducts,setSimilarProducts]=useState([])
  const [cart,setCart]=useCart()
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
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/product/get-product/${id}`);
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);

    } catch (error) {
      console.log(error.message);
    }
  };

  const getSimilarProduct=async(pid,cid)=>{
    try {
      const {data}=await axios.get(`${process.env.REACT_APP_SERVER}product/get-relatedproducts/${pid}/${cid}`)
      setSimilarProducts(data?.relatedProducts)
      console.log(data);
    } catch (error) {
      
    }
  }

  useEffect(() => {
    if (id) {
      getProduct();
    }
  }, [id]);

  return (
    <Layout>
      <div className="pd-container-fluid">
        <div className="product-card">
          <div className="product-image">
            <img src={`${process.env.REACT_APP_SERVER}/product/get-productphoto/${id}`} alt="Product" />
          </div>
          <div className="product-details">
            <h2>{product.name}</h2>
            <p>{product?.category?.name}</p>
            <p>₹{product.price}</p> 
            <p>Brand:{product.brand}</p>
             {product.size &&  <p>Size :{product.size}</p>  }
             {product.color &&  <p>Color :{product.color}</p>  }
            <p>{product.description}</p>
            <div className="product-actions">
            <button className="add-to-cart" onClick={()=>handleAddtoCart(product)}>Add to Cart</button>
            </div>
          </div>
        </div>
        
          <div>
            
            <div>
            <p className='heading-similar'>Similar Products</p>

            {similarProducts?.map((p) => (
              <div className="d-flex justify-content-center ">
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
                    <p className="card-text">₹{p.price}</p>
                    <button className="add-to-cart" onClick={()=>handleAddtoCart(p)}>Add to Cart</button>
                    <button className="about-more mx-1" onClick={() => navigate(`/productdetails/${p._id}`)}>About more</button>
                  </div>
                </div>
            </div>))} 
          </div>
          </div>
          
      </div>
    </Layout>
  );
}

export default ProductDetails;
