const initialState = {
    allOrders: [],
    getallOrdersError: null,
    setStatusError: null
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
        case "GET_ALL_ORDERS_ERROR":
            return({
                ...state,
                allOrders: [],
                getallOrdersError: action.getallOrdersError,
            })
        case "SET_STATUS_SUCCESS":
            return({
                ...state,
                setStatusError: null
            })   
        case "SET_STATUS_ERROR":
            return({
                ...state,
                setStatusError: action.setStatusError
            })     
        default:
            return state;
    }
}

export default restaurantReducer;