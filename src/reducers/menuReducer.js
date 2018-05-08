import { menuConstants } from '../constants/menuConstants'
import { menuActions } from '../actions/menuActions'

let order = JSON.parse(localStorage.getItem('order'));
const initialState = order ? order : {}

export function order(state = initialState, action) {
  switch(action.type) {
    case menuConstants.ORDER_DISH :
      return {
        ...state,
        [id]: action.quantity
      }
  }
}
