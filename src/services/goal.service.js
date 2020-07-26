import { helpers} from '../helpers/helpers';
//const apiUrl = "https://goaltrackerapi20191108014823.azurewebsites.net/api/values";
//const apiUrl2 = "https://goaltrackerapi20191108014823.azurewebsites.net/api/User/getUsername";
const apiUrl = "http://localhost:61487/api/values";
const apiUrl2 = "http://localhost:61487/api/User/getUsername";

export const goalService = {
    APIDeleteGoal,
    getGoalsData,
    updateGoal,
    postGoal,
    getUserName,
  };

function authHeader(method, body) {
    let user = window.btoa(localStorage.getItem("user"));
    // if(atob(user) === "Static") return null;
    let requestOptions = {
        method: method,
        headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + user
        }
    };
    if (body !== null) {
        requestOptions = {
            ...requestOptions,
            body: JSON.stringify(body)
        };
    }

    return requestOptions;
}

function APIDeleteGoal(id, categoryID) {
    let goal = {
        id: id,
        categoryID
    };
    const requestOptions = authHeader("DELETE", goal);
    return fetch(`${apiUrl}/delete`, requestOptions)
        .then(handleResponse)
        .then(user => {
    });
}
function getUserName(){
    const requestOptions = authHeader("GET", null);
    return fetch(apiUrl2, requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
    });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            let error = (data && data.message) || response.statusText;
            if (response.status === 401) {
                let user = window.btoa(localStorage.getItem("user"));
                if(user !== "Static"){
                    localStorage.removeItem("user");
                    helpers.pushToLogin();
                }
            }
            if (response.status === 400) {
                // add error here if bad request
            }
            if (response.stats === 404) {
            }
            return Promise.reject(error);
        }

        return data;
    });
}

function getGoalsData() {
    const requestOptions = authHeader("GET", null);
    if (requestOptions === null){
        return null;
    }
    return fetch(apiUrl, requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
    });
}

function updateGoal(id, categoryID, weeklyChecked) {
    // goal id categoryid if == "daily" then its a daily weeklychecked is only used if updating daily stuff
    let goal = {
        id: id,
        categoryID,
        weeklyChecked: weeklyChecked
    };
    const requestOptions = authHeader("PATCH", goal);
    return fetch(`${apiUrl}/update`, requestOptions)
        .then(handleResponse)
        .then(user => {
    });
}

function postGoal(goal, valueType) {
    const requestOptions = authHeader("POST", goal);
    return fetch(apiUrl + "/" + valueType, requestOptions)
        .then(handleResponse)
        .then(user => {
    });
}
