import { createBrowserHistory } from "history";
export const helpers = {
    pushToLogin,
  };
function pushToLogin() {
    localStorage.removeItem("user");
    const history = createBrowserHistory();
    history.push("/login");
    document.location.reload();
}