import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    getToday,
    getDayAbbr,
    getMonthAbbr,
} from "../../../helpers/commonCommands";
import Checkmark from "../../Components/Checkmark";

import { shapes } from "../../../helpers/shapes";

class GoalDisplay extends Component {
    static propTypes = {
        otherGoals: PropTypes.arrayOf(shapes.otherGoalShape).isRequired,
        deleteGoal: PropTypes.func.isRequired,
        completeGoal: PropTypes.func.isRequired,
    };

    TimeFrame = (goal) => {
        let endDate = new Date(goal.endDate);
        let timeLeft = (
            Math.abs(endDate - new Date(getToday())) / 8.64e7
        ).toString();

        return (
            <div className="otherdailygoalheading extendeddailygoaltimeframe">
				{
					(timeLeft.toString().split(".")[0] +=
						timeLeft === 1 ? " Day Left" : " Days Left")
				}
				<br />
				{
					getDayAbbr(endDate) +
					", " +
					getMonthAbbr(endDate) +
					" " +
					endDate.getDate()
				}
            </div>
        );
    };

    render() {
		// deletegoal as well 
        const { otherGoals, completeGoal } = this.props;

        const displayOtherGoals = otherGoals.map((goal, index) => {
            return (
                <li className="list-group-item p-0 m-0" key={goal.id}>
					<div className="d-flex justify-content-between mx-3 my-1">
						<div className="other-goal-width no-select my-auto">
							<div className="other-goal-width no-select my-auto">
								{goal.title}
								<p>- {goal.category}</p>
							</div>
						</div>
						<div className="w-140 text-center my-auto">
							{this.TimeFrame(goal)}
						</div>
						<div className="other-goal-width d-flex justify-content-end my-auto no-select">
							<Checkmark
								completeGoal={completeGoal}
								goalLoc={goal.goalIndex}
								categoryLoc={goal.categoryIndex}
							/>
						</div>
					</div>
                </li>
            );
        });

        return <React.Fragment>{displayOtherGoals}</React.Fragment>;
    }
}

export default GoalDisplay;
