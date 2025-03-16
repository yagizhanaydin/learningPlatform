import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe('pk_test_51QZgQeBtUnrbayJQG2gcNUE7PYrBTRoNX0zSAD1DPbM9yFWyAh0u0uOAtNpvtpFwBV4EnQna3PSHr7YnQUWQF8O200EMTKiIX3'); 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Elements stripe={stripePromise}>
      <App /> 
    </Elements>
  </StrictMode>
);
