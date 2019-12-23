import React, { Component } from "react";
import PropTypes from "prop-types";
import { getToday, getDayAbbr, getMonthAbbr } from "../../../helpers/commonCommands";
import DeleteElement from "../DailyGoals/DeleteElement";
import Checkmark from "./Checkmark";
import { formatRelative } from "date-fns";
// import OtherGoalsCompleted from '../CompletedGoals/OtherGoals/OtherGoalsCompleted'

class OtherGoalsList extends Component {
  static propTypes = {
    othergoals: PropTypes.object.isRequired,
    deleteGoal: PropTypes.func.isRequired,
    completeGoal: PropTypes.func.isRequired
  };

  TimeFrame = goal => {
    const endDate = new Date(goal.endDate);
    const totalDays = (Math.abs(new Date(goal.startDate) - endDate) / 8.64e7) + 1;
    let timeLeft = (Math.abs(endDate - new Date(getToday())) / 8.64e7).toString();
    // let timeLeft = (Math.abs(endDate - new Date(getToday())) / 8.64e7).toString().split(".")[0];
    return (
      <div className="otherdailygoalheading extendeddailygoaltimeframe">
        <h4>
          {goal.isCompleted ? totalDays.toString().split(".")[0] + " Total Days" : timeLeft.toString().split(".")[0] += timeLeft == 1 ? " Day Left" : " Days Left"}
          <br />
          {goal.isCompleted ? "Ended " + goal.endDate.toString().split("T")[0] : getDayAbbr(endDate) + ", " + getMonthAbbr(endDate) + " " + endDate.getDate()}
        </h4>
      </div>
    );
  };
  render() {
    const { othergoals, deleteGoal, completeGoal, categoryLoc, displayCompleted } = this.props;
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
