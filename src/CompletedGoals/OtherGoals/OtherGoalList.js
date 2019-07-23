import React, { Component } from 'react';

class OtherGoalsList extends Component {
    render() {
        const{othergoals} = this.props;
        const displayOtherGoals = othergoals.otherGoals.map(goal=> {
            // Possibly rework this later to work after component did mount and make it run once only
            let endDate = new Date(goal.endDate);
            let totalDays = Math.abs(new Date(goal.startDate) - endDate) / 8.64e+7;
            return(
                <div className="othergoalslist" key={goal.id}>
                    <div className="otherdailygoal">
                        <div className="otherdailygoalheading otherdailygoalheadingheading">
                            <ul><h4>{goal.title}</h4>{goal.snippit}</ul>
                        </div>
                        <div className="otherdailygoalheading extendeddailygoaltimeframe">
                            <h4>{totalDays} Total Days<br/> Ended {goal.endDate.split('00:00')[0]}</h4>
                        </div>
                        <div className="otherdailygoalheading extendeddailygoalyourprogress">
                            <h4>{goal.percentComplete}%</h4>
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