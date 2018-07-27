import { authHeader } from '../helpers/authHeader'
import axios from 'axios'
import { urls } from '../helpers/urls'

export const orderService = {
  orderItems,
  getOrdersPerTable,
  getBillPerCustomer
}

function orderItems(items, tableID) {
  const header = authHeader()
  var order = {}
  order["client_order"] = items
  order["table_id"] = tableID
  return axios({
    method: 'POST',
    url: urls.API + 'orders/staff-order',
    headers: header,
    data: order
  }).then( response => {
    return response.data
  })
   .catch( error => {
     return Promise.reject(error)
   })
}

function getBillPerCustomer() {
  const header = authHeader();
  return axios({
    method: 'GET',
    url: urls.API + 'orders/BillPerCustomer',
    headers: header,
  }).then(response => {
    return response.data
  }).catch(error => {
    return Promise.reject(error)
  })
}

function getOrdersPerTable() {
  const header = authHeader()
  return axios({
    method: 'GET',
    url: urls.API + 'orders/OrdersPerTable',
    headers: header
  }).then(response => {
    return response.data
  })
    .catch( error => {
      return Promise.reject(error)
    })
}
