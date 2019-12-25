import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {shapes} from "../../helpers/shapes";

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

  render() {
    const { goals, updateCategoryRender, updateRenderIfs } = this.props;

    const renderSelector = goals.otherGoalsCategories.map((categories, index) => {
      if(categories.unCompleted === 0) return;
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
    const sortLabels = (mainLabel, renderIf, name, length, defaultChecked) => (
      <label className="radiobtn">
        <span>{mainLabel}</span>
          :
        {' '}
        {length}
        <input type="radio" onClick={() => updateRenderIfs(renderIf)} name={name} defaultChecked={defaultChecked} />
        <span className="radiocheckmark" />
      </label>
    );

    const getLengths = () => {
      const dailyLength = (goals.dailyGoals).length;

      let otherLength = 0;
      goals.otherGoalsCategories.forEach((categories) => { otherLength += categories.unCompleted; });

      let completedLength = (goals.completed.dailyGoals).length;
      goals.otherGoalsCategories.forEach((categories) => { completedLength += categories.otherGoals.length -  categories.unCompleted; });

      return (
        <div className="goaltypeselector">
          <h2>Sort Goals</h2>
          {sortLabels('Current', 'renderCurrent', 'currentOrCompleted', dailyLength + otherLength, true)}
          {sortLabels('Completed', 'renderCompleted', 'currentOrCompleted', completedLength, false)}
          <h3>Goal Type</h3>
          {sortLabels('All Types', 'allTypes', 'goaltype', dailyLength + otherLength, true)}
          {sortLabels('Daily Goals', 'renderDaily', 'goaltype', dailyLength, false)}
          {sortLabels('Other Goals', 'renderOther', 'goaltype', otherLength, false)}
          <h3>Categories</h3>
          {renderSelector}
        </div>
      );
    };

    return (
      <React.Fragment>
        {getLengths()}
      </React.Fragment>
    );
  }
}
export default TypeSelector;
