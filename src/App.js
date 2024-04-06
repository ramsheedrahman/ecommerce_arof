import React from 'react';
import './App.css';
import { Routes,Route } from 'react-router-dom';
import { useEffect } from 'react';
import Homepage from './Pages/Homepage';
import About from './Pages/About';
import Register from './Auth/Register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Auth/Login';
import store from './redux/store';
import { loadUser } from './redux/actions/user';
import PrivateRoute from './Components/Routes/PrivateRoutes';
import Dashboard from './Pages/Auth/User/Dashboard';
import ForgotPassword from './Auth/ForgotPassword';
import ResetPassword from './Auth/ResetPassword';
import AdminRoute from './Components/Routes/AdminRoute';
import AdminDasboard from './Pages/Auth/Admin/AdminDasboard';
import CreateCategory from './Pages/Auth/Admin/CreateCategory';
import CreateProduct from './Pages/Auth/Admin/CreateProduct';
import Orders from './Pages/Auth/User/Orders';
import Products from './Pages/Auth/Admin/Products';
import UpdateProduct from './Pages/Auth/Admin/UpdateProduct';
import Search from './Pages/SearchResults';
import SearchResults from './Pages/SearchResults';
import ProductDetails from './Pages/ProductDetails';
import Cartpage from './Pages/Auth/User/Cartpage';
import CheckoutForm from './Pages/Auth/User/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import StripeContainer from './Pages/Auth/User/StripeContainer';
import CategoryProduct from './Pages/Auth/User/CategoryProduct';
import OrderDetails from './Pages/Auth/Admin/OrderDetails';
import ProductsSection from './Pages/ProductsSection';
import ProductsPage from './Pages/ProductsPage';
function App() {

  useEffect(()=>{
    store.dispatch(loadUser());
  })
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/reset-password/:id' element={<ResetPassword/>}/>
        <Route path="/search" element={<SearchResults/>} />
        <Route path="/productdetails/:id" element={<ProductDetails />} />
        <Route path='/category/:id' element={<CategoryProduct/>}/>
        <Route path='/products' element={<ProductsPage/>}/>
        <Route path='/cartpage' element={<Cartpage/>} />
        <Route path='/dashboard' element={<PrivateRoute />}>
C       <Route path='user' element={<Dashboard />} />
        <Route path='user/orders' element={<Orders/>}/>
        </Route>
        <Route path='/dashboard' element={<AdminRoute/>}>
        <Route path='admin' element={<AdminDasboard/>} />
        <Route path='admin/create-category'element={<CreateCategory/>}/>
        <Route path='admin/create-product'element={<CreateProduct/>}/>
        <Route path='admin/products'element={<Products/>}/>
        <Route path="admin/product/:id" element={<UpdateProduct/>} />
        <Route path="admin/order" element={<OrderDetails/>} />
        </Route>
        <Route path='/about' element={<About/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    <ToastContainer/>
    </div>
  
  );
}

export default App;
