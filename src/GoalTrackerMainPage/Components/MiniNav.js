import React, { Component } from 'react'
import { helpers } from '../../helpers/helpers';

class MiniNav extends Component {
	state = {
		username: "",
	}

	onClick = (e) => {
		e.preventDefault();
		helpers.pushToLogin();
	}

	render() {
		const { updatePageDisplay, pageDisplay } = this.props;
		return (
			<div className="bg-dark noselect mininav">
				{/* Categories */}
				<div className={"my-3 py-2 d-flex flex-column minilinks " + (pageDisplay === "Categories" ? "minilinksActive" : "")}
					onClick={(e) => {
						e.preventDefault()
						updatePageDisplay("Categories")
					}}>
					<i className="fa fa-th-list fa-2x m-auto" aria-hidden="true"></i>
					<a className="m-auto"  href="https://goal-tracker.killiandebacker.com/login" >Categories</a>
				</div>
				{/* Planned */}
				<div className={"my-3 py-2 d-flex flex-column minilinks " + (pageDisplay === "Planned" ? "minilinksActive" : "") } 
					onClick={(e) => {
						e.preventDefault()
						updatePageDisplay("Planned")
					}}>
					<i className="fa fa-map fa-2x m-auto" aria-hidden="true"></i>
					<a className="m-auto"  href="https://goal-tracker.killiandebacker.com/login">Planned</a>
				</div>
				{/* Logout */}
				<div className={"my-2 py-2 d-flex flex-column minilinks "} onClick={this.onClick}>
					<i className="fa fa-2x fa-sign-out m-auto" aria-hidden="true"></i>
					<a className="m-auto"  href="https://goal-tracker.killiandebacker.com/login" >Logout</a>
				</div>
				{/* BR should not be used */}
				<br></br>
				<br></br>
				{/* Using <a> is a quick fix because im lazy */}
				{/* My Links */}
				<a className="" target="_blank" rel="noopener noreferrer" href="https://killiandebacker.com/" >
					<div className={"my-2 py-2 d-flex flex-column minilinks "}>
						<i className="fa fa-book fa-2x m-auto" aria-hidden="true"></i>
						<span className="m-auto">My Portfolio</span>
					</div>
				</a>
				<a className="" target="_blank" rel="noopener noreferrer" href="https://github.com/Killian264/Goal-Tracker-Website" >
					<div className={"my-2 py-2 d-flex flex-column minilinks "} >
						<i className="fa fa-github-square fa-2x m-auto" aria-hidden="true"></i>
						<span className="m-auto">Github</span>
					</div>
				</a>
			</div>
		)
	}
}

export default MiniNav

