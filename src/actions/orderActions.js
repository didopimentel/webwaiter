import { orderConstants } from '../constants/orderConstants'
import { orderService } from '../services/orderService'
import { alertActions } from './alertActions';

export const orderActions = {
  orderItems,
  getOrdersPerTable,
  getBillPerCustomer
}


function orderItems(order, table) {
  return dispatch => {
    dispatch(request())
    orderService.orderItems(order, table)
      .then(
        response => {
          dispatch(success(response))
        },
        error => {
          dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }

    function request() {
      return {
        type: orderConstants.POST_ORDER_REQUEST,
        requesting: true
      }
    }
    function success(orderID) {
      return {
        type: orderConstants.POST_ORDER_SUCCESS,
        orderID
      }
    }
    function failure(error) {
      return {
        type: orderConstants.POST_ORDER_FAILURE,
        error
      }
    }

}

function getOrdersPerTable() {
  return dispatch => {
    dispatch(request())
    orderService.getOrdersPerTable()
      .then(
        response => {
          dispatch(success(response))
        },
        error => {
          dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }

    function request() {
      return {
        type: orderConstants.GET_ORDERS_PER_TABLE_REQUEST,
        requesting: true
      }
    }
    function success(orders) {
      return {
        type: orderConstants.GET_ORDERS_PER_TABLE_SUCCESS,
        ordersPerTable: orders
      }
    }
    function failure(error) {
      return {
        type: orderConstants.GET_ORDERS_PER_TABLE_FAILURE,
        error
      }
    }

}

function getBillPerCustomer() {
  return dispatch => {
    dispatch(request())
    orderService.getBillPerCustomer()
      .then(
        response => {
          dispatch(success(response))
        },
        error => {
          dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }

    function request() {
      return {
        type: orderConstants.GET_BILL_PER_CUSTOMER_REQUEST,
        requesting: true
      }
    }
    function success(orders) {
      return {
        type: orderConstants.GET_BILL_PER_CUSTOMER_SUCCESS,
        ordersPerTable: orders
      }
    }
    function failure(error) {
      return {
        type: orderConstants.GET_BILL_PER_CUSTOMER_FAILURE,
        error
      }
    }

}
