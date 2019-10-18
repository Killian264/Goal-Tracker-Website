import { authHeader } from '../helpers/auth-header';

export const userService = {
    login,
    logout,
    getAll,
    register
};
const apiUrl = 'http://localhost:61487/api/User';
function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + window.btoa(username + ':' + password)}, 
        body: JSON.stringify({ username, password })
    };
    return fetch(`${apiUrl}/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                // user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        });
}
function register(email, password){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',}, 
        body: JSON.stringify({ email, password })
    };
    return fetch(`${apiUrl}/register`, requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    // const requestOptions = {
    //     method: 'GET',
    //     headers: authHeader()
    // };

    // return fetch(`${apiUrl}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            let error = (data && data.message) || response.statusText;
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
                // window.location.reload(true);
                error = ('Email or password is incorrect.')
            }
            if (response.status === 400) {
                // auto logout if 401 response returned from api
                // logout();
                // window.location.reload(true);
                error = ('Email is already in use please login')
            }

            return Promise.reject(error);
        }

        return data;
    });
}