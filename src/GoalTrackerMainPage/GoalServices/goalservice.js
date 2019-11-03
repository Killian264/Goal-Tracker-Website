import { createBrowserHistory } from "history";
const apiUrl = "http://localhost:61487/api/values";
// export const userService = {
//     APIDeleteGoal,
//     getGoalsData,
//     updateGoal,
//     postGoal
//   };

function authHeader(method, body) {
    let requestOptions = {
        method: method,
        headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + window.btoa(localStorage.getItem("user"))
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

export function APIDeleteGoal(id, categoryID) {
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

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            let error = (data && data.message) || response.statusText;
            if (response.status === 401) {
                localStorage.removeItem("user");
                pushToLogin();
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

function pushToLogin() {
    const history = createBrowserHistory();
    history.push("/login");
    document.location.reload();
}

export function getGoalsData() {
    const requestOptions = authHeader("GET", null);
    return fetch(apiUrl, requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
        });
}

export function updateGoal(id, categoryID, weeklyChecked) {
    // goal id categoryid if == "daily" then its a daily weeklychecked is only used if updating daily stuff
    let goal = {
        id: id,
        categoryID,
        weeklyChecked: weeklyChecked
    };
    console.log(weeklyChecked, typeof(weeklyChecked))
    const requestOptions = authHeader("PATCH", goal);
    return fetch(`${apiUrl}/update`, requestOptions)
        .then(handleResponse)
        .then(user => {
        });
}

export function postGoal(goal, valueType) {
    const requestOptions = authHeader("POST", goal);
    return fetch(apiUrl + "/" + valueType, requestOptions)
        .then(handleResponse)
        .then(user => {
        });
}
