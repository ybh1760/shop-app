import Order from "../../models/order";

export const ADD_ORDERS = "ADD_ORDERS";
export const SET_ORDERS = "SET_ORDERS";

export const setOrders = ()=>{
  return async (dispatch,getState)=>{
    const userId = getState().auth.userId;
    const response = await fetch(`https://rn-shop-b1f3b.firebaseio.com/orders/${userId}.json`, {method:"GET"})
    const resData = await response.json();

    const updatedOrders = [];
    for(const key in resData){
      updatedOrders.push(new Order(key,resData[key].item, resData[key].amount, resData[key].date))
    }
    dispatch({
      type: SET_ORDERS,
      orders :updatedOrders
    })
  }
}


export const addOrders = (item, amount) => {
  return  async (dispatch,getState) =>{
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    const date = new Date();
    const response = await fetch(
      `https://rn-shop-b1f3b.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({
        item,
        amount,
        date : date.toISOString()
      })
    }
    )
    const resData = await response.json();
    dispatch({ type: ADD_ORDERS, orderData: {id:resData.name, item: item, totalAmount: amount, date:date} })
  }
};
