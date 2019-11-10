export default function authHeader(method, body) {
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