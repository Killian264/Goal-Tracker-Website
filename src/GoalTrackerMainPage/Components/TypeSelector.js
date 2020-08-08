import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { shapes } from "../../helpers/shapes";

class TypeSelector extends Component {
	static propTypes = {
		goals: shapes.goalShape.isRequired,
		updateCategoryRender: PropTypes.func.isRequired,
		updateRenderIfs: PropTypes.func.isRequired,
	};

	shouldComponentUpdate(nextProps) {
		const { goals } = this.props;
		return (
			goals.otherGoalsCategories !== nextProps.goals.otherGoalsCategories || 
			goals.dailyGoals.length !== nextProps.goals.dailyGoals.length
		)
	}

	sortRadio(data){
		const {updateRenderIfs} = this.props;
		const {label, render, name, length, checked, id} = data;
		return(
			<div className="form-check form-check-inline py-2" style={{fontFamily: "Poppins-Medium", fontSize: "15px"}} >
				<input style={style.minWidth} className="form-check-input" type="radio" id={id} name={name} defaultChecked={checked} onClick={() => updateRenderIfs(render)}/>
				<label className="form-check-label" htmlFor={id}>
					{label}:{' '}{length}
				</label>
			</div>
		)
	}

	sortCheckbox(data, index){
		const {id, category, unCompleted, render} = data;
		const { updateCategoryRender } = this.props;

		if (unCompleted === 0) return null;
		return (
			<div className="form-check form-check-inline py-2" style={{fontFamily: "Poppins-Medium", fontSize: "15px"}} key={id}>
				<input className="form-check-input" style={style.minWidth} type="checkbox" id={id} defaultChecked={render} onClick={() => updateCategoryRender(index)}/>
				<label className="form-check-label no-select" htmlFor={id}>
					{category} :{' '}{unCompleted}
				</label>
			</div>
		)
	}

	render() {
		const { goals } = this.props;

		const categoryLabels = goals.otherGoalsCategories.map((category, index) => {
			return this.sortCheckbox(category, index)
		});

		// goal numbers
		const dailyLength = (goals.dailyGoals).length;
		let dailyCompletedLength = (goals.completed.dailyGoals).length;
		let otherLength = 0;
		goals.otherGoalsCategories.forEach((category) => { 
				otherLength += category.unCompleted; 
				dailyCompletedLength += category.otherGoals.length - category.unCompleted;
			}
		);
		return (
			<div className="type-selector d-flex flex-column px-3 pt-2 pb-3 noselect">
				<h2 className="p-0" >Sort By</h2>
				<hr style={style.divider}/>
				<div className="d-flex flex-column pl-2">
					{/* {this.sortRadio('Current', 'renderCurrent', 'currentOrCompleted', dailyLength + otherLength, true, 1)}
					{this.sortRadio('Completed', 'renderCompleted', 'currentOrCompleted', dailyCompletedLength, false, 2)} */}
					{this.sortRadio(
						{
							label: 'Current', 
							render: 'renderCurrent', 
							name: 'currentOrCompleted', 
							length: dailyLength + otherLength, 
							checked: true, 
							id: 1
						}
					)}
					{this.sortRadio(
						{
							label: 'Completed', 
							render: 'renderCompleted', 
							name: 'currentOrCompleted', 
							length: dailyCompletedLength, 
							checked: false, 
							id: 2
						}
					)}
				</div>
				<h4>Type</h4>
				<hr style={style.divider}/>
				<div className="d-flex flex-column pl-2">
					{this.sortRadio(
						{
							label: 'All', 
							render: 'allTypes', 
							name: 'goaltype', 
							length: dailyLength + otherLength, 
							checked: true, 
							id: 3
						}
					)}
					{this.sortRadio(
						{
							label: 'Recurring', 
							render: 'renderDaily', 
							name: 'goaltype', 
							length: dailyLength, 
							checked: false, 
							id: 4
						}
					)}
					{this.sortRadio(
						{
							label: 'Static', 
							render: 'renderOther', 
							name: 'goaltype', 
							length: otherLength, 
							checked: false, 
							id: 5
						}
					)}
					{/* {this.sortRadio('Daily', 'renderDaily', 'goaltype', dailyLength, false, 4)}
					{this.sortRadio('Other', 'renderOther', 'goaltype', otherLength, false, 5)} */}
				</div>
				<h4>Category</h4>
				<hr style={style.divider}/>
				<div className="d-flex flex-column pl-2">
					{categoryLabels}
				</div>
			</div>
		);
	}
}

const style = {
	divider: {
		margin: "0",
		marginBottom: "2px",
		marginTop: "-4px",
		border: "0",
		borderTop: "1px solid rgba(0, 0, 0, 0.1)",
	},
	minWidth:{
		minWidth: "23px",
		minHeight: "23px",
	}
}


export default TypeSelector;
