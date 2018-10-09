import { authHeader } from '../helpers/authHeader';
import axios from 'axios'
import { urls } from '../helpers/urls'

export const menuService = {
    getAllDishes,
    getAllCategories,
    getDishesOfCategory,
    getSpecificItem
};

function getAllDishes() {
    const header = authHeader();
    return axios({
        method: 'GET',
        url: urls.API + 'menu/',
        headers: header
    }).then( response => {
        localStorage.setItem('menu', JSON.stringify(response.data));
        return response.data
    })
    .catch( error => {
        return Promise.reject(error)
    });
}

function getDishesOfCategory(categoryId) {
    const header = authHeader();
    return axios({
        method: 'GET',
        url: urls.API + 'categories/' + categoryId +'/menu/',
        headers: header
    }).then( response => {
        localStorage.setItem('menu', JSON.stringify(response.data));
        return response.data
    })
    .catch( error => {
        return Promise.reject(error)
    });
}

function getAllCategories() {
  const header = authHeader()
  return axios({
    method: 'GET',
    url: urls.API + 'categories/',
    headers: header
    }).then( response => {
        return response.data
    })
    .catch( error => {
        return Promise.reject(error)
    })

}

function getSpecificItem(itemId, status) {
    const header = authHeader()
    const requestOptions = {
        method: 'GET',
        headers: header
    };
    return fetch(urls.API + 'menu/' + itemId + '/defaultTime/' + status, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json();
        })
        .then(response => {
            return response;
});
}