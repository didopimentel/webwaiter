import { authHeader } from '../helpers/authHeader';
import axios from 'axios'
import { urls } from '../helpers/urls'
import { alertActions } from '../actions/alertActions';

export const sessionInformationService = {
    getBillNumber,
    getTableNumber
} 

function getBillNumber() {
    const header = authHeader();
    return axios({
        method: 'GET',
        url: `${urls.API}bills/session`,
        headers: header
    }).then((response) => {
        console.log(response)
        return response.data
    }).catch((error) => {
        console.log(error)
        alertActions.error(error.data)
    });
}


function getTableNumber() {
    const header = authHeader();
    return axios({
        method: 'GET',
        url: `${urls.API}tables/session`,
        headers: header
    }).then((response) => {
        return response.data
    }).catch((error) => {
        alertActions.error(error.data)
    });
}