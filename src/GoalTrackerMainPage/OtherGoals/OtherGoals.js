import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OtherGoalList from './OtherGoalList';
import OtherGoalsCompleted from '../CompletedGoals/OtherGoals/OtherGoalsCompleted'

class OtherGoals extends Component {
  static propTypes = {
    otherGoalCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
    completeGoal: PropTypes.func.isRequired,
    deleteGoal: PropTypes.func.isRequired,
    displayCompleted: PropTypes.bool.isRequired
  };

  shouldComponentUpdate(nextProps) {
    const { otherGoalCategories } = this.props;
    if (otherGoalCategories === nextProps.otherGoalCategories) {
      return false;
    }
    return true;
  }

  render() {
    const {otherGoalCategories, deleteGoal, completeGoal, displayCompleted} = this.props;
    const displayOtherGoals = otherGoalCategories.map((category, index) => {
      if (category.render === false) { return (null); }
      return (
        <div className="othergoals" key={category.id}>
          <div className="otherheading">
            <div className="otherheadingheading">
              <h1>{category.category}</h1>
            </div>
            {/* <div className="otherheadingheading otherheadingheadingtimeframe">
              <h1>TimeFrame</h1>
            </div>
            <div className="otherheadingheading otherheadingheadingyourprogress">
              <h1>Your Progress</h1>
            </div> */}
          </div>
          <OtherGoalList othergoals={category} deleteGoal={deleteGoal} completeGoal={completeGoal} categoryLoc={index} displayCompleted={displayCompleted}/>
        </div>
      );
    });

    return (
      <div>
        {displayOtherGoals}
      </div>
    );
  }
}
export default OtherGoals;
