export const actionType = {
    SET_USER: 'SET_USER',
    SET_ORDER_DETAILS: 'SET_ORDER_DETAILS',
    ACCEPT_ORDER: 'ACCEPT_ORDER',
    DECLINE_ORDER: 'DECLINE_ORDER',
}

const reducer = (state, action) => {
    console.log(action);

    switch(action.type) {
        case actionType.SET_USER:
            return {
                ...state,
                user: action.user,
            };

        case actionType.SET_ORDER_DETAILS:
            return {
                ...state,
                newOrders: action.orderDetails,
            };

        case actionType.ACCEPT_ORDER:
            const acceptedOrder = state.newOrders.find(order => order.id === action.payload);
            return {
                ...state,
                newOrders: state.newOrders.filter(order => order.id !== action.payload),
                activeOrders: [...state.activeOrders, acceptedOrder],
            };

        case actionType.DECLINE_ORDER:
            return {
                ...state,
                newOrders: state.newOrders.filter(order => order.id !== action.payload),
            };

        default:
            return state;
    }
};

export default reducer;
