import { authHeader } from '../helpers/authHeader'
import axios from 'axios'

export const staffService = {
  getAllOrders,
  getAllTables,
  deactivateCall
}


function getAllOrders() {
  const header = authHeader()
  const requestOptions = {
      method: 'GET',
      headers: header
  }
  return fetch('http://localhost:3001/api/employees/orders', requestOptions)
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
    'http://localhost:3001/api/employees/tables',
     { headers: header }
    )
    .then(response => {
      return response.data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}


function deactivateCall(number) {
  const header = authHeader()

  return axios.patch(
    'http://localhost:3001/api/tables/' + number,
     {headers: header}
    )
    .then(response => {
      return response
    })
    .catch(error => {
      return Promise.reject(error)
    })
}
