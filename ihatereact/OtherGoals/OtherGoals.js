import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OtherGoalList from './OtherGoalList';

class OtherGoals extends Component {
  static propTypes = {
    otherGoalCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
    addPercentage: PropTypes.func.isRequired,
    subtractPercentage: PropTypes.func.isRequired,
    deleteGoal: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    const { otherGoalCategories } = this.props;
    if (otherGoalCategories === nextProps.otherGoalCategories) {
      return false;
    }
    return true;
  }

  render() {
    const {
      otherGoalCategories, deleteGoal, addPercentage, subtractPercentage,
    } = this.props;
    const displayOtherGoals = otherGoalCategories.map((category) => {
      if (category.render === false) { return (null); }

      return (
        <div className="othergoals" key={category.id}>
          <div className="otherheading">
            <div className="otherheadingheading">
              <h1>{category.category}</h1>
            </div>
            <div className="otherheadingheading otherheadingheadingtimeframe">
              <h1>TimeFrame</h1>
            </div>
            <div className="otherheadingheading otherheadingheadingyourprogress">
              <h1>Your Progress</h1>
            </div>
          </div>
          <OtherGoalList othergoals={category} deleteGoal={deleteGoal} addPercentage={addPercentage} subtractPercentage={subtractPercentage} />
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
