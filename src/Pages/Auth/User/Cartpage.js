// CartPage.js
import React, { useEffect, useState } from "react";
import { FaTrash, FaHeart, FaMinus, FaPlus } from "react-icons/fa";
import { useCart } from "../../../Components/Context/cart";
import '../../../Styles/Cartpage.css'
import Layout from "../../../Components/Layout/Layout";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "./CheckoutForm";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import StripeContainer from "./StripeContainer";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
const CartPage = () => {
  const User=useSelector((state)=>state.user.user)
  const shippingCost=70
  const navigate=useNavigate()
  const [cart,setCart]=useCart([])
  const [redyForpaid,setreadyForpaid]=useState(false)
  const [totalPrice, setTotalPrice] = useState();

  const calculateTotalPrice = () => {
    const total= cart.reduce((total, item) => total + item.price * item.quantity, 0);
    return total
  };
  useEffect(() => {
  setTotalPrice(calculateTotalPrice()+shippingCost);
}, [cart]);
  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCart = cart.map(item => {
      if (item._id === productId) {
        return { ...item, quantity: newQuantity };
      }

      return item;

    });

    setCart(updatedCart);
  };
  console.log(cart);

  const handleDeleteCart=(productId)=>{
     const cartUpdated=cart.filter(item => item._id !==productId);
     setCart(cartUpdated)
  }
  return (
    <Layout>
    <section className="h-100 gradient-custom">
      <div className="container py-5">
        <div className="row d-flex justify-content-center my-4">
        <h2>{`Hello ${User ? User.name : 'Guest'}`}</h2>
        <h3 className="mb-2"> You have {cart.length} Items in Your Cart</h3>
         <p style={{color:'red'}}>{!User? 'Pls Login to Checkout' :''}</p>
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header py-3">
              </div>
              <div className="card-body">
              {
  Array.from(new Set(cart.map(item => item._id))).map(productId => {
    const product = cart.find(item => item._id === productId);

    return (
      <div className="row" key={product._id}>
        <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
          <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
            <img src={`${process.env.REACT_APP_SERVER}/product/get-productphoto/${product._id}`} className="w-100" alt={product.name} />
            <a href="#!">
              <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}></div>
            </a>
          </div>
        </div>
        <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
          <p>
            <strong>{product.name}</strong>
          </p>
          <p>Color: {product.color}</p>
          <p>Size: {product.size}</p>
          <button type="button" className="btn btn-primary btn-sm me-1 mb-2" data-mdb-toggle="tooltip" title="Remove item">
            <FaTrash />
          </button>
          <button type="button" className="btn btn-danger btn-sm mb-2" data-mdb-toggle="tooltip" title="Move to the wish list">
            <FaHeart />
          </button>
        </div>
        <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
          <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
            <button className="btn btn-primary px-3 me-2" onClick={() => handleQuantityChange(product._id, product.quantity -1)}>
              <FaMinus />
            </button>
            <div className="form-outline">
              <input id={`form-${product._id}`} min="0" name="cartquantity" value={product.quantity} type="number" className="form-control" />
              <label className="form-label" htmlFor={`form-${product._id}`}>
                Quantity
              </label>
            </div>
            <button className="btn btn-primary px-3 ms-2" onClick={() => handleQuantityChange(product._id, product.quantity + 1)}>
              <FaPlus />
            </button>
          </div>
          <p className="text-start text-md-center">
            <strong>${product.price.toFixed(2)}</strong>
          </p>
          <button className=" btn btn-danger m-2" onClick={()=>handleDeleteCart(product._id)}>Delete Cart</button>

        </div>
      </div>
    );
  })
}

              </div>

            </div>


            </div>


            <div className="card mb-4 mb-lg-0">
              <div className="card-body">
                <p>
                  <strong>We accept</strong>
                </p>
                <img className="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
              alt="Visa" />
            <img className="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
              alt="American Express" />
            <img className="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
              alt="Mastercard" />
            <img className="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.svg"
              alt="PayPal acceptance mark" />

              </div>
            </div>
          </div>

          <div className="col-md-4 mx-auto ">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products
                    <span>{calculateTotalPrice()}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Shipping
                    <span>${shippingCost}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                      
                    </div>
                    <span>
                      <strong>{totalPrice}</strong>
                    </span>
                  </li>
                </ul>

                <button onClick={()=>{
                  if(!User){
                    navigate('/login')
                  }
                  else{
                    setreadyForpaid(true)
                  }
                }}>Make Order</button>

              </div>
            </div>
          </div>
          <div>
            
          </div>
        </div>
      
    </section>
    
      <Modal  show={redyForpaid}    onHide={() => setreadyForpaid(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Payment</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <StripeContainer amount={totalPrice} />
    </Modal.Body>
  </Modal>




    </Layout>
  );
};

export default CartPage;
