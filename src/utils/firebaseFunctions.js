import { collection, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore";
import { firestore } from "../firebase.config";
import { getDatabase, ref, remove } from "firebase/database";

// Saving new Item
export const saveItem = async (data) => {
    await setDoc(doc(firestore, "orderDetails", `${Date.now()}`), data, {
        merge : true,
    });
};

// export const deleteItem = async (itemId) => {
//   const db = getDatabase();
//   const itemRef = ref(db, "orderDetails" + itemId);
//   await remove(itemRef);
// };

export const deleteItem = async (itemId) => {
    const db = getDatabase();
    const itemRef = ref(db, `orderDetails/${itemId}`);
    await remove(itemRef);
  };
  


// get order details
export const getOrderDetails = async () => {
    const details = await getDocs(
        query(collection(firestore, "orderDetails"), orderBy("id", "desc"))
    );

    return details.docs.map((doc) => doc.data());
};