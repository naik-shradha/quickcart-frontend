import React, { useEffect, useRef, useState } from "react";
import axios from "../utils/axiosConfig";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const SuccessPage = () => {
  const [latestOrder, setLatestOrder] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const receiptRef = useRef();

  useEffect(() => {
    const fetchLatestOrder = async () => {
      try {
        const res = await axios.get("/orders/my-orders");
        const orders = res.data;

        const sorted = orders.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setLatestOrder(sorted[0]);
      } catch (error) {
        console.error("Failed to fetch order", error);
      }
    };

    fetchLatestOrder();
  }, []);

  const downloadPDF = async () => {
    const receipt = receiptRef.current;
    const canvas = await html2canvas(receipt);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("QuickCart_Receipt.pdf");
  };

  if (!latestOrder)
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-800 dark:text-gray-200">
        Loading receipt...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-800 dark:text-gray-200">
      <div className="max-w-2xl w-full p-6 bg-white dark:bg-gray-800 shadow rounded">
        <div ref={receiptRef} className="text-sm">
          <h2 className="text-2xl font-bold mb-4 text-center">
            🧾 Payment Receipt
          </h2>
          <p className="mb-1 text-gray-700 dark:text-gray-300">
            Order ID: {latestOrder._id}
          </p>
          <p className="mb-1 text-gray-700 dark:text-gray-300">
            Date: {new Date(latestOrder.createdAt).toLocaleString()}
          </p>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Customer: {user?.email}
          </p>

          <table className="w-full mb-4 border text-left dark:border-gray-600">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="p-2">Product</th>
                <th className="p-2 text-right">Qty</th>
                <th className="p-2 text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {latestOrder.items.map((item, index) => (
                <tr key={index} className="dark:border-gray-600">
                  <td className="p-2">{item.productId?.name}</td>
                  <td className="p-2 text-right">{item.quantity}</td>
                  <td className="p-2 text-right">₹{item.productId?.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-right font-semibold text-lg">
            Total: ₹{latestOrder.totalPrice}
          </div>
        </div>

        <button
          onClick={downloadPDF}
          className="mt-6 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
        >
          Download PDF Receipt
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
