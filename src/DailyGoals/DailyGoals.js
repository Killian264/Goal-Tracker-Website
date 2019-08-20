import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DeleteElement from './DeleteElement';

class DailyGoals extends Component {
  static propTypes = {
    dailyGoals: PropTypes.arrayOf(PropTypes.object).isRequired,
    updateCheckMark: PropTypes.func.isRequired,
    deleteGoal: PropTypes.func.isRequired,
    negativeLen: PropTypes.number.isRequired,
    positiveLen: PropTypes.number.isRequired,
    renderAmount: PropTypes.number.isRequired,
  };

  // shouldComponentUpdate(nextProps) {
  //   console.log(this.props.dailyGoals, nextProps.dailyGoals);
  //   if (this.props.dailyGoals !== nextProps.dailyGoals) {
  //     return true;
  //   }
  //   if (this.props.renderAmount !== nextProps.renderAmount) {
  //     return true;
  //   }
  //   return false;
  // }

    listElement = (goal, i) => (
      <li key={i}>
        <label className="checkbox">
          <input type="checkbox" checked={goal.weeklyChecked[i]} readOnly />
          <span className="checkmark" />
        </label>
      </li>
    )

    dateRenders = (goal) => {
      const {
        renderAmount, updateCheckMark, positiveLen, negativeLen,
      } = this.props;
      const list = [];
      if (renderAmount !== 2) {
        for (let i = (4 - negativeLen); i <= 3; i += 1) {
          list.push(this.listElement(goal, (i)));
        }
      }
      list.push(
        <li key={4}>
          <label className="checkbox checkboxmain">
            <input type="checkbox" checked={goal.weeklyChecked[4]} readOnly onClick={() => { updateCheckMark(goal.id); }} />
            <span className="checkmark" />
          </label>
        </li>,
      );
      for (let i = (4 - positiveLen); i <= 3; i += 1) {
        list.push(this.listElement(goal, (i)));
      }
      return (
        [list]
      );
    }

    render() {
      const { dailyGoals, deleteGoal } = this.props;
      const displayCheckBoxes = goal => (
        <ul>
          {this.dateRenders(goal) }
          <DeleteElement id={goal.id} deleteGoal={deleteGoal} category="daily" />
        </ul>
      );
      const displayDailyGoals = dailyGoals.map(goal => (
        <div className="onedailygoal" key={goal.id} ref={this.heading}>
          <div className="onedailygoalheading">
            <h4>{goal.title}</h4>
            {goal.snippit}
          </div>
          {displayCheckBoxes(goal)}
        </div>
      ));

      return (
        <div className="onedailygoalcheckmark">
          { displayDailyGoals }
        </div>
      );
    }
}
export default DailyGoals;
