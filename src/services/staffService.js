import { authHeader } from '../helpers/authHeader'
import axios from 'axios'
import { urls } from '../helpers/urls'

export const staffService = {
  getAllOrders,
  getAllTables,
  deactivateCall,
  updateTableCallStatus
}


function getAllOrders() {
  const header = authHeader()
  const requestOptions = {
      method: 'GET',
      headers: header
  }
  return fetch(urls.API + 'employees/orders', requestOptions)
      .then(response => {
          if (!response.ok) {
              return Promise.reject(response.statusText);
          }
          return response.json();
      })
      .then(response => {
          if (response) {
          }
          return response;
      })
}

function getAllTables() {
  const header = authHeader()
  return axios.get(
    urls.API + 'employees/tables',
     { headers: header }
    )
    .then(response => {
      return response.data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

function updateTableCallStatus(tableId, status) {
  const header = authHeader();
  return axios.patch(
    urls.API + 'tables/' +  tableId + 'updateCallStatus',
    { headers: header },
    { data: status }
  ).then(response => {
    return response.data
  }).catch(error => {
    return Promise.reject(error)
  })
}


function deactivateCall(number) {
  const header = authHeader()

  return axios.patch(
    urls.API + 'tables/' + number,
     {headers: header}
    )
    .then(response => {
      return response
    })
    .catch(error => {
      return Promise.reject(error)
    })
}
