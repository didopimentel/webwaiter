import { menuConstants } from '../constants/menuConstants'
import { menuService } from '../services/menuService'
import { alertActions } from './alertActions';

export const menuActions = {
  requestDish,
  getAllDishes,
  getAllCategories
}

function requestDish(id, quantity, price, options) {
  let currentOrders = localStorage.getItem('order')
                        ? JSON.parse(localStorage.getItem('order'))
                        : []
  let checkUpdated = false
  const item_id = id
  var updatedOrders
  if (currentOrders.length > 0) {
    updatedOrders = currentOrders.map((item) => {
      if (item.item_id === item_id) {
        checkUpdated = true
        return {
          ...item,
          quantity,
          price,
          options
        }
      }
      else
        return { ...item }
    })
  }
  if (!checkUpdated) {
    const o = {
      item_id: item_id,
      quantity: quantity,
      price: price,
      options: options
    }
    currentOrders.push(o)
    updatedOrders = currentOrders
  }
  localStorage.setItem('order', JSON.stringify(updatedOrders))
  return {
    type: menuConstants.ORDER_DISH,
    updatedOrders
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
        requesting: false,
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
        requesting: false,
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
