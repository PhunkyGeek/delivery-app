import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PriceEstimate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { estimatedPrice, distance } = location.state || {};

  const handleProceed = () => {
    // Implement order creation logic here
    navigate("/");
  };

  const handleCancel = () => {
    // Navigate back to the Create Order page
    navigate("/createitem");
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
