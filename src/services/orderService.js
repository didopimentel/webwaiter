import { authHeader } from '../helpers/authHeader'
import axios from 'axios'
import { urls } from '../helpers/urls'

export const orderService = {
  orderItemsCustomer,
  orderItems,
  getOrdersPerTable,
  getBillPerCustomer,
  checkoutOrder,
  changeOrderItemStatus
}

function orderItemsCustomer(items) {
  const header = authHeader()
  var order = {}
  order["client_order"] = items
  return axios({
    method: 'POST',
    url: urls.API + 'orders/client',
    headers: header,
    data: order
  }).then( response => {
    return response.data
  })
   .catch( error => {
     return Promise.reject(error)
   })
}

function orderItems(items, tableID) {
  const header = authHeader()
  var order = {}
  order["client_order"] = items
  order["table_id"] = tableID
  return axios({
    method: 'POST',
    url: urls.API + 'orders/staff',
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

function getOrdersPerTable(requester) {
  const header = authHeader()
  const endpoint = (requester === 'backofhouse') ? 'OrdersPerTableBackOfHouse' : 'OrdersPerTable'
  return axios({
    method: 'GET',
    url: urls.API + 'orders/' + endpoint,
    headers: header
  }).then(response => {
    return response.data
  })
    .catch( error => {
      return Promise.reject(error)
    })
}

async function checkoutOrder(amount) {
  const header = authHeader();
  return axios({
    method: 'POST',
    url: urls.API + 'checkout/',
    headers: header,
    data: { amount }
  }).then(response => {
    return response.data
  }).catch(error => {
    return Promise.reject(error)
  })
}

async function changeOrderItemStatus(orderId, itemId, prevStatus, nextStatus) {
  const header = authHeader();
  return axios({
    method: 'PUT',
    url: urls.API + 'orders/' + orderId + '/item/' + itemId,
    headers: header,
    data: { previousStatus: prevStatus, nextStatus: nextStatus }
  }).then(response => {
    return response.data
  }).catch(error => {
    return Promise.reject(error)
  })
}