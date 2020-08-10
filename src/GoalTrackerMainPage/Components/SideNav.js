import React, { Component } from 'react'
import { goalService } from '../../services/goal.service';
import { helpers } from '../../helpers/helpers';

class SideNav extends Component {
	state = {
		username: "",
	}

	onClick = (e) => {
		e.preventDefault();
		helpers.pushToLogin();
	}

	componentDidMount() {
		// Close on Load
		document.querySelector("#sidenav").classList.toggle("nav-active");
		// Get Username
		// If user is not static user would be redirected to login
		goalService.getUserName().then(
			user => {
				this.setState({ username: user });
			},
			error => {
				// A more robust system should be used here 
				this.setState({ username: "Static User" });
			}
		);;
	}

	render() {
		const { updatePageDisplay, pageDisplay } = this.props;
		return (
			<div className="sidenav bg-dark noselect" id="sidenav" style={{position: "fixed"}}>
				<div className="user">
					<img src="./images/profile.png" alt="" />
					{/* onclick prevent default is hotfix until these are changed out for buttons */}
					<a href="https://goal-tracker.killiandebacker.com/" onClick={(e) => { e.preventDefault() }}>{this.state.username}</a>
				</div>
				<div className="navlinks">
					<a className={pageDisplay === "Categories" ? "page-on-page" : ""} href="https://goal-tracker.killiandebacker.com/login" onClick={(e) => {
						e.preventDefault()
						updatePageDisplay("Categories")
					}}>Categories</a>
					<a className={pageDisplay === "Planned" ? "page-on-page" : ""} href="https://goal-tracker.killiandebacker.com/login" onClick={(e) => {
						e.preventDefault()
						updatePageDisplay("Planned")
					}}>Planned</a>
					<a href="https://goal-tracker.killiandebacker.com/login" onClick={this.onClick}>Log Out</a>
					<br></br>
					<br></br>
					<a href="https://killiandebacker.com/">My Portfolio</a>
					<a href="https://github.com/Killian264/Goal-Tracker-Website" rel="noopener noreferrer" target="_blank">Github</a>
				</div>
				<div className="navlinksfootnote">
					Killian Debacker ©2019
				</div>
			</div>
		)
	}
}

export default SideNav

