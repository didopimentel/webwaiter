export function authHeader() {
    // return authorization header with jwt token
    let establishment = JSON.parse(localStorage.getItem('establishment'));

    if (establishment && establishment.token) {
        return { 'Authorization': 'Bearer ' + establishment.token };
    } else {
        return {};
    }
}
