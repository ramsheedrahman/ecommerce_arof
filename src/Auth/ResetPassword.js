import axios from 'axios';
import React, { useState } from 'react';
import {toast}from 'react-toastify'; 
import { useParams } from 'react-router-dom';

function ResetPassword() {
  const [errors, setErrors] = useState({});
  const [newPassword, setNewPassword] = useState('');
  const { id } = useParams();


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous error messages
    setErrors({});

    if (newPassword === '') {
      setErrors({ newPassword: 'Password is required' });
    } else if (newPassword.length < 8) {
      setErrors({ newPassword: 'Password must be at least 8 characters' });
    } else {
      try {
        const res = await axios.post(`${process.env.REACT_APP_SERVER}/auth/reset-password/${id}`, {
          newPassword: newPassword
        });
      console.log(res.data);
        if (res.data.success) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error(error);
        // Handle error as needed
      }
    }
  };

  return (
    <div className="reset-password-form">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="password"
            id="password"
            name="newPassword"
            placeholder="Enter your new password"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        {errors.newPassword ? <p style={{color:'red'}}>{errors.newPassword}</p>:null}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ResetPassword;
