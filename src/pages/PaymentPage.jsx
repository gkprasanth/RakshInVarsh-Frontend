// src/components/PaymentPage.jsx
import React, { useState } from 'react';

const PaymentPage = () => {
  const [block, setBlock] = useState('');
  const [gate, setGate] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const handlePayment = async () => {
    try {
   
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage("Please login to proceed with payment.");
        return;
      }

      
      const response = await fetch('/api/payment/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ location: { block, gate }, amount: 10 }),  
      });

      const result = await response.json();
      if (response.ok) {
        setIsPaid(true);
        setMessage("Payment successful! OTP has been sent to your account.");
        console.log("OTP for simulation:", result.otp);  
      } else {
        setMessage(result.message || "Payment failed, try again.");
      }
    } catch (error) {
      setMessage("An error occurred during payment.");
      console.error(error);
    }
  };

  const handleOTPVerification = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage("Please login to verify OTP.");
        return;
      }

      const response = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ otp }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Umbrella unlocked successfully!");
      } else {
        setMessage(result.message || "OTP verification failed.");
      }
    } catch (error) {
      setMessage("An error occurred during OTP verification.");
      console.error(error);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Rent Your Umbrella</h2>
        
         
        {message && <div className="mb-4 text-center text-red-600">{message}</div>}
        
         
        <label className="block text-gray-700">Select Block</label>
        <select value={block} onChange={(e) => setBlock(e.target.value)} className="w-full mb-4 p-2 border rounded">
          <option value="">Select...</option>
          <option value="block_1">Block 1</option>
          <option value="block_2">Block 2</option>
          <option value="bus_ground">Bus Ground</option>
        </select>

         
        <label className="block text-gray-700">Select Gate</label>
        <select value={gate} onChange={(e) => setGate(e.target.value)} className="w-full mb-4 p-2 border rounded">
          <option value="">Select...</option>
          <option value="gate_1">Gate 1</option>
          <option value="gate_2">Gate 2</option>
        </select>

         
        {!isPaid ? (
          <button onClick={handlePayment} className="w-full bg-purple-600 text-white py-2 rounded mt-4">
            Pay & Get OTP
          </button>
        ) : (
          <div>
            {/* OTP Input */}
            <label className="block text-gray-700">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
              placeholder="Enter the OTP"
            />
            {/* OTP Verification Button */}
            <button onClick={handleOTPVerification} className="w-full bg-green-600 text-white py-2 rounded mt-4">
              Verify OTP to Unlock Umbrella
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
