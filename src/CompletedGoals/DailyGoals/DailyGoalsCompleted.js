import React from 'react';
import DailyGoalsList from './DailyGoalsCompletedList';

function DailyGoalsCompleted(props) {
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
      <DailyGoalsList dailyGoals={props.dailyGoals} />
    </div>
  );
}

export default DailyGoalsCompleted;
