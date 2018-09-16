import { menuConstants } from '../constants/menuConstants'

let order = JSON.parse(localStorage.getItem('order'));
const initialState = order ? order : []

export function order(state = initialState, action) {
  switch(action.type) {
    case menuConstants.ORDER_DISH :
      return (state.length > 0 ) ? state.map((order) => {
        if (order.item_id !== action.id) {
          return order
        }
        return {
          ...order,
          options: action.options,
          quantity: action.quantity,
        }
      })
      : [
        ...state,
        {
          item_id: action.id,
          options: action.options,
          quantity: action.quantity
        }
      ]
    default :
      return state;
  }
}

let menu = JSON.parse(localStorage.getItem('menu'));
const initialStateMenu = menu ? {dishes: menu} : {}

export function dishes(state = initialStateMenu, action){
  switch(action.type) {
    case menuConstants.GET_ALL_DISHES_REQUEST :
      return {
        requesting: action.requesting
      }
    case menuConstants.GET_ALL_DISHES_SUCCESS :
      return {
        requesting: false,
        dishes: action.dishes
      }
    case menuConstants.GET_ALL_DISHES_FAILURE :
      return {}
    default :
      return state;
  }
}

let cats = JSON.parse(localStorage.getItem('categories'));
const initialStateCategories = cats ? {categories: cats} : {}

export function categories(state = initialStateCategories, action){
  switch(action.type) {
    case menuConstants.GET_ALL_CATEGORIES_REQUEST :
      return {
        ...state,
        requesting: true
      }
    case menuConstants.GET_ALL_CATEGORIES_SUCCESS :
      return {
        ...state,
        requesting: false,
        categories: action.categories
      }
    case menuConstants.GET_ALL_CATEGORIES_FAILURE :
      return {}
    default :
      return state;
  }
}
