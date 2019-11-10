import React from "react";
import DeleteElement from "../DailyGoals/DeleteElement";
import PropTypes from 'prop-types';

function DailyGoalsCompleted(props) {
    const displayGoals = props.dailyGoals.map((goal, index) => {
        const totalDays =
            Math.abs(new Date(goal.endDate) - new Date(goal.startDate)) /
            8.64e7;
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
                            <br /> Ended{" "}
                            {goal.endDate.toString().split("00:00:00")[0]}
                        </h4>
                    </div>
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
                </div>
            </div>
        );
    });

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
            {displayGoals}
        </div>
    );
}
DailyGoalsCompleted.propTypes = {
    deleteGoal: PropTypes.func.isRequired,
    dailyGoals: PropTypes.array.isRequired,
}

export default DailyGoalsCompleted;
