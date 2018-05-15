import { menuConstants } from '../constants/menuConstants'

function requestDish(id, quantity) {
  let currentOrders = JSON.parse(localStorage.getItem('order'))
  let orders
  if (currentOrders) {
    orders = Object.assign({}, currentOrders, {[id]: quantity})
  }
  else {
    orders = Object.assign({}, {[id]: quantity})
  }
  localStorage.setItem('order', JSON.stringify(orders))
  return {
    type: menuConstants.ORDER_DISH,
    id,
    quantity
  }
}

export default requestDish
