import { staffConstants } from '../constants/staffConstants'
import { staffService } from '../services/staffService'
import { alertActions } from './alertActions';

export const staffActions = {
  getAllTables,
  getAllOrders
}

function getAllTables() {
  return dispatch => {
    dispatch(request())
    staffService.getAllTables()
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
        type: staffConstants.GET_ALL_TABLES_REQUEST,
        requesting: true
      }
    }
    function success(tables) {
      return {
        type: staffConstants.GET_ALL_TABLES_SUCCESS,
        tables
      }
    }
    function failure(error) {
      return {
        type: staffConstants.GET_ALL_TABLES_FAILURE,
        error
      }
    }

  }

function getAllOrders() {
  return dispatch => {
    dispatch(request())
    staffService.getAllOrders()
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
        type: staffConstants.GET_ALL_ORDERS_REQUEST,
        requesting: true
      }
    }
    function success(orders) {
      return {
        type: staffConstants.GET_ALL_ORDERS_SUCCESS,
        orders
      }
    }
    function failure(error) {
      return {
        type: staffConstants.GET_ALL_ORDERS_FAILURE,
        error
      }
    }

}
