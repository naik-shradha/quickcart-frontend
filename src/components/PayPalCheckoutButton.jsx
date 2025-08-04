import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";

const PayPalCheckoutButton = ({ total }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Create PayPal order on server
  const createOrder = async () => {
    try {
      console.log("Sending total to PayPal API:", total);
      const res = await axios.post("/orders/create-paypal-order", { total });
      return res.data.id; // PayPal Order ID
    } catch (err) {
      console.error("❌ Error creating PayPal order:", err);
      toast.error("Error creating PayPal order");
    }
  };

  // Capture payment and handle response
  const captureOrder = async (orderID) => {
    try {
      setLoading(true);
      const res = await axios.post("/orders/capture-paypal-order", { orderID });

      if (res.data.status === "COMPLETED") {
        await axios.post("/orders/create");
        toast.success("Payment successful!");
        navigate("/orders/success");
      } else {
        toast.warn("⚠️ Payment not completed: " + res.data.status);
      }
    } catch (err) {
      console.error("❌ Error capturing PayPal order:", err);
      toast.error("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="flex justify-center my-4">
          <TailSpin height={40} width={40} color="#0ea5e9" />
        </div>
      )}

      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={() => createOrder()}
        onApprove={(data, actions) => {
          console.log("✅ onApprove called");
          console.log("📦 Approved orderID:", data.orderID);
          return captureOrder(data.orderID);
        }}
        onError={(err) => {
          console.error("❌ PayPal error:", err);
          toast.error("Something went wrong during PayPal payment");
        }}
      />
    </>
  );
};

export default PayPalCheckoutButton;
