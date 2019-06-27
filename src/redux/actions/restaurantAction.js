import firebase from '../../config/firebase';


export const getAllOrders = () =>{
    let allOrders = []
    return(dispatch) =>{
        firebase.firestore().collection('orders')
        .onSnapshot((snapShot) =>{
            allOrders = [];
            snapShot.forEach(doc =>{
                allOrders.push({...doc.data(), id: doc.id})
            })
            dispatch({ type: "GET_ALL_ORDERS_SUCCESS", allOrders, getallOrdersError: null });
        }, (error =>{
            dispatch({ type: "GET_ALL_ORDERS_ERROR", getallOrdersError: error.message})
        })
        )
    }
}
