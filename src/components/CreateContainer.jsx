import React, { useState } from "react";
import { motion } from "framer-motion";

import {
  MdOutlinePermIdentity,
  MdOutlinePhoneIphone,
  MdLocationPin,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdPayment,
  MdPayments,
  MdContactPhone,
  MdContactEmergency,
} from "react-icons/md";
import { categories } from "../utils/data";
import Loader from "./Loader";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase.config";
import { getOrderDetails, saveItem } from "../utils/firebaseFunctions";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const CreateContainer = () => {
  const [customerName, setCustomerName] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientNumber, setRecipientNumber] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [{ orderDetails }, dispatch] = useStateValue();

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg("Error while uploading : Try Again 🤦‍♂️");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
          setIsLoading(false);
          setFields(true);
          setMsg("Image uploaded successfully 😎");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMsg("Image deleted successfully 👌");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };

  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (
        !customerName ||
        !customerNumber ||
        !customerAddress ||
        !category ||
        !imageAsset ||
        recipientName ||
        recipientNumber ||
        recipientAddress
      ) {
        setFields(true);
        setMsg("Required fields can't be empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          name: customerName,
          number: customerNumber,
          address: customerAddress,
          category: category,
          rname: customerName,
          rnumber: customerNumber,
          raddress: customerAddress,
          imageURL: imageAsset,
        };
        saveItem(data);
        setIsLoading(false);
        setFields(true);
        setMsg("Data submitted successfully 😊");
        clearData();
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading : Try Again 🤦‍♂️");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }

    fetchData();
  };

  const clearData = () => {
    setCustomerName("");
    setCustomerNumber("");
    setCustomerAddress("");
    setImageAsset(null);
    setCategory("Select Category");
    setRecipientName("");
    setRecipientNumber("");
    setRecipientAddress("");
  };

  const fetchData = async () => {
    await getOrderDetails().then((data) => {
      dispatch({
        type : actionType.SET_ORDER_DETAILS,
        orderDetails : data,
      })
    });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div
        className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col
      items-center justify-center gap-4"
      >
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}

        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdOutlinePermIdentity className="text-3xl text-gray-700" />
          <input
            type="text"
            required
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Customer Name"
            className="w-full h-full text-lg bg-transparent
            outline-none border-none placeholder:text-gray-400
            text-textColor"
          />
        </div>
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdOutlinePhoneIphone className="text-3xl text-gray-700" />
          <input
            type="text"
            required
            value={customerNumber}
            onChange={(e) => setCustomerNumber(e.target.value)}
            placeholder="Customer Number"
            className="w-full h-full text-lg bg-transparent
            outline-none border-none placeholder:text-gray-400
            text-textColor"
          />
        </div>
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdLocationPin className="text-3xl text-gray-700" />
          <input
            type="text"
            required
            value={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
            placeholder="Pick-up Address"
            className="w-full h-full text-lg bg-transparent
            outline-none border-none placeholder:text-gray-400
            text-textColor"
          />
        </div>

        <div className="w-full">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none w-full text-base border-b-2
            border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="other" className="bg-white">
              Select Category
            </option>
            {categories &&
              categories.map((item) => (
                <option
                  key={item.id}
                  className="text-base border-0 outline-none capitalize
              bg-white text-headingColor"
                  value={item.urlParamName}
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>

        <div
          className="group flex justify-center items-center flex-col
        border-2 border-dotted border-gray-300 w-full h-225 md:h-420
        cursor-pointer rounded-lg"
        >
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label
                    className="w-full h-full flex flex-col items-center
              justify-center cursor-pointer"
                  >
                    <div
                      className="w-full h-full flex flex-col items-center
                justify-center gap-1"
                    >
                      <MdCloudUpload
                        className="text-gray-500 text-3xl 
                  hover:text-gray-700"
                      />
                      <p className="text-gray-500 hover:text-gray-700">
                        Click here to Upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept="immage/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt="uploaded file"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 
                    right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none 
                    hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdContactEmergency className="text-3xl text-gray-700" />
          <input
            type="text"
            required
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            placeholder="Recipient Name"
            className="w-full h-full text-lg bg-transparent
            outline-none border-none placeholder:text-gray-400
            text-textColor"
          />
        </div>
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdContactPhone className="text-3xl text-gray-700" />
          <input
            type="text"
            required
            value={recipientNumber}
            onChange={(e) => setRecipientNumber(e.target.value)}
            placeholder="Recipient Number"
            className="w-full h-full text-lg bg-transparent
            outline-none border-none placeholder:text-gray-400
            text-textColor"
          />
        </div>
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdLocationPin className="text-3xl text-gray-700" />
          <input
            type="text"
            required
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            placeholder="Drop-off Address"
            className="w-full h-full text-lg bg-transparent
            outline-none border-none placeholder:text-gray-400
            text-textColor"
          />
        </div>

        <div className="flex items-center w-full">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto
          border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg
          text-lg text-white font-semibold"
            onClick={saveDetails}
          >
            Get Order Estimate
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
