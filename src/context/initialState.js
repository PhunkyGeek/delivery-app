import { fetchUser } from "../utils/fetchLocalStorageData";

const userInfo = fetchUser()

export const initialState = {
    user: userInfo,
    orderDetails: null,
};