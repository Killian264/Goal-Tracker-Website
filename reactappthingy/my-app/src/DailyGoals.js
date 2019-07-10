import React, { Component } from 'react';
import './App.css';

class DailyGoals extends Component {
    render() {
        const{dailyGoals} = this.props;
        const displayCheckBoxes = (goal) =>{
            // let len = document.querySelector('.dailyheading').clientWidth;
            let len = 1000;
            len = len/80;
            for(let i = 0; i < len; i++){
                return(
                    <React.Fragment>
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
                    <li>
                        <label className="checkbox">
                            <input type="checkbox" checked={goal.weeklyChecked[7]} readOnly={true}/>
                            <span className="checkmark"></span>
                        </label>
                    </li>
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
                    <div className="onedailygoalcheckmark">
                        <ul>
                        {displayCheckBoxes(goal)}
                        </ul>
                    </div>
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
