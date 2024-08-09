import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { deleteItem } from "../utils/firebaseFunctions";

const PriceEstimate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { estimatedPrice, distance, orderId } = location.state || {};

  const handleProceed = () => {
    navigate("/driversearch");
  };

  const handleCancel = async () => {
    if (!orderId) {
      console.error("Order ID is missing.");
      // Optionally, show a message to the user indicating that the order ID is not found.
      return;
    }
  
    try {
      await deleteItem(orderId);
      navigate("/createitem");
    } catch (error) {
      console.error("Error deleting item:", error);
      // Handle the error, e.g., show a message to the user
      alert("There was an error cancelling the order. Please try again.");
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Price Estimate</h2>
      <p className="text-lg mb-2">Estimated Price: ${estimatedPrice}</p>
      <p className="text-lg mb-4">Distance: {distance} km</p>
      <div className="flex space-x-4">
        <button
          type="button"
          className="bg-gray-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="bg-gradient-to-br from-yellow-400 to-yellow-500 w-full
          md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out
          duration-100"
          onClick={handleProceed}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default PriceEstimate;
