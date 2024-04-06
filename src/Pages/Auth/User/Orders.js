import React, { useEffect, useState } from 'react';
import Layout from '../../../Components/Layout/Layout';
import axios from 'axios';
import '../../../Styles/order.css';
import { useSelector } from 'react-redux';

function Orders() {
  const cancellStatus = 'Cancelled';
  const User = useSelector((state) => state.user);
  console.log(User);

  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/product/get-order-products`, {
        headers: {
          Authorization: User.token,
        },
      });
      setOrders(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const invoiceDownload = async (id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER}/product/download-invoice/${id}`, {
        responseType: 'blob', // Set responseType to 'blob' for binary data
        headers: {
          Authorization: User.token,
        },
      });
  
      // Create a Blob from the response data
      const blob = new Blob([response.data], { type: 'application/pdf' });
  
      // Create a link element and trigger the download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `invoice_${id}.pdf`;
      link.click();
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  useEffect(() => {
    if (User.token) getOrders();
  }, [User.token]);

  const orderCancelhandler = async (id) => {
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_SERVER}/product/cancel-order/${id}`, { status: cancellStatus }, {
        headers: {
          Authorization: User.token,
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Calculate total products and total amount
  const totalProducts = orders.reduce((total, order) => total + order.products.length, 0);
  const totalAmount = orders.reduce((total, order) => total + order.payment.originalAmount, 0);
  const shippingCharge=70;

  return (
    <Layout>
      <div className="container">
        <div style={{marginTop:'100px'}}>
        {!orders ? (
          <h5 style={{color:'red'}}>Orders not Available</h5>
        ) : (
          <>
          <div className='orderdetails-card bg-light'>
            <h3 className="total-amount">Total Order Amount: ₹{totalAmount.toFixed(2)}</h3>
            <h4 className="products-count">{totalProducts} Products</h4>
            </div>       
            {orders.map((order) => (
              <div key={order._id} className="order-details-card bg-light">
                <span className="card-header">Order ID: {order.orderID}</span> <br />
                <span className='payment-id'> <span className='oder-hd'>Payment ID:</span>{order.payment.id}</span>
                <span className={order.status === 'Cancelled' ? 'cancelled-order' : 'order-status'}>
                  <span className='oder-hd'>Status:</span>{order.status}</span>
                <span className='order-date'><span className='oder-hd'>Order Time:</span> {new Date(order.createdAt).toLocaleString()}</span>
                {order.products.map((product) => (
                  <div key={product._id} className="product-card">
                    <img className="product-image" src={`${process.env.REACT_APP_SERVER}/product/get-productphoto/${product._id}`} alt="Product-Image" />
                    <div className="product-info">
                      <h6 className="product-name">{product.name}</h6>
                      <p className="product-quantity">Quantity: {product.quantity}</p>
                      <p className="product-price">Price: ₹{product.price.toFixed(2)}</p>
                      <p className="product-price">Shiping Charge: 70</p>
                      <p className="product-total-price">Total: ₹{parseInt(product.quantity * product.price)+shippingCharge}</p>
                    </div>
                  </div>
                ))}
                <div className="order-actions">
                  <button className="btn btn-primary">Track Order</button>
                  <button className="btn btn-warning" onClick={()=>invoiceDownload(order.orderID)}>Download Invoice</button>
                  <button onClick={() => orderCancelhandler(order.orderID)} className="btn btn-danger">Cancel Order</button>
                </div>
              </div>
            ))}
          </>
        )}
        </div>
      </div>
    </Layout>
  );
}

export default Orders;
