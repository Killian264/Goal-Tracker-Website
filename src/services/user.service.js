// import { authHeader } from '../helpers/auth-header';

export const userService = {
  login,
  logout,
  register,
  getGoalsData
};
const apiUrl = "http://localhost:61487/api";

function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + window.btoa(username + ":" + password)
    },
    body: JSON.stringify({ username, password })
  };
  return fetch(`${apiUrl}/User/login`, requestOptions)
    .then(handleResponse)
    .then(user => {
      if (user) {
        // store user details and basic auth credentials in local storage
        // to keep user logged in between page refreshes
        // user.authdata = window.btoa(username + ':' + password);
        console.log(user, JSON.stringify(user));
        localStorage.setItem("user", user);
      }
      return user;
    });
}

function register(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  };
  return fetch(`${apiUrl}/User/register`, requestOptions)
    .then(handleResponse)
    .then(user => {
      return user;
    });
}

function getGoalsData() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + window.btoa(localStorage.getItem("user"))
    }
  };
  return fetch(`${apiUrl}/values`, requestOptions)
    .then(handleResponse)
    .then(user => {
      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
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
        error = "Email or password is incorrect.";
      }
      if (response.status === 400) {
        // auto logout if 401 response returned from api
        // logout();
        // window.location.reload(true);
        error = "Email is already in use please login";
      }
      localStorage.removeItem("user");

      return Promise.reject(error);
    }

    return data;
  });
}
