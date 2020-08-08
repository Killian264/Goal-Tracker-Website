import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactResizeDetector from "react-resize-detector";
import DailyGoals from "./DailyGoals";
// import DayElement from './DayElement';
import { getWeekDay, getMonthDay } from "../../../helpers/commonCommands";

import { shapes } from "../../../helpers/shapes";

class DailyGoalHeading extends Component {
	static propTypes = {
		dailyGoals: PropTypes.arrayOf(shapes.dailyGoalShape).isRequired,
		updateCheckMark: PropTypes.func.isRequired,
		deleteGoal: PropTypes.func.isRequired
	};

	state = {
		width: 0,
		renderAmount: 0,
		negativeLen: 0,
		positiveLen: 0
	};

	heading = React.createRef();

	shouldComponentUpdate(nextProps) {
		if (this.state.width !== this.heading.current.offsetWidth) {
			return true;
		}
		if (this.props.dailyGoals !== nextProps.dailyGoals) {
			return true;
		}
		return false;
	}

	updateWidths = handleWidth => {
		const { renderAmount } = this.state;
		let len = Math.floor((handleWidth - 200) / 80);
		if (len > 8) {
			len = 8;
		}
		if (len - renderAmount >= 1 || renderAmount - len >= 1) {
			this.setState({
				width: handleWidth,
				renderAmount: len,
				negativeLen: len < 2 ? Math.floor(len / 2) : Math.ceil(len / 2),
				positiveLen: len / 2 - 2
			});
		}
	};

	listElement = i => (
		<li key={i}>
			{getWeekDay(i)}
			<br />
			{getMonthDay(i)}
		</li>
	);

	dateRenders = () => {
		const { state } = this;
		const list = [];
		if (state.renderAmount !== 2) {
			for (let i = 4 - state.negativeLen; i <= 3; i += 1) {
				list.push(this.listElement(i - 4));
			}
		}
		list.push(
			<li className="dailyWeekdate" key={10}>
				{getWeekDay(0)}
				<br />
				{getMonthDay(0)}
			</li>
		);
		for (let i = 1; i <= state.positiveLen; i += 1) {
			list.push(this.listElement(i));
		}
		list.push(
			<li key={8}>
				Del
        <br />▼
      </li>
		);
		return [list];
	};

	render() {
		const { state } = this;
		const { updateCheckMark, dailyGoals, deleteGoal } = this.props;
		return (
			<div className="card mb-3">
				<ReactResizeDetector handleWidth onResize={this.updateWidths} />
				<div className="card-header d-flex justify-content-between p-0 " ref={this.heading}>
					<h3 className="pl-3 my-auto" style={{width: "200px"}}>Recurring</h3>
					<ul className="d-flex daily-goal-dates">{this.dateRenders()}</ul>
				</div>
				<ul className="list-group list-group-flush">
					{
						<DailyGoals
							updateCheckMark={updateCheckMark}
							dailyGoals={dailyGoals}
							deleteGoal={deleteGoal}
							negativeLen={state.negativeLen}
							positiveLen={state.positiveLen}
							renderAmount={state.renderAmount}
						/>
					}
				</ul>
			</div>
		);
	}
}
export default DailyGoalHeading;
