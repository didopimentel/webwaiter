import { authHeader } from '../helpers/authHeader';
import axios from 'axios'
import { urls } from '../helpers/urls'
import { alertActions } from '../actions/alertActions';

export const adminService = {
    getStations,
    getEmployees,
    removeEmployee,
    createEmployee,
    createCategory,
    getCategories,
    removeCategory,
    createItem,
    removeItem,
    getItems,
    createTable,
    getTables
}

function getStations() {
    const header = authHeader();
    
    return axios({
        method: 'GET',
        url: urls.API + 'stations',
        headers: header
    }).then( response => {
        return response.data
    })
    .catch( error => {
        return Promise.reject(error)
    })
}


function getEmployees() {
    const header = authHeader();
    return axios({
        method: 'GET',
        url: urls.API + 'employees',
        headers: header
    }).then( response => {
        return response.data
    })
    .catch( error => {
        return Promise.reject(error)
    })
}

function createEmployee(username, password, station, email, role) {
    const header = authHeader();
    return axios({
        method: 'POST',
        url: urls.API + 'employees',
        headers: header,
        data: {
            username, 
            password, 
            station_id: station, 
            email,
            role
        }
    }).then( response => {
        alertActions.success("Employee created with success!")
        return response.data
    })
    .catch( error => {
        return Promise.reject(error)
    })
}

function removeEmployee(id) {
    const header = authHeader();
    return axios({
        method: 'DELETE',
        url: urls.API + 'employees/' + id,
        headers: header
    }).then( () => {
        return { ok: 'ok' }
    })
    .catch( error => {
        alertActions.error("Employee could not be delete!")
        return Promise.reject(error)
    })
}

function createCategory(category) {
    const header = authHeader();
    return axios({
        method: 'POST',
        url: urls.API + 'categories/',
        headers: header,
        data: category
    }).then((response) => {
        alertActions.success("Category created successfully!")
        return { ok: 'ok' }
    })
    .catch( error => {
        alertActions.error("Category could not be created!")
        return Promise.reject(error)
    })
}

function getCategories() {
    const header = authHeader();
    return axios({
        method: 'GET',
        url: urls.API + 'categories',
        headers: header
    }).then( response => {
        return response.data
    })
    .catch( error => {
        return Promise.reject(error)
    })
}

function removeCategory(id) {
    const header = authHeader();
    return axios({
        method: 'DELETE',
        url: urls.API + 'categories/' + id,
        headers: header
    }).then( response => {
        return Promise.resolve();
    })
    .catch( error => {
        return Promise.reject(error)
    })
}

function createItem(item) {
    const header = authHeader();
    return axios({
        method: 'POST',
        url: urls.API + 'menu/',
        headers: header,
        data: item
    }).then((response) => {
        alertActions.success("Category created successfully!")
        return { ok: 'ok' }
    })
    .catch( error => {
        alertActions.error("Category could not be created!")
        return Promise.reject(error)
    })
}

function getItems() {
    const header = authHeader();
    return axios({
        method: 'GET',
        url: urls.API + 'menu/',
        headers: header
    }).then( response => {
        return response.data
    })
    .catch( error => {
        return Promise.reject(error)
    })
}

function removeItem(id) {
    const header = authHeader();
    return axios({
        method: 'DELETE',
        url: urls.API + 'menu/' + id,
        headers: header
    }).then( response => {
        return Promise.resolve();
    })
    .catch( error => {
        return Promise.reject(error)
    })
}

function createTable(number) {
    const header = authHeader();
    return axios({
        method: 'POST',
        url: urls.API + 'tables/',
        headers: header,
        data: { number }
    }).then((response) => {
        alertActions.success("Table created successfully!")
        return { ok: 'ok' }
    })
    .catch( error => {
        alertActions.error("Table could not be created!")
        return Promise.reject(error)
    })
}

function getTables() {
    const header = authHeader();
    return axios({
        method: 'GET',
        url: urls.API + 'tables/',
        headers: header
    }).then( response => {
        return response.data
    })
    .catch( error => {
        return Promise.reject(error)
    })
}