import React from 'react'
import '../Styles/login.css'
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import {toast}from 'react-toastify'; 
import axios from 'axios';
import '../Styles/login.css'
function Login() {

  const {register,handleSubmit,formState: { errors }, } = useForm();
  const navigate=useNavigate()
  const onSubmit=async(data)=>{
     try {
      const res =await axios.post(`${process.env.REACT_APP_SERVER}/auth/login`,data)
       if(res.data.success){
      
        toast.success(res.data.message)
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate('/')
        console.log(res.data);

       }
       else{
        toast.error(res.data.message)
       }
     } catch (error) {
      console.log(error);
     }
  }
  return (
    <div class="container-login">
    <form class="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>LOGIN FORM</h2>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" required {...register("email")}/>
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" required {...register('password')}/>
        </div>
        <button type="submit">Login</button>
    </form>
  <div className='under-form'>
  <div >
  <p className='reg-link'>Not Registered? <Link to={'/register'}>Click here</Link></p>
  </div>
  <div>
  <p>Forgot password? <Link to={'/forgot-password'}>Click here</Link></p>
  </div>
  </div>
</div>
  )
}

export default Login