import React from "react";
import DeleteElement from "../DailyGoals/DeleteElement";
function GoalsCompletedList(props) {
  const { goals, functionProp } = props;
  const displayGoals = goals.map((goal, index) => {
    const totalDays =
      Math.abs(new Date(goal.endDate) - new Date(goal.startDate)) / 8.64e7;
    return (
      <div className="othergoalslist" key={goal.id}>
        <div className="otherdailygoal">
          <div className="otherdailygoalheading otherdailygoalheadingheading">
            <div style={{ textDecoration: "line-through" }}>
              <h4>{goal.title}</h4>
              {goal.snippit}
            </div>
          </div>
          <div className="otherdailygoalheading extendeddailygoaltimeframe">
            <h4>
              {totalDays} Total Days
              <br /> Ended {goal.endDate.toString().split("00:00:00")[0]}
            </h4>
          </div>
          {functionProp(goal, index)}
        </div>
      </div>
    );
  });

  return displayGoals;
}

export default GoalsCompletedList;
