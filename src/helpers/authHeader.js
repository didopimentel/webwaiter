export function authHeader() {
    let token = localStorage.getItem('token');
    if (token) {
        return {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        };
    } else {
        return {};
    }
}
