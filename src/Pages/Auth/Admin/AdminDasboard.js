import React from 'react';
import Layout from '../../../Components/Layout/Layout';
import AdminMenu from '../../../Components/Layout/Adminmenu';
import { useSelector } from 'react-redux';
import Testmenu from '../../../Components/Layout/Testmenu';
import { FaUsers, FaShoppingBag } from 'react-icons/fa';
import { FaSackDollar } from 'react-icons/fa6';
import '../../../Styles/admindashboard.css';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Chart from 'chart.js/auto';
import { TfiLayoutGrid4Alt } from "react-icons/tfi";


function AdminDasboard() {
const [orders,setOrders] =useState([])
const[salesData,setSalesData]=useState([])
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER}/product/get-monthly-sales`);
      setSalesData(response.data)
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);

const salesChartData = {
  labels: salesData.map((item)=>item.month), // Month names as labels
  datasets: [{
    label: 'Monthly Sales', // Label for the dataset
    data: salesData.map((item)=>item.sales), // Corresponding sales values
    backgroundColor: 'rgba(255, 99, 132, 0.2)', // Optional background color
    borderColor: 'rgba(255, 99, 132, 1)', // Optional border color
    borderWidth:2// Optional border width
  }]
};

useEffect(() => {
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: salesChartData,
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            font: {
              size: 14, // Adjust text size
              color: 'gray' // Set text color
            }
          }
        }
      }
    }
  });

  return () => myChart.destroy(); // Clean up chart when component unmounts
}, [salesData]);


  const User = useSelector((state) => state.user);
  const hasUser = !!User && Object.keys(User).length;
  
  

  const totalSalesAmount=orders.reduce((total,order)=>total+order.payment.originalAmount,0)

  useEffect(() => {
    const getOrders = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/product/get-all-orders`, {
          headers: {
            Authorization:User.token, 
          },
        });
        setOrders(data)
        console.log(orders);
      } catch (error) {
        console.log(error);
      }
    };

    getOrders();
  }, [User.token]);

  return (
    <Layout>
      <div className="container-fluid admin-dashboard">
        <div className="row">
          {/* Sidebar (col-md-3 for large screens, col-12 for small screens) */}
          <div className='col-md-2 col-1' style={{height:'100%'}}>
            <Testmenu className='fixed-sidebar'/>
          </div>

          {/* Dashboard (col-md-9 for large screens, col-12 for small screens) */}
          <div className="col-md-10 col-11">
            <div className="row">
              <div className="col-md-4 col-12 mb-3">
                <div className="dash-card">
                  <div className="dash-card-body">
                    <div>
                      <div>
                        <FaUsers className="dash-icon" /><span className="dash-card-title">Total Users</span>
                      </div>
                      
                    </div>
                    <p className="dash-card-text">{hasUser}  <span className='span-text'>Users</span></p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-12 mb-3">
                <div className="dash-card">
                  <div className="dash-card-body">
                    <div className="">
                      <div>
                        <FaShoppingBag className="dash-icon" /><span className="dash-card-title">Total Orders</span>
                      </div>
                      
                    </div>
                    <p className="dash-card-text">{orders.length}<span className='span-text'>Orders</span></p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-12 mb-3">
                <div className="dash-card">
                  <div className="dash-card-body">
                    <div>
                      <div>
                        <FaSackDollar className="dash-icon" /><span className="dash-card-title">Total Sales</span>
                      </div>
                      <div>
                      </div>
                    </div>
                    <p className="dash-card-text">₹{totalSalesAmount}  /-</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row" style={{marginTop:'4rem'}}>
              <div className=" sales-chart acol-12 col-md-6">
              <canvas id="myChart"></canvas>
              </div>
              <div className=" orders-table col-12 col-md-6" style={{marginBottom:'20px'}}>
                <h4><u>Latest Orders</u></h4>
                {!orders ? (<h5>No orders available</h5> ): 
             ( <table>
  <thead>
    <tr>
      <th scope="col" style={{width:''}}>SL.No</th>
      <th scope="col">Order Id</th>
      <th scope="col">User Nmae</th>
      <th scope="col">Amount</th>
    </tr>
  </thead>
  <tbody>

      {orders.map((order,index)=>(
         <tr>

        <td>{index+1}</td>
        <td>{order.orderID}</td>
        <td>{order.buyer?.name}</td>
        <td>₹ {order.payment.originalAmount}</td>
        </tr>
      ))}
    
  </tbody>
</table>
      )}      </div>
            </div>
          </div>
        </div>
       

      </div>
    </Layout>
  );
}

export default AdminDasboard;
