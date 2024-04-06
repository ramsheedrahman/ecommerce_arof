import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './stripeform.css';  // Update the path accordingly
import { useState,useEffect } from 'react';
import {toast}from 'react-toastify'; 
import { useCart } from '../../../Components/Context/cart';
import { useNavigate } from 'react-router-dom';
// import StripePaymentForm from 'react-stripe-payment-form';
import axios from 'axios';

const CheckoutForm = ({clientSecret}) => {
  const navigate=useNavigate()
  const [cart,setCart]=useCart([])
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const [paymentIntentId, setPaymentIntentId] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalAmount,setOriginalAmount]=useState()
  
  const authToken = JSON.parse(localStorage.getItem('auth'));
      if (!authToken || !authToken.token) {
        // Handle the case where the token is missing in localStorage
        toast.error('Authentication token not found.');
        return;
      }
  
  // useEffect(() => {
  //   const fetchClientSecret = async () => {
  //     try {
  //       const response = await axios.post(
  //         'http://localhost:8000/product/payment-intent',
  //         {
  //           amount: 100,
  //         },
  //         {
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         }
  //       );
        
  //       setClientSecret(response.data.clientSecret);
  //       console.log(response.data.clientSecret);
  //     } catch (error) {
  //       console.error('Error making payment request:', error);
  //     }
  //   };
  //   fetchClientSecret()
  // },[]
  // )
console.log(clientSecret);
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!stripe || !elements) {
    return;
  }

  setIsProcessing(true);

  try {
    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
        },
      },
    });

    if (error) {
      setMessage(error.message);
      setIsProcessing(false);
    } else if (paymentIntent.status === 'succeeded') {
      setIsProcessing(false)
      navigate('/dashboard/user/orders')
        localStorage.removeItem("cart");
        setCart([]);
       
      toast.success('Thank you Payment Successfull')
       const order=await axios.post(`${process.env.REACT_APP_SERVER}/product/create-order`,
       {
        cart,paymentIntent,totalQuantity
      },
         {
          headers: {
            Authorization: authToken.token,
          },
        }
       )
       setOriginalAmount(paymentIntent.amount / 100);

       
      console.log('Payment succeeded:', paymentIntent);
    }
  } catch (error) {
    console.error('Error confirming payment:', error);
    setMessage("An unexpected error occurred.");
    setIsProcessing(false);
  }
};
  return (
   
      <div className="row " style={{height:'16rem'}}>
      <div className='stripe-form'>
         <form id="payment-form" onSubmit={handleSubmit}>
         <label>
        Card details
      </label>       
      <CardElement />
      <button  disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
      </div>
      </div>
    );
    

};

export default CheckoutForm;
