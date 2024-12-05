import { useState } from 'react';
 

function Test() {
  const paymentHandler = async (event) => {
    const amount = 500; // Amount in paise (INR 5.00)
    const currency = 'INR';
    const receiptId = '1234567890';

    // Step 1: Create order in your server
    const response = await fetch('http://localhost:5000/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId,
      }),
    });
    
    const order = await response.json();
    console.log('order', order);

    // Step 2: Define Razorpay options
    var options = {
      key: "rzp_live_MNtsizg64GZhSH", // Replace with your Razorpay key
      amount: amount, // Amount in paise
      currency: currency,
      name: "Web Codder",
      description: "Test Transaction",
      image: "https://i.ibb.co/5Y3m33n/test.png",
      order_id: order.id,
      handler: async function(response) {
        const body = { ...response };

        // Step 3: Validate payment with your server
        const validateResponse = await fetch('http://localhost:5000/validate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        const jsonResponse = await validateResponse.json();
        console.log('jsonResponse', jsonResponse);
      },
      prefill: {
        name: "Web Coder",
        email: "webcoder@example.com",
        contact: "9000000000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    // Step 4: Initialize Razorpay and handle payment
    const rzp1 = new window.Razorpay(options); // Ensure Razorpay script is loaded
    rzp1.on("payment.failed", function(response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    event.preventDefault();
  };

  return (
    <>
      <div className='product'>
        <h1>Razorpay Payment Gateway</h1>
        <button className='button' onClick={paymentHandler}>Pay Now</button>
      </div>
    </>
  );
}

export default Test;
