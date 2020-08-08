import React, { Component } from "react";
import PropTypes from "prop-types";
import { getYeseterday, formatDate } from "../../helpers/commonCommands";
import '../../css/overlay.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { shapes } from "../../helpers/shapes";

class Overlay extends Component {
	static propTypes = {
		otherGoalCategories: shapes.otherGoalsCategoryShape.isRequired,
		stateAdd: PropTypes.func.isRequired,
		closeGoalOverlay: PropTypes.func.isRequired
	};

	state = {
		title: null,
		snippit: null,
		endDate: null,
		type: "daily",
		category: "daily",
		newCategory: true,
		error: "",
	};

	onChange = e => {
		e.preventDefault();
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	categoryOnChange = e => {
		const { value } = e.target;
		const tF = value === "newCategory";
		this.setState({
			type: value,
			category: tF ? value : "otherCategory",
			newCategory: tF,
		});
	};

	onSubmit = e => {
		e.preventDefault();
		const { endDate, type, title, newCategory, category } = this.state;
		let error;
		if (new Date(endDate) < new Date(getYeseterday())) error = "Date cannot be before today.";
		if (!(type === "daily") && newCategory && category === null) error = "Please add a category.";
		if (!title || !endDate) error = "Plese fillout all fields.";

		!error ? this.props.stateAdd(this.state) : this.setState({ error: error });
	};

	render() {
		const { otherGoalCategories, closeGoalOverlay } = this.props;
		const { type, error, endDate, newCategory } = this.state;
		const categories = otherGoalCategories.map((category, index) => (
			<option key={index} value={index}>
				{" "}
				{category.category}
			</option>
		));

		return (
			<div className="goaloverlay">
				<button onClick={closeGoalOverlay} className="close"></button>
				<form name="form" onSubmit={this.handleSubmit}>
					<div className="input-wrap">
						<input className="titleinput" type="text" name="title" value={this.props.title}
							onChange={this.onChange} placeholder="Add title" />
					</div>
					<div className="input-wrap input-wrap-snippit">
						<input className="snippitinput" type="text" name="snippit" value={this.props.title}
							onChange={this.onChange} placeholder="Add snippit" />
					</div>
					<div className="button-wrap">
						<button className={"btn btn-sm " + (type === "daily" ? "btn-dark" : "btn-outline-dark")} onClick={this.onChange} tabIndex="0" name="type" value="daily">
							Recurring
            			</button>

						<button className={"btn btn-sm ml-2 " + (type === "daily" ? "btn-outline-dark" : "btn-dark")} onClick={this.onChange} tabIndex="0" name="type" value="default">
							Static
            			</button>
					</div>
					<span className="span-date">End Date:</span>
					<div className="date-picker-wrapper">
						<div className="date-picker">
							<DatePicker
								className={"date-picker-font"}
								selected={endDate ? new Date(endDate) : null}
								onChange={date => this.setState({ endDate: formatDate(date) })}
								placeholderText="Click to select a date"
							/>
						</div>
					</div>
					{type !== "daily" &&
						<div className="category">
							<span className="span-date">Category:</span>
							<select className="form-control-sm" name="category"
								id="category"
								onChange={this.categoryOnChange}
							>
								<option value="newCategory"> New Category</option>
								{categories}
							</select>
						</div>}
					{(type !== "daily" && newCategory) &&
						<div className="new-category">
							<span className="span-date">New Category:</span>
							<br />
							<input
								className="input-wrap-nopadding"
								name="category"
								placeholder={"Category"}
								onChange={this.onChange}
							/>
						</div>}
					{error && <span className="error-msg">{error}</span>}
					<div className="d-flex justify-content-end">
						<button tabIndex="0" className="btn btn-sm btn-dark mt-2 mr-4" onClick={this.onSubmit}>Create Goal</button>
					</div>
				</form>
			</div>
		);
	}
}

export default Overlay;
