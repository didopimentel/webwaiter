import { authHeader } from '../helpers/authHeader';
import axios from 'axios'
import { urls } from '../helpers/urls'

export const establishmentService = {
    createEstablishment,
    loginStaff,
    login,
    loginTable,
    getImageUrl,
    getEstablishmentTables,
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
  return axios.post(urls.API + '/establishments/authenticate-staff', {
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
    return axios.post(urls.API + 'authentication/loginEstablishment', { establishmentCode })
        .then((response) => {
            localStorage.setItem('establishmentCode', JSON.stringify(response.data.code));
            localStorage.setItem('loggedInDashboard', true)
            return response.data
        })
        .catch((error) => {
            return Promise.reject(error);
        })
}

function loginTable(establishmentCode, table, bill_id) {
    return axios({
        method: 'POST',
        url: urls.API + 'authentication/loginTableAnonymously',
        data: { establishmentCode, table, bill_id }
    }).then(response => {
        // login successful if there's a jwt token in the response
        if (response && response.data.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('token', JSON.stringify(response.data.token));
        }
        return response.data;
    })
    .catch( error => {
        return Promise.reject(error)
    })
      
}

function getImageUrl (establishmentCode) {
    const header = authHeader();
    return axios({
        method: 'GET',
        url: urls.API + 'establishments/' + establishmentCode + '/logo',
        headers: header
    }).then( response => {
        return response.data
    })
       .catch( error => {
         return Promise.reject(error)
    })
}

function getEstablishmentTables (establishmentCode) {
    return axios({
        method: 'GET',
        url: urls.API + 'establishments/' + establishmentCode + '/tables' 
    }).then( response => {
        return response.data
    })
       .catch( error => {
         return Promise.reject(error)
    })
}

function logout() {
    localStorage.removeItem('loggedInDashboard');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('establishmentCode');
    localStorage.removeItem('menu');
}
