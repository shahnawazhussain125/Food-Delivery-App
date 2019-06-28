import firebase from '../../config/firebase';


export const getAllOrders = (uid) =>{

    let allOrders = []
    return(dispatch) =>{
        firebase.firestore().collection('orders').where("restaurantId", "==", uid)
        .onSnapshot((snapShot) =>{
            allOrders = [];
            snapShot.forEach(doc =>{
                allOrders.push({
                    ...doc.data(), 
                    id: doc.id
                })
            })
            dispatch({ 
                type: "GET_ALL_ORDERS_SUCCESS", 
                allOrders, 
                getallOrdersError: null 
            });
        }, (error =>{
            dispatch({ 
                type: "GET_ALL_ORDERS_ERROR", 
                getallOrdersError: error.message
            })
        }))
    }
}

export const handleOrderStatus = (data) =>{
    return(dispatch) =>{
        firebase.firestore().collection('orders').doc(data.id).update({
            status: data.status
        })
        .then(() =>{
            dispatch({ 
                type: "SET_STATUS_SUCCESS" 
            });
        })
        .catch((error) =>{
            dispatch({ 
                type: "SET_STATUS_ERROR", 
                setStatusError: error.message
            })
        })
    }
}