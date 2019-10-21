import React from "react";
import "./css/main.css";
import "./css/util.css";
import "./images/img-01.png";
import "./fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import { userService } from "../services/user.service.js";
// import { Redirect } from 'react-router-dom';
import { createBrowserHistory } from "history";
// import { register } from '../serviceWorker';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    userService.logout();

    this.state = {
      username: "",
      password: "",
      passwordCheck: "",
      submitted: false,
      loading: false,
      error: "",
      registering: this.props.registering
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    // const {returnUrl} = this.state;
    const { username, password, passwordCheck, registering } = this.state;
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username)) {
      this.setState({ error: "Please enter a valid email" });
      return;
    }
    // stop here if form is invalid
    if ((!password || registering) && !(password, passwordCheck)) {
      return;
    }
    if (registering && !(password === passwordCheck)) {
      this.setState({ error: "Passwords do not match" });
      return;
    }
    if (password.includes(":")) {
      this.setState({ error: "Password cannot contain semicolons" });
      return;
    }
    this.setState({ loading: true });
    if (registering) {
      userService.register(username, password).then(
        user => {
          this.setState({
            username: "",
            password: "",
            passwordCheck: "",
            registering: false,
            loading: false,
            error: "Account created please login."
          });
        },
        error =>
          this.setState({
            username: "",
            password: "",
            passwordCheck: "",
            registering: false,
            loading: false,
            error
          })
      );
      const history = createBrowserHistory();
      history.push("/login");
    } else {
      userService.login(username, password).then(
        user => {
          const { from } = this.props.location.state || {
            from: { pathname: "/" }
          };
          this.props.history.push(from);
        },
        error => this.setState({ error, loading: false })
      );
    }
  }
  test() {
    const history = createBrowserHistory();
    history.push(this.state.registering ? "/login" : "/register");
    this.setState({ registering: !this.state.registering, error: "" });
  }
  render() {
    // const {submitted} = this.state;
    const { username, password, loading, error, passwordCheck } = this.state;
    var red = {
      color:
        this.state.error === "Account created please login." ? "green" : "red"
    };
    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div className="login100-pic js-tilt" data-tilt>
              <img src={require("./images/img-01.png")} alt="IMG" />
            </div>

            <form
              className="login100-form validate-form"
              name="form"
              onSubmit={this.handleSubmit}
            >
              <span className="login100-form-title">
                {this.state.registering ? "User Register" : "User Login"}
              </span>
              {error && (
                <div style={red} className={"alert alert-danger"}>
                  {error.toString()}
                </div>
              )}
              <div
                className="wrap-input100 validate-input"
                data-validate="Valid email is required: ex@abc.xyz"
              >
                <input
                  className="input100"
                  type="text"
                  disabled={loading}
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                  placeholder="Email"
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                </span>
              </div>
              <div
                className="wrap-input100 validate-input"
                data-validate="Password is required"
              >
                <input
                  className="input100"
                  type="password"
                  disabled={loading}
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  placeholder="Password"
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-lock" aria-hidden="true"></i>
                </span>
              </div>
              {this.state.registering && (
                <div
                  className="wrap-input100 validate-input"
                  data-validate="Password is required"
                >
                  <input
                    className="input100"
                    type="password"
                    disabled={loading}
                    name="passwordCheck"
                    value={passwordCheck}
                    onChange={this.handleChange}
                    placeholder="Retype Password"
                  />
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <i className="fa fa-lock" aria-hidden="true"></i>
                  </span>
                </div>
              )}
              <div className="container-login100-form-btn">
                <button className="login100-form-btn" disabled={loading}>
                  {loading && (
                    <img
                      src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJ
                            iYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMw
                            i63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG
                            4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70G
                            U7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R
                            8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+
                            QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7w
                            CRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCu
                            UBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                      alt="loading..."
                    />
                  )}
                  {this.state.registering ? "Register" : "Login"}
                </button>
              </div>
              {/* <div className="text-center p-t-12">
						<span className="txt1">
							Forgot
						</span>
						<a className="txt2" href="#">
							Username / Password?
						</a>
                    </div> */}
              <div className="text-center p-t-136">
                <div className="txt2 cursorthingy" onClick={() => this.test()}>
                  {this.state.registering ? "Login" : "Create Your Account"}{" "}
                  <i
                    className="fa fa-long-arrow-right m-l-5"
                    aria-hidden="true"
                  ></i>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
