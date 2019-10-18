import React from 'react';
import { userService } from '../services/user.service.js';
import { Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';


class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        userService.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false,
            loading: false,
            error: ''
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
        const { username, password, returnUrl } = this.state;

        // stop here if form is invalid
        if (!(username && password)) {
            return;
        }

        this.setState({ loading: true });
        userService.login(username, password)
            .then(
                user => {
                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                    this.props.history.push(from);
                },
                error => this.setState({ error, loading: false })
            );
    }
    test(){
        const history = createBrowserHistory();
        history.push('/register');
    }

    render() {
        const { username, password, submitted, loading, error } = this.state;
        var red = {
            color: 'red'
        };
        return (
        <div>
            tstasdf
	</div>
        );
    }
}

export default LoginPage; 