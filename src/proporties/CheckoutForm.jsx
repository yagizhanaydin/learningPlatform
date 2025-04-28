import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';
import styles from '../assets/payment.module.css';

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const { totalAmount } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentMethodId: paymentMethod.id,
            amount: parseFloat(totalAmount * 100)
          }),
        });

        const paymentResult = await response.json();

        if (paymentResult.error) {
          setError(paymentResult.error);
        } else {
          localStorage.removeItem("cart");
          window.location.href = paymentResult.success_url;
        }
      } catch (err) {
        setError('Error. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };



  return (

    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.cardElementWrapper}>
        <CardElement />
      </div>
      <div className={styles.cardElementWrapper}>₺{totalAmount}</div>
      {error && <div className={styles.error}>{error}</div>}
      <button className={styles.submitButton} type="submit" disabled={!stripe || loading}>
        {loading ? 'Loading...' : 'Make Payment'}
      </button>
    </form>
  );
}

export default CheckoutForm;
