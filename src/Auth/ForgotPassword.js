import React, { useState } from 'react'
import '../Styles/Forgotpassword.css'
import axios from 'axios'
import { toast } from 'react-toastify'
function ForgotPassword() {
  
  const [email, setEmail]=useState()
 async function  handleSubmit(e){
     e.preventDefault()
     const setErrors={}

     if(email===''){
setErrors({email:'email must be needed'})     }
     const res =await axios.post(`${process.env.REACT_APP_SERVER}/auth/forgetpassword`,{
      'email':email
     })
     console.log(res.data);

      if(res.data.success){
        const id=res.data.user._id
        const secretRoute=`/reset-password/${id}`
        toast.success('Pls Check Your mail for Password reset link')

      }else{
        toast.error(res.data.message)
      }
    }
  return (
    <div className="reset-password-form">
    <form className="form" onSubmit={handleSubmit}>
    <h2>Reset Password</h2>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" onChange={(e)=>setEmail(e.target.value)} required />
      
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
  )
}

export default ForgotPassword