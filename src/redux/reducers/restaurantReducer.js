const initialState = {
    allOrders: [],
    getallOrdersError: null,
}

const restaurantReducer = (state = initialState, action) =>
{
    switch (action.type) {
        case "GET_ALL_ORDERS_SUCCESS":
            return({
                ...state,
                allOrders: action.allOrders,
                getallOrdersError: action.getallOrdersError,
            })
        case "GET_ALL_ORDERS_SUCCESS":
            return({
                ...state,
                allOrders: [],
                getallOrdersError: action.getallOrdersError,
            })
        
        default:
            return state;
    }
}

export default restaurantReducer;