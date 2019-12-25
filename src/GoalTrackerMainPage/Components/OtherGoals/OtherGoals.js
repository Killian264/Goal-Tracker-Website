import React, { Component } from "react";
import PropTypes from "prop-types";
import OtherGoalList from "./OtherGoalList";
// import OtherGoalsCompleted from '../CompletedGoals/OtherGoals/OtherGoalsCompleted'

import {shapes} from "../../../helpers/shapes";

class OtherGoals extends Component {
  static propTypes = {
    otherGoalCategories: PropTypes.arrayOf(shapes.otherGoalsCategoryShape).isRequired,
    completeGoal: PropTypes.func.isRequired,
    deleteGoal: PropTypes.func.isRequired,
    displayCompleted: PropTypes.bool.isRequired
  };

  shouldComponentUpdate(nextProps) {
    const { otherGoalCategories, displayCompleted } = this.props;
    if (
      otherGoalCategories === nextProps.otherGoalCategories &&
      displayCompleted === nextProps.displayCompleted
    ) {
      return false;
    }
    return true;
  }

  render() {
    const {
      otherGoalCategories,
      deleteGoal,
      completeGoal,
      displayCompleted
    } = this.props;
    const displayOtherGoals = otherGoalCategories.map((category, index) => {
      if (category.render === false) {
        return null;
      }
      if (
        (!displayCompleted && category.unCompleted === 0) ||
        (displayCompleted &&
          category.unCompleted - category.otherGoals.length === 0)
      ) {
        return null;
      }
      return (
        <div className="othergoals" key={category.id}>
          <div className="otherheading">
            <div className="otherheadingheading">
              <h1>{category.category}</h1>
            </div>
          </div>
          <OtherGoalList
            otherGoals={category.otherGoals}
            deleteGoal={deleteGoal}
            completeGoal={completeGoal}
            categoryLoc={index}
            displayCompleted={displayCompleted}
          />
        </div>
      );
    });

    return <div>{displayOtherGoals}</div>;
  }
}
export default OtherGoals;
