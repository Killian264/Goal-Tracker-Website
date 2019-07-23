import React, { Component } from 'react';
import {getToday} from '../commonCommands'

class OtherGoalsList extends Component {
    render() {
        const{othergoals} = this.props;
        const displayOtherGoals = othergoals.otherGoals.map(goal=> {
            // Possibly rework this later to work after component did mount and make it run once only
            let endDate = new Date(goal.endDate);
            let totalDays = Math.abs(new Date(goal.startDate) - endDate) / 8.64e+7;
            let today = getToday();
            let timeLeft = (Math.abs(endDate - new Date(today)) / 8.64e+7).toString().split('.')[0];
            return(
                <div className="othergoalslist" key={goal.id}>
                    <div className="otherdailygoal">
                        <div className="otherdailygoalheading otherdailygoalheadingheading">
                            <ul><h4>{goal.title}</h4>{goal.snippit}</ul>
                        </div>
                        <div className="otherdailygoalheading extendeddailygoaltimeframe">
                            <h4>{totalDays} Total Days<br/>{timeLeft} Days Left</h4>
                        </div>
                        <div className="otherdailygoalheading extendeddailygoalyourprogress">
                            {/* <h1>-</h1>
                            <h4>{goal.percentComplete}%</h4> */}
                            <h1 onClick={() => {this.props.subtractPercentage(goal.id, othergoals.category)}}>−</h1>
                            <h1 onClick={() => {this.props.addPercentage(goal.id, othergoals.category)}}>+</h1>
                            <h4>{goal.percentComplete}%</h4>
                            <div className="close-container"onClick={() => {this.props.deleteGoal(goal.id, othergoals.category)}}>
                                <div className="leftright"></div>
                                <div className="rightleft"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })

        return(
        <div>
            {displayOtherGoals}
        </div>
        )
    }
}
// {goal.startDate.toString().slice(0,10).replace(/-/g,"")}<br/>{goal.endDate.toString().slice(0,10).replace(/-/g,"")}
export default OtherGoalsList