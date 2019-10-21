import React from "react";
import DailyGoalsList from "../GoalsCompletedList";
import DeleteElement from "../../DailyGoals/DeleteElement";

function DailyGoalsCompleted(props) {
  const functionProp = (goal, index) => (
    <div className="otherdailygoalheading finalProgress">
      <h4>
        {goal.percentComplete}
        %
        <br /> Completed {goal.daysChecked} Days
      </h4>
      <DeleteElement
        deleteGoal={props.deleteGoal}
        goalLoc={index}
        categoryLoc={-1}
        isDaily={true}
      ></DeleteElement>
    </div>
  );
  return (
    <div className="othergoals">
      <div className="otherheading">
        <div className="otherheadingheading">
          <h1>Daily Goals</h1>
        </div>
        <div className="otherheadingheading otherheadingheadingtimeframe">
          <h1>TimeFrame</h1>
        </div>
        <div className="otherheadingheading otherheadingheadingyourprogress">
          <h1>Final Progress</h1>
        </div>
      </div>
      <DailyGoalsList
        goals={props.dailyGoals}
        functionProp={functionProp}
        deleteGoal={props.deleteGoal}
      />
    </div>
  );
}

export default DailyGoalsCompleted;
