import React from 'react';
import OtherGoalList from './OtherGoalsCompletedList';

function OtherGoals(props) {
  const { otherGoalCategories } = props;
  const displayOtherGoals = otherGoalCategories.map(category => (
    <div className="othergoals" key={category.id}>
      <div className="otherheading">
        <div className="otherheadingheading">
          <h1>{category.category}</h1>
        </div>
        <div className="otherheadingheading otherheadingheadingtimeframe">
          <h1>TimeFrame</h1>
        </div>
        <div className="otherheadingheading otherheadingheadingyourprogress">
          <h1>Final Progress</h1>
        </div>
      </div>
      <OtherGoalList othergoals={category} />
    </div>
  ));
  return displayOtherGoals;
}

export default OtherGoals;
