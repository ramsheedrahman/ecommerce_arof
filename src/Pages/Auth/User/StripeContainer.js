import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "./CheckoutForm";
import axios from 'axios';
function StripeContainer({amount}) {
  console.log(amount);
  console.log(typeof(amount))
  const [clientSecret, setClientSecret] = useState(null);
  const stripePromise = loadStripe('pk_test_QPaEnpmtREKiQe4xInEDxMet003WsMGXnO');
  useEffect(() => {
    async function createPaymentIntent(amount) {
      try {
        const result = await fetch('http://localhost:8000/product/payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: amount,
          }),
        });
  
        if (!result.ok) {
          throw new Error('Failed to fetch');
        }
  
        const { clientSecret } = await result.json();
        setClientSecret(clientSecret);
      } catch (error) {
        console.error('Error fetching payment intent:', error);
      }
    };
     const Cents =amount*100
    createPaymentIntent(Cents);  }, []);

  return (
    <>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm  clientSecret={clientSecret} />

        </Elements>
      )}
    </>
  )
}

export default StripeContainer