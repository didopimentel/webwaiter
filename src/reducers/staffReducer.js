import { staffConstants } from '../constants/staffConstants'
import { staffActions } from '../actions/staffActions'

export function orders(state = {}, action){
  switch(action.type) {
    case staffConstants.GET_ALL_ORDERS_REQUEST :
      return {
        ...state,
        requesting: action.requesting
      }
    case staffConstants.GET_ALL_ORDERS_SUCCESS :
      return {
        ...state,
        orders
      }
    case staffConstants.GET_ALL_ORDERS_FAILURE :
      return {}
    default :
      return state;
  }
}

export function tables(state = {}, action){
  switch(action.type) {
    case staffConstants.GET_ALL_TABLES_REQUEST :
      return {
        ...state,
        requesting: action.requesting
      }
    case staffConstants.GET_ALL_TABLES_SUCCESS :
      return {
        tables: action.tables
      }
    case staffConstants.GET_ALL_TABLES_FAILURE :
      return {}
    default :
      return state;
  }
}
