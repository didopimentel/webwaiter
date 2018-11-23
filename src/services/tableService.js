import { authHeader } from '../helpers/authHeader';
import axios from 'axios'
import { urls } from '../helpers/urls'
import { alertActions } from '../actions/alertActions';

export const tableService = {
    callWaiter,
    getTableBills
} 

function callWaiter() {
    const header = authHeader();
    return axios({
        method: 'PUT',
        url: `${urls.API}tables/callWaiter`,
        headers: header
    }).then((response) => {
        return response.data
    }).catch((error) => {
        alertActions.error(error.data)
    });
}

function getTableBills(tableId) {
    const header = authHeader();
    return axios({
        method: 'GET',
        url: `${urls.API}tables/${tableId}/bills`,
        headers: header
    }).then((response) => {
        return response.data
    }).catch((error) => {
        alertActions.error(error.data)
    });
}