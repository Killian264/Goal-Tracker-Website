handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    // const {returnUrl} = this.state;
    const {
        username,
        password,
        passwordCheck,
        registering,
        email
    } = this.state;
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
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
        userService.register(email, password, username).then(
            user => {
                this.setState({
                    email: "",
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
                    email: "",
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