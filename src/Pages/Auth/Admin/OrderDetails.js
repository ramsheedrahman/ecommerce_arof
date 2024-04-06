import React, { useEffect, useState } from 'react';
import Layout from '../../../Components/Layout/Layout';
import Testmenu from '../../../Components/Layout/Testmenu';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Select } from 'antd';
import { Option } from 'antd/es/mentions';
import '../../../Styles/orderDetails.css'
function OrderDetails() {
  const User = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [status,setStatus]=useState(['Not Process','Processing','Cancelled','Shipped','Delivered'])
  const [changeStatus,setChangeStatus]=useState('')
  
  useEffect(() => {
    const getOrders = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/product/get-all-orders`, {
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
  const orderStatushandler=async(value,id)=>{
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_SERVER}/product/order-status-update/${id}`,{status:value},{
        headers: {
          Authorization:User.token    },
      });
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <Layout>
      <div className="container-fluid">
        <div className="row" style={{marginTop:'100px'}}>
          <div className="col-md-2">
            <Testmenu />
          </div>
          <div className="col-12 col-md-10 ">
          {!orders ? (<h1 style={{color:'red'}}>Orders not Available</h1>):(
            <div className="table-responsive">
            <Table className="order-table">
              <thead className="table-dark">
                <tr>
                  <th>Sl.No</th>
                  <th>Order ID</th>
                  <th>Status</th>
                  <th>Buyer</th>
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
                      <Select bordered={false} onChange={(value)=>orderStatushandler(value,order.orderID)} defaultValue={order.status} >
                        {status.map((status,index)=>(
                         <Option value={status}>{status}</Option>
                        ))}
                      </Select>
                    </td>
                    <td>
                      {order.buyer?.name}
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
          </div>
          ) }
        </div>
      </div>
      </div>
    </Layout>
  );
}

export default OrderDetails;
