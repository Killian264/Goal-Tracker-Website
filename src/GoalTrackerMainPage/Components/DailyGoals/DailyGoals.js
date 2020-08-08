import React, { Component } from "react";
import PropTypes from "prop-types";
import uuid from "uuid";
import DeleteElement from "../DeleteElement";

import { shapes } from "../../../helpers/shapes";

class DailyGoals extends Component {
	static propTypes = {
		dailyGoals: PropTypes.arrayOf(shapes.dailyGoalShape).isRequired,
		updateCheckMark: PropTypes.func.isRequired,
		deleteGoal: PropTypes.func.isRequired,
		negativeLen: PropTypes.number.isRequired,
		positiveLen: PropTypes.number.isRequired,
		renderAmount: PropTypes.number.isRequired
	};
	listElement = (goal, i) => (
		<li key={uuid.v4()}>
			<label className="checkbox">
				<input type="checkbox" checked={goal.weeklyChecked[i]} readOnly />
				<span className="checkmark" />
			</label>
		</li>
	);

	dateRenders = goal => {
		const { renderAmount, updateCheckMark, positiveLen, negativeLen } = this.props;
		const list = [];
		if (renderAmount !== 2) {
			for (let i = 4 - negativeLen; i <= 3; i += 1) {
				list.push(this.listElement(goal, i));
			}
		}
		list.push(
			<li key={4}>
				<label className="checkbox checkboxmain">
					<input
						type="checkbox"
						checked={goal.weeklyChecked[4]}
						readOnly
						onClick={() => {
							updateCheckMark(goal.id);
						}}
					/>
					<span className="checkmark" />
				</label>
			</li>
		);
		for (let i = 4; i < 4 + positiveLen; i += 1) {
			list.push(this.listElement(goal, i));
		}
		return [list];
	};

	render() {
		const { dailyGoals, deleteGoal } = this.props;
		const displayDailyGoals = dailyGoals.map((goal, index) => (
			<li className="list-group-item p-0" key={goal.id} ref={this.heading}>
				<div className="my-2 d-flex justify-content-between">
					<div className="daily-heading-width ml-3">
						{goal.title}
						<p>- {' '}{goal.snippit}</p>
					</div>
					<ul className="d-flex pr-0">
						{this.dateRenders(goal)}
						<li className="pb-0">
							<DeleteElement
								deleteGoal={deleteGoal}
								isDaily={true}
								goalLoc={index}
								categoryLoc={0}
							/>
						</li>
					</ul>
				</div>
			</li>
		));

		return <div className="onedailygoalcheckmark">{displayDailyGoals}</div>;
	}
}
export default DailyGoals;
