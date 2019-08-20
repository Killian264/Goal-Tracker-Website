import React from 'react';
import DailyGoalsList from '../GoalsCompletedList';

function DailyGoalsCompleted(props) {
  const functionProp = goal => (
    <div className="otherdailygoalheading finalProgress">
      <h4>
        {goal.percentComplete}
        %
        <br />
        {' '}
        Completed
        {' '}
        {goal.daysChecked}
        {' '}
        Days
      </h4>
    </div>
  );
  return (
    <div className="othergoals">
      <div className="otherheading">
        <div className="otherheadingheading">
          <h1>Daily</h1>
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
      />
    </div>
  );
}

export default DailyGoalsCompleted;
