import React from "react";
import PropTypes from "prop-types";

function DeleteElement(props) {
	const { deleteGoal, categoryLoc, goalLoc, isDaily } = props;

	return (
			<div
				className="close-container"
				tabIndex={0}
				role="button"
				key={8}
				onKeyPress={() => { }}
				onClick={() => {
					deleteGoal(isDaily, categoryLoc, goalLoc);
				}}
			>
				<div className="leftright" />
				<div className="rightleft" />
			</div>
	);
}

DeleteElement.propTypes = {
	deleteGoal: PropTypes.func.isRequired,
	categoryLoc: PropTypes.number.isRequired,
	goalLoc: PropTypes.number.isRequired,
	isDaily: PropTypes.bool.isRequired
};

export default DeleteElement;
