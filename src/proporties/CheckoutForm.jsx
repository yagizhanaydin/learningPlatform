import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);  // Hata durumunu kontrol etmek için

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe henüz yüklenmediyse işlem yapılmaz
    }

    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    // Stripe ödeme isteği gönderme
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message);  // Hata mesajını göster
      setLoading(false);
    } else {
      // Ödeme metodunu backend'e gönder
      try {
        const response = await fetch('/your-backend-endpoint', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
        });

        const paymentResult = await response.json();

        if (paymentResult.error) {
          setError(paymentResult.error);  // Backend'den gelen hatayı göster
        } else {
          // Ödeme başarılı
          console.log('Ödeme başarılı', paymentResult);
        }
      } catch (err) {
        setError('Bir hata oluştu. Lütfen tekrar deneyin.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {error && <div className="error">{error}</div>}  
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Yükleniyor...' : 'Ödeme Yap'}
      </button>
    </form>
  );
}

export default CheckoutForm;
