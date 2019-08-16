import React from 'react';

function OtherGoalsList(props) {
  const { othergoals } = props;
  const displayOtherGoals = othergoals.otherGoals.map((goal) => {
    // Possibly rework this later to work after component did mount and make it run once only
    const endDate = new Date(goal.endDate);
    const totalDays = Math.abs(new Date(goal.startDate) - endDate) / 8.64e+7;
    return (
      <div className="othergoalslist" key={goal.id}>
        <div className="otherdailygoal">
          <div className="otherdailygoalheading otherdailygoalheadingheading">
            <div>
              <h4>{goal.title}</h4>
              {goal.snippit}
            </div>
          </div>
          <div className="otherdailygoalheading extendeddailygoaltimeframe">
            <h4>
              {totalDays}
              {' '}
                Total Days
              <br />
              {' '}
                Ended
              {' '}
              {goal.endDate.split('00:00')[0]}
            </h4>
          </div>
          <div className="otherdailygoalheading extendeddailygoalyourprogress">
            <h4>
              {goal.percentComplete}
                %
            </h4>
          </div>
        </div>
      </div>
    );
  });
  return displayOtherGoals;
}

export default OtherGoalsList;
