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
		if (goals.otherGoalsCategories !== nextProps.goals.otherGoalsCategories) {
			return true;
		}
		if (goals.dailyGoals.length !== nextProps.goals.dailyGoals.length) {
			return true;
		}
		return false;
	}

	sortLabels(mainLabel, renderIf, name, length, defaultChecked){
		const {updateRenderIfs} = this.props;
		return(
			<label className="radiobtn">
				<span>{mainLabel}</span>
				:
        		{' '}
				{length}
				<input type="radio" onClick={() => updateRenderIfs(renderIf)} name={name} defaultChecked={defaultChecked} />
				<span className="radiocheckmark" />
			</label>
		)
	}

	render() {
		const { goals, updateCategoryRender } = this.props;

		const categoryLabels = goals.otherGoalsCategories.map((categories, index) => {
			if (categories.unCompleted === 0) return null;
			return (
				<label key={categories.id} className="radiobtn" id="renderDaily">
					<span>{categories.category}</span>
					:
          			{' '}
					{categories.unCompleted}
					<input type="checkbox" onClick={() => updateCategoryRender(index)} name="category" defaultChecked />
					<span id="renderDaily" className="radiocheckmark" />
				</label>
			)
		});

		// goal numbers
		const dailyLength = (goals.dailyGoals).length;
		let otherLength = 0;
		let completedLength = (goals.completed.dailyGoals).length;
		goals.otherGoalsCategories.forEach((categories) => { otherLength += categories.unCompleted; completedLength += categories.otherGoals.length - categories.unCompleted;});

		return (
			<div className="goaltypeselector">
				<h2>Sort Goals</h2>
				{this.sortLabels('Current', 'renderCurrent', 'currentOrCompleted', dailyLength + otherLength, true)}
				{this.sortLabels('Completed', 'renderCompleted', 'currentOrCompleted', completedLength, false)}
				<h3>Goal Type</h3>
				{this.sortLabels('All Types', 'allTypes', 'goaltype', dailyLength + otherLength, true)}
				{this.sortLabels('Daily Goals', 'renderDaily', 'goaltype', dailyLength, false)}
				{this.sortLabels('Other Goals', 'renderOther', 'goaltype', otherLength, false)}
				<h3>Categories</h3>
				{categoryLabels}
			</div>
		);
	}
}
export default TypeSelector;
