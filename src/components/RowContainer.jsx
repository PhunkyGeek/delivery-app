import React, { useState } from "react";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { motion } from "framer-motion";
import OrderDetailsPopup from "./orderDetailsPopup";
import { useStateValue } from "../context/StateProvider";  // Import useStateValue
import { actionType } from "../context/reducer";  // Import actionType


const RowContainer = ({ flag, category, distance, imgSrc, order }) => {
    const [{}, dispatch] = useStateValue();  // Access dispatch from the state context
    const [showPopup, setShowPopup] = useState(false);
  
    const handleAccept = () => {
      dispatch({
        type: actionType.ACCEPT_ORDER,  // Use actionType for the action type
        payload: order.id,
      });
      setShowPopup(false);
    };
  
    const handleDecline = () => {
      dispatch({
        type: actionType.DECLINE_ORDER,  // Use actionType for the action type
        payload: order.id,
      });
      setShowPopup(false);
    };
  
    return (
      <div className={`w-full my-12 ${flag ? "flex" : "flex"}`}>
        <div
          className="w-300 md:w-340 h-auto bg-cardOverlay rounded-lg p-2 
          my-12 backdrop-blur-lg hover:drop-shadow-lg cursor-pointer"
          onClick={() => setShowPopup(true)}
        >
          <div className="w-full flex items-center justify-between">
            <motion.img 
              whileHover={{ scale: 1.2 }}
              src={imgSrc} alt="" 
              className="w-40 -mt-8 drop-shadow-2xl"
            />
            <motion.div
              whileTap={{ scale: 0.75 }} 
              className="w-8 h-8 rounded-full bg-red-600 flex items-center
              justify-center cursor-pointer hover:shadow-md"
              onClick={() => setShowPopup(true)}
            >
              <MdOutlineDeliveryDining className="text-white text-xl" />
            </motion.div>
          </div>
  
          <div className="w-full flex flex-col items-end justify-end">
            <p className="text-textColor font-semibold text-base md:text-lg">
              {category} Delivery
            </p>
            <p className="mt-1 text-lg text-gray-500">
              {distance} <span className="text-sm text-red-500">km</span>
            </p>
          </div>
        </div>
  
        {showPopup && (
          <OrderDetailsPopup
            order={order}
            onClose={() => setShowPopup(false)}
            onAccept={handleAccept}
            onDecline={handleDecline}
          />
        )}
      </div>
    );
  };
  
  export default RowContainer;
  