import { collection, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore";
import { firestore } from "../firebase.config";

// Saving new Item
export const saveItem = async (data) => {
    await setDoc(doc(firestore, "orderDetails", `${Date.now()}`), data, {
        merge : true,
    });
};

// get order details
export const getOrderDetails = async () => {
    const details = await getDocs(
        query(collection(firestore, "orderDetails"), orderBy("id", "desc"))
    );

    return details.docs.map((doc) => doc.data());
};