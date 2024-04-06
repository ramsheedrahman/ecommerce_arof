import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './Spinner.css'
function Spinner({path='login'}) {
    const [count,setCount]=useState(5)
    const navigate=useNavigate()
    const location=useLocation()
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //       setCount((prevValue) => prevValue - 1);
    //     }, 1000);
    //   count ===0 && navigate('/login')
    //   return ()=>clearInterval(interval)
    //   }, [count,navigate]);
    useEffect(()=>{
      const interval = setInterval(() => {
        setCount((prevValue) => --prevValue);
      }, 1000);
      count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
      return () => clearInterval(interval);
    },[count,navigate,path,location])
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>

  //   <div class="d-flex justify-content-center" style={{height:'100vh'}}>
  //     <h1 className='Text-center'>You need to Login .. Redirecting to in {count} seconds</h1>
  //   <div class="spinner-border" role="status">
  //     <span class="visually-hidden">Loading...</span>
  //   </div>
  // </div>
  )
}

export default Spinner