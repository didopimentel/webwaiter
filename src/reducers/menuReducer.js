import { menuConstants } from '../constants/menuConstants'

let order = localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : [];
const initialState = order

export function order(state = initialState, action) {
  switch(action.type) {
    case menuConstants.ORDER_DISH :
      return action.updatedOrders
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
