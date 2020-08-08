import React, { Component } from "react";
import PropTypes from "prop-types";
import { getToday, getDayAbbr, getMonthAbbr } from "../../../helpers/commonCommands";
import DeleteElement from "../DeleteElement";
import Checkmark from "../Checkmark";

import { shapes } from "../../../helpers/shapes";

class OtherGoalsList extends Component {
	static propTypes = {
		otherGoals: PropTypes.arrayOf(shapes.otherGoalShape).isRequired,
		deleteGoal: PropTypes.func.isRequired,
		completeGoal: PropTypes.func.isRequired
	};

	TimeFrame = goal => {
		const endDate = new Date(goal.endDate);
		const totalDays = (Math.abs(new Date(goal.startDate) - endDate) / 8.64e7) + 1;
		let timeLeft = (Math.abs(endDate - new Date(getToday())) / 8.64e7).toString();
		return (
			<React.Fragment>
					{goal.isCompleted ? totalDays.toString().split(".")[0] + " Total Days" : timeLeft.toString().split(".")[0] += timeLeft === 1 ? " Day Left" : " Days Left"}
					<br />
					{goal.isCompleted ? "Ended " + goal.endDate.toString().split("T")[0] : getDayAbbr(endDate) + ", " + getMonthAbbr(endDate) + " " + endDate.getDate()}
			</React.Fragment>
		);
	};
	
	render() {
		const { otherGoals, deleteGoal, completeGoal, categoryLoc, displayCompleted } = this.props;
		const displayOtherGoals = otherGoals.map((goal, index) => {
		// add stuff for daily thingy
			if ((goal.isCompleted && !displayCompleted) || (!goal.isCompleted && displayCompleted))
				return null;
			return (
				<li className="list-group-item p-0 m-0" key={`${categoryLoc}${index}`}>
					<div className="d-flex justify-content-between mx-3 my-1">
						<div className="other-goal-width no-select my-auto">
							<div style={goal.isCompleted ? { textDecoration: "line-through" } : {}}>
								{goal.title}
								<p >- {' '}{goal.snippit}</p>
							</div>
						</div>
						<div className="w-140 text-center my-auto" style={goal.isCompleted ? { textDecoration: "line-through" } : {}}>
							{this.TimeFrame(goal)}
						</div>
						<div className="other-goal-width-end d-flex justify-content-end my-auto no-select">
							{!goal.isCompleted &&
								<Checkmark
									completeGoal={completeGoal}
									goalLoc={index}
									categoryLoc={categoryLoc}
								/>
							}
							{goal.isCompleted && 
								<DeleteElement
									deleteGoal={deleteGoal}
									goalLoc={index}
									categoryLoc={categoryLoc}
									isDaily={false}
								/> 
							}
						</div>
					</div>
				</li>
			);
		});

		return <React.Fragment>{displayOtherGoals}</React.Fragment>;
	}
}

export default OtherGoalsList;
