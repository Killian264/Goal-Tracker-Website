import React, { Component } from "react";
import PropTypes from "prop-types";
import OtherGoalList from "./OtherGoalList";
// import OtherGoalsCompleted from '../CompletedGoals/OtherGoals/OtherGoalsCompleted'

import { shapes } from "../../../helpers/shapes";

class OtherGoalCategories extends Component {
	static propTypes = {
		otherGoalCategories: PropTypes.arrayOf(shapes.otherGoalsCategoryShape).isRequired,
		completeGoal: PropTypes.func.isRequired,
		deleteGoal: PropTypes.func.isRequired,
		displayCompleted: PropTypes.bool.isRequired
	};

	shouldComponentUpdate(nextProps) {
		const { otherGoalCategories, displayCompleted } = this.props;
		if (otherGoalCategories === nextProps.otherGoalCategories && displayCompleted === nextProps.displayCompleted) {
			return false;
		}
		return true;
	}

	render() {
		const { otherGoalCategories, deleteGoal, completeGoal, displayCompleted } = this.props;

		const displayOtherGoals = otherGoalCategories.map((category, index) => {
			if (category.render === false) {
				return null;
			}
			if ((!displayCompleted && category.unCompleted === 0) || (displayCompleted && category.unCompleted - category.otherGoals.length === 0)) {
				return null;
			}
			return (
			<div className="card mb-3" key={index}>
				<div className="card-header pl-3">
					<h3>{category.category}</h3>
				</div>
				<ul className="list-group list-group-flush">
					<OtherGoalList
						otherGoals={category.otherGoals}
						deleteGoal={deleteGoal}
						completeGoal={completeGoal}
						categoryLoc={index}
						displayCompleted={displayCompleted}
					/>
				</ul>
			</div>
			);
		});

		return <div>{displayOtherGoals}</div>;
	}
}
export default OtherGoalCategories;
