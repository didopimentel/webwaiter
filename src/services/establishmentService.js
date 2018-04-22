import { authHeader } from '../helpers/authHeader';

export const establishmentService = {
    login,
    logout
};

function login(establishmentCode) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ establishmentCode })
    };
    return fetch('http://localhost:3001/api/authentication', requestOptions)
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
                localStorage.setItem('token', JSON.stringify(response.token))
                localStorage.setItem('establishment', JSON.stringify(response.establishment));
            }
            console.log('200 response', response)
            return response;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('establishment');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

  //  return fetch('/users', requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}
