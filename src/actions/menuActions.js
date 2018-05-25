import { menuConstants } from '../constants/menuConstants'
import { menuService } from '../services/menuService'
import { alertActions } from './alertActions';

export const menuActions = {
  requestDish,
  getAllDishes,
  getAllCategories
}

function requestDish(id, quantity) {
  let currentOrders = JSON.parse(localStorage.getItem('order'))
  if (currentOrders) {
    if (currentOrders[id]) {
      currentOrders[id] = quantity
    } else {
      currentOrders = Object.assign({}, currentOrders, {[id]: quantity})
    }
  }
  else {
    currentOrders = {[id]: quantity}
  }
  localStorage.setItem('order', JSON.stringify(currentOrders))
  return {
    type: menuConstants.ORDER_DISH,
    id,
    quantity
  }
}

function getAllDishes() {
  return dispatch => {
    dispatch(request())
    menuService.getAllDishes()
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
        type: menuConstants.GET_ALL_DISHES_REQUEST,
        requesting: true
      }
    }
    function success(dishes) {
      return {
        type: menuConstants.GET_ALL_DISHES_SUCCESS,
        dishes
      }
    }
    function failure(error) {
      return {
        type: menuConstants.GET_ALL_DISHES_FAILURE,
        error
      }
    }

}

function getAllCategories() {
  return dispatch => {
    dispatch(request())
    menuService.getAllCategories()
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
        type: menuConstants.GET_ALL_CATEGORIES_REQUEST,
        requesting: true
      }
    }
    function success(categories) {
      return {
        type: menuConstants.GET_ALL_CATEGORIES_SUCCESS,
        categories
      }
    }
    function failure(error) {
      return {
        type: menuConstants.GET_ALL_CATEGORIES_FAILURE,
        error
      }
    }

}
