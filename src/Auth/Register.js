import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Layout from '../Components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import '../Styles/register.css'
import axios from 'axios';
import {toast}from 'react-toastify'; 
function Register() {
    const [userinfo,setUserinfo]=useState()
    const {register,handleSubmit,formState: { errors }, } = useForm();
    const navigate=useNavigate()
    const onSubmit=async (data)=>{
        try {
            const res =await axios.post(`${process.env.REACT_APP_SERVER}/auth/register`,data)

       
       setUserinfo(data)
       console.log(res);
    
       if(res.data.success){
         toast.success(res.data.message)
         navigate('/login')
       }else{
        toast.error(res.data.message)
       }
     
        } catch (error) {
            console.log(error);
        }
        
      
      }
   
      function displayError(field) {
        if (errors[field]) {
          return <p className="error bg-danger">{errors[field].message}</p>;
        }
        return null;
      }
  return (
    <Layout>
    <div class="container-register">
        <h2 className='reg-form-header'> <u>Registration Form</u></h2>
        <form class="form" onSubmit={handleSubmit(onSubmit)}>
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" required {...register("name",{minLength:{value:3,message:'name must be more than 3 charaters'},maxLength:{value:20,message:'name must be less than 20 characters'}})}/>
                {displayError("name")}             </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required {...register('email')}/>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required     {...register("password", { required:'This field is required',minLength:{value:8,message:'password must be minium 8 characters'}})}/>
            </div>
            <div class="form-group">
                <label for="phone">Phone</label>
                <input type="tel" id="phone" name="phone" required {...register("phone",{minLength:{value:10,message:'phone number must be ten numbers'}})}/>
            </div>
            <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input type="text" id="area" name="address.area" placeholder="Area" required {...register('address.area')} />
            <input type="text" id="city" name="address.city" placeholder="City" required {...register('address.city')} />
            <input type="text" id="district" name="address.district" placeholder="District" required {...register('address.district')} />
            <input type="text" id="state" name="address.state" placeholder="State" required {...register('address.state')} />
            <input type="text" id="postalCode" name="address.postalCode" placeholder="Postal Code" required {...register('address.postalCode')} />
          </div>

            <button type="submit">Submit</button>
        </form>
    </div>
    </Layout>
  )
  }

export default Register