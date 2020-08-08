//const apiUrl = "https://goaltrackerapi20191108014823.azurewebsites.net/api";
const apiUrl = "http://localhost:61487/api";
export const userService = {
  login,
  register,
  createTestAccount,
};

// login
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
// test account
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
// register
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

// handle response
function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      let error = (data && data.message) || response.statusText;
      if (response.status === 401) {
        error = "Email or password is incorrect.";
      }
      else if (response.status === 400) {
        error = "Email is already in use please login";
      }
      else{
        error = "Bad Request";
      }
      localStorage.removeItem("user");

      return Promise.reject(error);
    }

    return data;
  });
}
