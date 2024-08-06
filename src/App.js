import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CreateContainer, Header, MainContainer, PriceEstimate } from "./components";
import { useStateValue } from "./context/StateProvider";
import { getOrderDetails } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";

const App = () => {
  const [{ orderDetails }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getOrderDetails().then((data) => {
      dispatch({
        type : actionType.SET_ORDER_DETAILS,
        orderDetails : data,
      })
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AnimatePresence mode="wait">
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header/>

        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
            <Routes>
                <Route path="/*" element={<MainContainer/>} />
                <Route path="/createItem" element={<CreateContainer/>} />
                <Route path="/price-estimate" element={<PriceEstimate/>} />
            </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;