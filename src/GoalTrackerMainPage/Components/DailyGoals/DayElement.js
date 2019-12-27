import React from "react";
import PropTypes from "prop-types";
import { getWeekDay, getMonthDay } from "../commonCommands";

function DayElement(props) {
	const { i } = props;
	return (
		<li key={11}>
			{getWeekDay(i)}
			<br />
			{getMonthDay(i)}
		</li>
	);
}

DayElement.propTypes = {
	i: PropTypes.number.isRequired
};

export default DayElement;
