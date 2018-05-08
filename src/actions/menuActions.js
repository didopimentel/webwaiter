import { menuConstants } from '../constants/menuConstants'

function requestDish(id, quantity) {
  return {
    type: menuConstants.ORDER_DISH,
    id,
    quantity
  }
}
