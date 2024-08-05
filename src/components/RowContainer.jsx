import React from "react";
import { MdOutlineDeliveryDining, MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import Groupie from "../img/groupie.png"

const RowContainer = ({ flag }) => {
  return (
  <div className={`w-full my-12 ${flag ? "overflow-x-scroll" : "overflow-x-hidden"}`}>
    <div className="w-300 md:w-340 h-auto bg-cardOverlay rounded-lg p-2 
    my-12 backdrop-blur-lg hover:drop-shadow-lg">
        <div className="w-full flex items-center justify-between">
            <motion.img 
            whileHover={{ scale : 1.2}}
            src={Groupie} alt="" 
            className="w-40 -mt-8 drop-shadow-2xl"/>
            <motion.div
            whileTap={{ scale : 0.75 }} 
            className="w-8 h-8 rounded-full bg-red-600 flex items-center
            justify-center cursor-pointer hover:shadow-md">
                <MdOutlineDeliveryDining className="text-white text-xl"/>
            </motion.div>
        </div>

        <div className="w-full flex flex-col items-end justify-end">
            <p className="text-textColor font-semibold text-base md:text-lg">
                Fresh Food Delivery
            </p>
            <p className="mt-1 text-lg text-gray-500">
                18 <span className="text-sm text-red-500">km</span>
            </p>
        </div>
    </div>
  </div>
  );
};

export default RowContainer;
