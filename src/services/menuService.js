import { authHeader } from '../helpers/authHeader';

export const menuService = {
    getAllDishes,
    getAllCategories
};

function getAllDishes() {
    const header = authHeader()
    const requestOptions = {
        method: 'GET',
        headers: header
    };
    return fetch('http://localhost:3001/api/menu', requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json();
        })
        .then(response => {
            if (response) {
                localStorage.setItem('menu', JSON.stringify(response));
            }
            return response;
        });
}

function getAllCategories() {
  const header = authHeader()
  const requestOptions = {
      method: 'GET',
      headers: header
  };
  return fetch('http://localhost:3001/api/categories', requestOptions)
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
