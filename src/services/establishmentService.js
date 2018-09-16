import { authHeader } from '../helpers/authHeader';
import axios from 'axios'
import { urls } from '../helpers/urls'

export const establishmentService = {
    createEstablishment,
    loginStaff,
    login,
    loginTable,
    logout
};

function createEstablishment (establishment) {
    const header = authHeader();
    return axios({
        method: 'POST',
        url: urls.API + 'establishments/',
        headers: header,
        data: establishment
    }).then( response => {
        return response.data
    })
       .catch( error => {
         return Promise.reject(error)
    })
}

function loginStaff(username, password) {
  return axios.post('http://localhost:3001/api/establishments/authenticate-staff', {
    username,
    password
  })
    .then((response) => {
      localStorage.setItem('token', JSON.stringify(response.token))
      localStorage.setItem('role', JSON.stringify(response.role))
      return response.data
    })
    .catch((error) => {
      if (error.response){
        return Promise.reject(error.response.status)
      }
      return Promise.reject(500)
    })
}

function login(establishmentCode) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ establishmentCode })
    };
    return fetch('http://localhost:3001/api/authentication/loginEstablishment', requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json();
        })
        .then(response => {
            // login successful if there's a jwt token in the response
            if (response && response.code) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('establishmentCode', JSON.stringify(response.code));
                localStorage.setItem('loggedInDashboard', true)
            }
            return response;
        });
}

function loginTable(establishmentCode, table) {
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ establishmentCode, table })
  };
  return fetch('http://localhost:3001/api/authentication/loginTableAnonymously', requestOptions)
      .then(response => {
          if (!response.ok) {
              return Promise.reject(response.statusText);
          }
          return response.json();
      })
      .then(response => {
          // login successful if there's a jwt token in the response
          if (response && response.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('token', JSON.stringify(response.token));
          }
          return response;
      });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('establishment');
    localStorage.removeItem('token');
}
