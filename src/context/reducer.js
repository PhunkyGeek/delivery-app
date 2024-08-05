export const actionType = {
    SET_USER : 'SET_USER',
    SET_ORDER_DETAILS : 'SET_ORDER_DETAILS',
}

const reducer = (state, action) => {
    console.log(action);

    switch(action.type){
        case actionType.SET_USER:
            return {
                ...state,
                user: action.user,
            };

        case actionType.SET_ORDER_DETAILS:
            return {
                ...state,
                orderDetails: action.orderDetails,
            };

        default:
            return state;
    }
};

export default reducer;