// import { authHeader } from '../helpers/auth-header';

export const userService = {
  login,
  logout,
  register,
  createTestAccount,
  // getGoalsData
};
const apiUrl = "http://localhost:61487/api";

function login(username, password) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + window.btoa(username + ":" + password)
    }
  };
  return fetch(`${apiUrl}/User/login`, requestOptions)
    .then(handleResponse)
    .then(user => {
      localStorage.setItem("user", user);
      return user;
    });
}
function createTestAccount() {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }
  };
  return fetch(`${apiUrl}/User/testingAccount`, requestOptions)
    .then(handleResponse)
    .then(user => {
      localStorage.setItem("user", user);
      return user;
    });
}

function register(email, password, username) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, username })
  };
  return fetch(`${apiUrl}/User/register`, requestOptions)
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
