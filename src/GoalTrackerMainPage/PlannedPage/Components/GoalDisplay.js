import React, { Component } from "react";
import PropTypes from "prop-types";
import { getToday, getDayAbbr, getMonthAbbr } from "../../../helpers/commonCommands";
import DeleteElement from "../../Components/DeleteElement";
import Checkmark from "../../Components/Checkmark";

import {shapes} from "../../../helpers/shapes";

class GoalDisplay extends Component {
  static propTypes = {
    otherGoals: shapes.otherGoalShape.isRequired,
    deleteGoal: PropTypes.func.isRequired,
    completeGoal: PropTypes.func.isRequired
  };

  TimeFrame = goal => {
    let endDate = new Date(goal.endDate);
    let timeLeft = (Math.abs(endDate - new Date(getToday())) / 8.64e7).toString();

    return (
      <div className="otherdailygoalheading extendeddailygoaltimeframe">
        <h4>
          {timeLeft.toString().split(".")[0] += timeLeft === 1 ? " Day Left" : " Days Left"}
          <br />
          {getDayAbbr(endDate) + ", " + getMonthAbbr(endDate) + " " + endDate.getDate()}
        </h4>
      </div>
    );
  };

  render() {
    const { otherGoals, deleteGoal, completeGoal } = this.props;

    const displayOtherGoals = otherGoals.map((goal, index) => {
      return (
        <div className="otherdailygoal" key={goal.id}>
          <div className="otherdailygoalheading otherdailygoalheadingheading">
            <div>
              <h4>{goal.title}</h4>
              {"-" + goal.category}
            </div>
          </div>
          {this.TimeFrame(goal)}
          <div className="extendeddailygoalyourprogress otherdailygoalheading">
              <div className="othergoalprogress">
                <Checkmark
                  completeGoal={completeGoal}
                  goalLoc={goal.goalIndex}
                  categoryLoc={goal.categoryIndex}
                />
                <DeleteElement
                  deleteGoal={deleteGoal}
                  goalLoc={goal.goalIndex}
                  categoryLoc={goal.categoryIndex}
                  isDaily={false}
                />
              </div>
          </div>
        </div>
      );
    });

    return <React.Fragment>{displayOtherGoals}</React.Fragment>;
  }
}

export default GoalDisplay;
