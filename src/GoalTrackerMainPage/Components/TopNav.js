import React from "react";
import PropTypes from "prop-types";

function TopNav(props) {
	const { displayGoalOverlay } = props;

	let navSlideChange = () => {
		document.querySelector("#sidenav").classList.toggle("nav-active");
	};

	return (
		<div className="navbar navbar-dark bg-dark d-flex justify-content-between sticky-top xi2" >
			<div className="d-flex justify-content-between">
				{/* SideNav Button */}
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation" onClick={() => {navSlideChange()}}>
					<span className="navbar-toggler-icon"></span>
				</button>
				{/* Change this to current page ie. Categories, Planned */}
				<h1 className="navbar-brand pl-sm-3 pl-1">Current Goals</h1>
			</div>
			{/* Create Goal */}
			<button className="btn btn-outline-info my-2 my-sm-0" onClick={displayGoalOverlay}>Create Goal</button>
		</div>
	);
}

TopNav.propTypes = {
	displayGoalOverlay: PropTypes.func.isRequired
};

export default TopNav;
