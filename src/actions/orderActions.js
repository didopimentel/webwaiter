import { orderConstants } from '../constants/orderConstants'
import { orderService } from '../services/orderService'
import { alertActions } from './alertActions';

export const orderActions = {
  orderItems,
  getOrdersPerTable,
  getBillPerCustomer,
  changeOrderItemStatus,
}


function orderItems(order, table) {
  return dispatch => {
    dispatch(request())
    orderService.orderItems(order, table)
      .then(
        response => {
          dispatch(success(response));
          localStorage.removeItem('order');
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

function getOrdersPerTable(requester) {
  return dispatch => {
    dispatch(request())
    orderService.getOrdersPerTable(requester)
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

function changeOrderItemStatus(orderId, itemId, table, prevStatus, nextStatus) {
  return dispatch => {
    dispatch(request())
    orderService.changeOrderItemStatus(orderId, itemId, prevStatus, nextStatus)
      .then(
        response => {
          dispatch(success(response, table));
        },
        error => {
          dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }

    function request() {
      return {
        type: orderConstants.CHANGE_ORDER_ITEM_STATUS_REQUEST,
        requesting: true
      }
    }
    function success(order, table) {
      return {
        type: orderConstants.CHANGE_ORDER_ITEM_STATUS_SUCCESS,
        order: order,
        table: table
      }
    }
    function failure(error) {
      return {
        type: orderConstants.CHANGE_ORDER_ITEM_STATUS_FAILURE,
        error
      }
    }

}
