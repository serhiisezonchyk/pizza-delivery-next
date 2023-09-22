'use client';
import React from 'react';
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '@/components/checkout-form/CheckoutForm';
import {Elements} from '@stripe/react-stripe-js'
import './PaymentPage.scss';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const PaymentPage = ({ params }: { params: { id: string } }) => {
  const [clientSecret, setClientSecret] = React.useState('');
  const { id } = params;
  React.useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/create-intent/${id}`,
          {
            method: 'POST',
          }
        );
        const data = await res.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
  }, [id]);
  const options: StripeElementsOptions={
    clientSecret,
    appearance:{
      theme:'flat'
    }
  }
  return (
    <div className='payment-page'>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default PaymentPage;
