import React from "react";

const OrderDetailsPopup = ({ order, onClose, onAccept, onDecline }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
        <p><strong>Customer Name:</strong> {order.name}</p>
        <p><strong>Customer Number:</strong> {order.number}</p>
        <p><strong>Customer Address:</strong> {order.address}</p>
        <p><strong>Recipient Name:</strong> {order.rname}</p>
        <p><strong>Recipient Number:</strong> {order.rnumber}</p>
        <p><strong>Recipient Address:</strong> {order.raddress}</p>
        <p><strong>Price:</strong> ${order.price}</p>

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onDecline}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Decline
          </button>
          <button
            onClick={onAccept}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Accept
          </button>
        </div>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default OrderDetailsPopup;
