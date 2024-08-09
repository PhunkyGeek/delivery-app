import React, { useRef, useState } from "react";
import HomeContainer from "./HomeContainer";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";
import { categories } from "../utils/data";
import OrderDetailsPopup from "./orderDetailsPopup"; // Fix case here if needed

const MainContainer = () => {
  const [{ newOrders, activeOrders }, dispatch] = useStateValue();
  const newOrdersScrollRef = useRef(null); // Separate ref for New Orders
  const activeOrdersScrollRef = useRef(null); // Separate ref for Active Orders
  const [selectedOrder, setSelectedOrder] = useState(null); // State for selected order
  const [isPopupVisible, setIsPopupVisible] = useState(false); // State for popup visibility

  const scrollLeft = (ref) => {
    ref.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = (ref) => {
    ref.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const handleCardClick = (order) => {
    setSelectedOrder(order);
    setIsPopupVisible(true);
  };

  const handleAcceptOrder = (orderId) => {
    dispatch({
      type: "ACCEPT_ORDER",
      payload: orderId,
    });
    setIsPopupVisible(false);
  };

  const handleDeclineOrder = (orderId) => {
    dispatch({
      type: "DECLINE_ORDER",
      payload: orderId,
    });
    setIsPopupVisible(false);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />

      {/* New Orders Section */}
      <section className="w-full my-6">
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold capitalize text-headingColor relative
          before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:top-8
          before:left-0 before:bg-gradient-to-tr from-yellow-400 to-yellow-600 transition-all
          ease-in-out duration-100">
            New Orders
          </p>

          <div className="hidden md:flex gap-3 items-center">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-yellow-300 hover:bg-yellow-500 cursor-pointer 
              transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
              onClick={() => scrollLeft(newOrdersScrollRef)} // Use newOrdersScrollRef
            >
              <MdChevronLeft className="text-lg text-black" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-yellow-300 hover:bg-yellow-500 cursor-pointer 
              transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
              onClick={() => scrollRight(newOrdersScrollRef)} // Use newOrdersScrollRef
            >
              <MdChevronRight className="text-lg text-black" />
            </motion.div>
          </div>
        </div>

        <div ref={newOrdersScrollRef} className="flex overflow-x-scroll scrollbar-hide">
          <div className="flex flex-row gap-4">
            {newOrders && newOrders.length > 0 ? (
              newOrders.map((order) => {
                const category = categories.find(
                  (cat) => cat.urlParamName === order.category
                );
                return (
                  <RowContainer
                    key={order.id}
                    flag={true}
                    category={category.name}
                    distance={order.distance}
                    imgSrc={category.imgSrc}
                    order={order}
                    onCardClick={() => handleCardClick(order)} // Pass the handler
                  />
                );
              })
            ) : (
              <p>No orders available</p>
            )}
          </div>
        </div>
      </section>

      {/* Active Orders Section */}
      <section className="w-full my-6">
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold capitalize text-headingColor relative
          before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:top-8
          before:left-0 before:bg-gradient-to-tr from-yellow-400 to-yellow-600 transition-all
          ease-in-out duration-100">
            Active Orders
          </p>

          <div className="hidden md:flex gap-3 items-center">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-yellow-300 hover:bg-yellow-500 cursor-pointer 
              transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
              onClick={() => scrollLeft(activeOrdersScrollRef)} // Use activeOrdersScrollRef
            >
              <MdChevronLeft className="text-lg text-black" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-yellow-300 hover:bg-yellow-500 cursor-pointer 
              transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
              onClick={() => scrollRight(activeOrdersScrollRef)} // Use activeOrdersScrollRef
            >
              <MdChevronRight className="text-lg text-black" />
            </motion.div>
          </div>
        </div>

        <div ref={activeOrdersScrollRef} className="flex overflow-x-scroll scrollbar-hide">
          <div className="flex flex-row gap-4">
            {activeOrders && activeOrders.length > 0 ? (
              activeOrders.map((order) => {
                const category = categories.find(
                  (cat) => cat.urlParamName === order.category
                );
                return (
                  <RowContainer
                    key={order.id}
                    flag={true}
                    category={category.name}
                    distance={order.distance}
                    imgSrc={category.imgSrc}
                    order={order}
                    onCardClick={() => handleCardClick(order)} // Pass the handler
                  />
                );
              })
            ) : (
              <p>No active orders available</p>
            )}
          </div>
        </div>
      </section>

      {isPopupVisible && (
        <OrderDetailsPopup
          order={selectedOrder}
          onClose={handleClosePopup}
          onAccept={handleAcceptOrder}
          onDecline={handleDeclineOrder}
        />
      )}
    </div>
  );
};

export default MainContainer;
