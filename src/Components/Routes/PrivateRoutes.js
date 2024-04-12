import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Spinner from './Spinner';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

 function PrivateRoute(){
  const navigate=useNavigate()
  const User = useSelector((state) => state.user);
console.log(User.token);
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER}/auth/get-auth`, {
          headers: {
            Authorization: User.token,
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
export default PrivateRoute