import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Spinner from './Spinner';
import { Outlet } from 'react-router-dom';

 function AdminRoute(){
  const User = useSelector((state) => state.user);
const token=User.token
console.log(token);

  const [ok, setOk] = useState(false);
  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get('http://localhost:8000/auth/admin-auth', {
          headers: {
            Authorization:token,
          },
        });
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        // Handle the error, e.g., display an error message or redirect.
        console.error('Authentication error:', error);
        setOk(false);
      }
    };
 if(User.token)authCheck();
  }, [User.token]);
  
  return ok ? <Outlet /> : <Spinner path=''/>;
}
export default AdminRoute