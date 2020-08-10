import React from "react";
import DeleteElement from "../DeleteElement";
import PropTypes from 'prop-types';
import {shapes} from "../../../helpers/shapes";

function DailyGoalsCompleted(props) {
    const displayGoals = props.dailyGoals.map((goal, index) => {
        const totalDays = (Math.abs(new Date(goal.endDate) - new Date(goal.startDate)) / 8.64e7) + 1;
        return (
            <li className="list-group-item p-0 m-0" key={goal.id}>
                <div className="d-flex justify-content-between mx-3 my-1">
                    <div className="other-goal-width no-select my-auto">
                        <div style={{ textDecoration: "line-through" }}>
                            {goal.title}
                            <p >- {' '}{goal.snippit}</p>
                        </div>
                    </div>
                    {/* FINISHED DAILY GOALS MIGHT NEED TO BE FIXED */}
                    <div className="w-140 text-center my-auto" style={{ textDecoration: "line-through" }}>
                        {goal.daysChecked}/{totalDays} Days
                        <br /> Ended{" "}
                        {goal.endDate.toString()}
                    </div>
                    <div className="other-goal-width-end d-flex justify-content-end my-auto no-select">
                        {/* {goal.percentComplete}
                        %
                        <br /> Completed {goal.daysChecked} Days */}
                        <DeleteElement
                            deleteGoal={props.deleteGoal}
                            goalLoc={index}
                            categoryLoc={-1}
                            isDaily={true}
                        ></DeleteElement>
                    </div>
                </div>
            </li>
        );
    });

    return (
        <div className="card mb-3">
            <div className="card-header pl-3">
                <h3>Daily Goals</h3>
            </div>
            <ul className="list-group list-group-flush">
                {displayGoals}
            </ul>
        </div>
    );
}
DailyGoalsCompleted.propTypes = {
    deleteGoal: PropTypes.func.isRequired,
    dailyGoals: PropTypes.arrayOf(shapes.completedDailyGoalShape).isRequired,
}

export default DailyGoalsCompleted;
