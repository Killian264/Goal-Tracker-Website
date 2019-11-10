import React from "react";
import "./css/main.css";
import "./css/util.css";
import "./fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import { userService } from "../services/user.service.js";
import { createBrowserHistory } from "history";
import InputElement from './InputElement';
import { PulseLoader} from 'react-spinners';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            username: "",
            password: "",
            passwordCheck: "",
            loading: false,
            error: "",
            registering: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        if((localStorage.getItem("user"))){
            const history = createBrowserHistory();
            history.push("/");
            document.location.reload();
        }
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    validate = () => {
        const {password, passwordCheck, registering, email} = this.state;
        let error = null;
        if (password.includes(":")) error = "Password cannot contain semicolons";
        if (registering && !(password === passwordCheck)) error = "Passwords do not match";
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))  error = "Please enter a valid email";
        if ((!password || registering) && !(password, passwordCheck)) error = "Please fill out all fields";

        this.setState({error: error});
        return error;
    }

    handleSubmit(e) {
        e.preventDefault();
		const {username, password, registering, email} = this.state;
		
        if((this.validate())) return;
        
        this.setState({ loading: true });
        if (registering) {
			let state = {email: "", username: "", password: "", passwordCheck: "", registering: false, loading: false,}
            userService.register(email, password, username).then(
                user => {
                    this.setState({...state, error: "Account created please login.",});
                },
                error =>this.setState({...state, error: error})
            );
            this.historyPush();
        } else {
            userService.login(email, password).then(
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
    historyPush() {
        const history = createBrowserHistory();
        history.push(this.state.registering ? "/login" : "/register");
        this.setState({ registering: !this.state.registering, error: "" });
    }

    createTestAccount() {
        this.setState({ loading: true });
        userService.createTestAccount().then(user => {
            const { from } = this.props.location.state || {
                from: { pathname: "/" }
            };
            this.props.history.push(from);
        });
    }

    render() {
        const {username, password, loading, error, passwordCheck, email, registering} = this.state;
        let dimmer = loading ? "dimmer wrap-login100" : "wrap-login100";
        return (
            <div className="limiter">
                <div className="container-login100">                     
                    <PulseLoader
                        css={{position: "absolute", "z-index": 10}}
                        sizeUnit={"px"}
                        size={15}
                        color={'black'}
                        loading={loading}
                        />
                    <div className={dimmer}>
                        <form className="login100-form validate-form" name="form" onSubmit={this.handleSubmit}>
                            <span className="login100-form-title">
                                {this.state.registering ? "User Register": "User Login"}
                            </span>
                            <span style={{color: "red"}}>{error && error.toString()}</span>
                            <InputElement onChange={this.handleChange} name={"email"} value={email} symbol={"fa fa-envelope"} type={"text"} load={true}/>
                            <InputElement onChange={this.handleChange} name={"username"} value={username} symbol={"fa fa-user"} type={"text"} load={registering}/>
                            <InputElement onChange={this.handleChange}name={"password"} value={password} symbol={"fa fa-lock"} type={"password"} load={true}/>
                            <InputElement onChange={this.handleChange} name={"passwordCheck"} value={passwordCheck} symbol={"fa fa-lock"} type={"password"}load={registering}/>
                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn" disabled={loading}>
                                    {this.state.registering
                                    ? "Register"
                                    : "Login"}
                                </button>
                            </div>
                            <div className="createGuest text-center noselect">
                                <span className="create-guest-text" onClick={()=> this.createTestAccount()}>
                                    Create Guest Account
                                </span>
                            </div>
                            <div className="text-center p-t-100">
                                <div className="txt2 cursorthingy" onClick={()=> this.historyPush()}>
                                    {this.state.registering
                                    ? "Login"
                                    : "Create Your Account"}
                                    <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
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
