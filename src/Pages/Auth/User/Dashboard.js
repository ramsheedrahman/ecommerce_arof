import React from 'react'
import Layout from '../../../Components/Layout/Layout'
import UserMenu from '../../../Components/Layout/UserMenu'
import Link from 'antd/es/typography/Link'
import { useSelector } from 'react-redux'
import '../../../Styles/userdashboard.css'
import { FaCartArrowDown,FaShopify} from "react-icons/fa";
import { FaUsers, FaShoppingBag } from 'react-icons/fa';
import { FaSackDollar } from 'react-icons/fa6';
import { useCart } from '../../../Components/Context/cart';
import { useState,useEffect } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';

function Dashboard() {
  const [orders,setOrders]=useState([])
  const [cart,setCart]=useCart([])
  const User = useSelector((state) => state.user);
  const totalPurchaseAmount=orders.reduce((total,order)=>total+order.payment.originalAmount,0)
  const totalCart = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/product/get-order-products`, {
          headers: {
            Authorization:User.token, 
          },
        });
        setOrders(data)
      } catch (error) {
        console.log(error);
      }
    };

    getOrders();
  }, [User.token]);
 
  return (
    <Layout>
        <div className="container-fluid ">
          <div className="row">
            <div className="user-menu col-md-2 col-1">
            <UserMenu/>
            </div>
<div className="col-md-10 col-11">
  <div className=" row dashboard-cards" style={{marginTop:'100px'}}>
  <div className="col-md-4 col-12 mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="">
                      <div>
                        <FaCartArrowDown className="dash-icon" /> <span className='span-text'>Cart</span>
                      </div>
                      
                    </div>
                    <p className="card-text">{totalCart}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-12 mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="">
                      <div>
                        <FaShoppingBag className="dash-icon" /><span className='span-text'>Orders</span>
                      </div>
                      
                    </div>
                    <p className="card-text">{orders.length}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-12 mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="">
                      <div>
                        <FaShopify className="dash-icon" /><span className='span-text'>Purchase</span>
                      </div>
                      
                    </div>
                    <p className="card-text">${totalPurchaseAmount} </p>
                  </div>
                </div>
              </div>
    </div>
    <div className="row">
    <div className="col-12 col-md-12 ">
            <div className="table-responsive" style={{marginTop:'2rem'}}>
              <h3><u>Order Details</u></h3>
              {!orders ?(<h6 style={{color:'red'}}>Orders not Available.. Pls Make Orders</h6>):(
            <Table className="order-table">
              <thead className="table-dark">
                <tr>
                  <th>Sl.No</th>
                  <th>Order ID</th>
                  <th>Status</th>
                  <th>Products</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order._id}>
                    <td>{index + 1}</td>
                    <td>{order.orderID}</td>
                    <td>
                      {order.status}
                    </td>
                    <td>
                      {order.products.map((product) => (
                        <div key={product._id}>
                          <span>{product.name}</span>
                          <span style={{ marginLeft: '10px' }}>Nos.({product.quantity})</span>
                        </div>
                      ))}
                    </td>
                    <td>
                      {/* Render Total Quantity */}
                      {order.products.reduce((acc, product) => acc + product.quantity, 0)}
                    </td>
                    <td>
                     {order.payment.originalAmount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
              )}
          </div>
          </div>

    </div>
    </div>
    </div>
</div>        
    </Layout>
  )
}

export default Dashboard

