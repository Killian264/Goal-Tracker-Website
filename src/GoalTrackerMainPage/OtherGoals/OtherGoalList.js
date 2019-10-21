import React, { Component } from "react";
import PropTypes from "prop-types";
import { getToday } from "../commonCommands";
import DeleteElement from "../DailyGoals/DeleteElement";
import Checkmark from "./Checkmark";
// import OtherGoalsCompleted from '../CompletedGoals/OtherGoals/OtherGoalsCompleted'

class OtherGoalsList extends Component {
  static propTypes = {
    othergoals: PropTypes.object.isRequired,
    deleteGoal: PropTypes.func.isRequired,
    completeGoal: PropTypes.func.isRequired
  };

  // shouldComponentUpdate(nextProps) {
  // 	const { othergoals } = this.props;
  // 	if (othergoals === nextProps.othergoals) {
  // 		return false;
  // 	}
  // 	return true;
  // }

  TimeFrame = goal => {
    const endDate = new Date(goal.endDate);
    const totalDays = Math.abs(new Date(goal.startDate) - endDate) / 8.64e7;
    const timeLeft = (Math.abs(endDate - new Date(getToday())) / 8.64e7)
      .toString()
      .split(".")[0];
    return (
      <div className="otherdailygoalheading extendeddailygoaltimeframe">
        <h4>
          {totalDays.toString().split(".")[0]} Total Days
          <br />
          {goal.isCompleted
            ? "Ended " + goal.endDate.toString().split("00:00:00")[0]
            : timeLeft + " Days Left"}
        </h4>
      </div>
    );
  };
  render() {
    const {
      othergoals,
      deleteGoal,
      completeGoal,
      categoryLoc,
      displayCompleted
    } = this.props;
    let strikethrough = {
      textDecoration: "line-through"
    };
    const displayOtherGoals = othergoals.otherGoals.map((goal, index) => {
      // add stuff for daily thingy
      if (
        (goal.isCompleted && !displayCompleted) ||
        (!goal.isCompleted && displayCompleted)
      )
        return null;
      return (
        <div className="otherdailygoal" key={goal.id}>
          <div className="otherdailygoalheading otherdailygoalheadingheading">
            <div style={goal.isCompleted ? strikethrough : {}}>
              <h4>{goal.title}</h4>
              {goal.snippit}
            </div>
          </div>
          {this.TimeFrame(goal)}
          <div className="extendeddailygoalyourprogress otherdailygoalheading">
            {goal.isCompleted ? (
              // needs to be fixed
              <div className="othergoalprogress">
                <DeleteElement
                  deleteGoal={deleteGoal}
                  goalLoc={index}
                  categoryLoc={categoryLoc}
                  isDaily={false}
                />
              </div>
            ) : (
              <div className="othergoalprogress">
                <Checkmark
                  completeGoal={completeGoal}
                  goalLoc={index}
                  categoryLoc={categoryLoc}
                />
                <DeleteElement
                  deleteGoal={deleteGoal}
                  goalLoc={index}
                  categoryLoc={categoryLoc}
                  isDaily={false}
                />
              </div>
            )}
          </div>
        </div>
      );
    });

    return <React.Fragment>{displayOtherGoals}</React.Fragment>;
  }
}

export default OtherGoalsList;
