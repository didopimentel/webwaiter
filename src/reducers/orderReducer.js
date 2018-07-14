import { orderConstants } from '../constants/orderConstants'
import { orderActions } from '../actions/orderActions'


export function orders(state = {requestingOrders: true}, action){
  switch(action.type) {
    case orderConstants.POST_ORDER_REQUEST :
      return {
        requesting: action.requesting
      }
    case orderConstants.POST_ORDER_SUCCESS :
      return {
        ...state,
        requesting: false,
        orders: action.order
      }
    case orderConstants.POST_ORDER_FAILURE :
      return {}
    case orderConstants.GET_ORDERS_PER_TABLE_REQUEST:
      return {
        requestingOrders: action.requesting
      }
    case orderConstants.GET_ORDERS_PER_TABLE_SUCCESS:
      return {
        ...state,
        requestingOrders: false,
        ordersPerTable: action.ordersPerTable
      }
    case orderConstants.GET_ORDERS_PER_TABLE_FAILURE:
      return {}
    default :
      return state;
  }
}
