import { orderConstants } from '../constants/orderConstants'


export function orders(state = {requestingOrders: true}, action){
  switch(action.type) {
    case orderConstants.POST_ORDER_REQUEST :
      return {
        requesting: true
      }
    case orderConstants.POST_ORDER_SUCCESS :
      return {
        ...state,
        requesting: false,
        orders: action.order
      }
    case orderConstants.POST_ORDER_FAILURE :
      return {}
    case orderConstants.GET_ORDERS_PER_TABLE_REQUEST || orderConstants.CHANGE_ORDER_ITEM_STATUS_REQUEST:
      return {
        requesting: action.requesting
      }
    case orderConstants.GET_ORDERS_PER_TABLE_SUCCESS:
      return {
        ...state,
        requesting: false,
        ordersPerTable: action.ordersPerTable
      }
    case orderConstants.CHANGE_ORDER_ITEM_STATUS_SUCCESS:
      var index = state.ordersPerTable[action.table].orders.map((o) => {return o._id}).indexOf(action.order._id);
      var newState = [].concat(state.ordersPerTable);
      newState[action.table].orders[index] = action.order
      return {
        ...state,
        requesting: false,
        ordersPerTable: newState
      }
    case orderConstants.GET_ORDERS_PER_TABLE_FAILURE || orderConstants.CHANGE_ORDER_ITEM_STATUS_FAILURE:
      return {}  
    default :
      return state;
  }
}

export function billCustomer(state = {}, action) {
  switch(action.type) {
    case orderConstants.GET_BILL_PER_CUSTOMER_REQUEST:
      return {
        requesting: action.requesting
      }
    case orderConstants.GET_BILL_PER_CUSTOMER_SUCCESS:
      return {
        ...state,
        requesting: false,
        bill: action.ordersPerTable
      }
    case orderConstants.GET_BILL_PER_CUSTOMER_FAILURE:
      return {}
    default:
      return state;
  }
}
