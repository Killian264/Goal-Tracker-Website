import React, { Component } from 'react';

class DailyGoals extends Component {
    onClick = (e) => {
        this.props.deleteGoal(e.target.title, 'daily')
    }
    render() {
        const{dailyGoals, deleteGoal} = this.props;
        const displayCheckBoxes = (goal) =>{
            // let len = document.querySelector('.dailyheading').clientWidth;
            let len = 9
            for(let i = 0; i < len; i++){
                return(
                    <React.Fragment>
                    <div className="onedailygoalcheckmark">
                    <ul>
                    <li>
                        <label className="checkbox">
                            <input type="checkbox" checked={goal.weeklyChecked[0]} readOnly={true}/>
                            <span className="checkmark"></span>
                        </label>
                    </li>
                    <li>
                        <label className="checkbox">
                            <input type="checkbox" checked={goal.weeklyChecked[1]} readOnly={true}/>
                            <span className="checkmark"></span>
                        </label>
                    </li>
                    <li>
                        <label className="checkbox">
                            <input type="checkbox" checked={goal.weeklyChecked[2]} readOnly={true}/>
                            <span className="checkmark"></span>
                        </label>
                    </li>
                    <li>
                        <label className="checkbox">
                            <input type="checkbox" checked={goal.weeklyChecked[3]} readOnly={true}/>
                            <span className="checkmark"></span>
                        </label>
                    </li>
                    <li>
                        <label className="checkbox">
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                        </label>
                    </li>
                    <li>
                        <label className="checkbox">
                            <input type="checkbox" checked={goal.weeklyChecked[5]} readOnly={true}/>
                            <span className="checkmark"></span>
                        </label>
                    </li>
                    <li>
                        <label className="checkbox">
                            <input type="checkbox" checked={goal.weeklyChecked[6]} readOnly={true}/>
                            <span className="checkmark"></span>
                        </label>
                    </li>
                    <li className="close-container"onClick={() => {this.props.deleteGoal(goal.id, 'daily')}}>
                        <div className="leftright"></div>
                        <div className="rightleft"></div>
                        <label className="close">close</label>
                    </li>
                    </ul>
                    </div>
                    </React.Fragment>
                )
            }
        }
        const displayDailyGoals = dailyGoals.map(goal => {
            return(
                <div className="onedailygoal" key={goal.id}>
                    <div className="onedailygoalheading" >
                        <h4>{goal.title}</h4>{goal.snippit}
                    </div>
                    {displayCheckBoxes(goal)}
                </div>
            )
        })

        return (
            <div>
                { displayDailyGoals }
            </div>
        )
    }
}
export default DailyGoals
