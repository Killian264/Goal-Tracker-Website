import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom';

class DailyGoals extends Component {
    render() {
        const{dailyGoals} = this.props;
        const displayCheckBoxes = (goal) =>{
            let len = document.querySelector('.dailyheading').clientWidth;
            len = len/80;
            for(let i = 0; i < len; i++){
                console.log(i);
                return(
                    <React.Fragment>
                    <li>
                        <label className="checkbox">
                            <input type="checkbox" checked={goal.weeklyChecked[0]}/>
                            <span className="checkmark"></span>
                        </label>
                    </li>
                    <li>
                        <label className="checkbox">
                            <input type="checkbox" checked={goal.weeklyChecked[1]}/>
                            <span className="checkmark"></span>
                        </label>
                    </li>
                    <li>
                        <label className="checkbox">
                            <input type="checkbox" checked={goal.weeklyChecked[2]}/>
                            <span className="checkmark"></span>
                        </label>
                    </li>
                    <li>
                        <label className="checkbox">
                            <input type="checkbox" checked={goal.weeklyChecked[3]}/>
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
                            <input type="checkbox" checked={goal.weeklyChecked[5]}/>
                            <span className="checkmark"></span>
                        </label>
                    </li>
                    <li>
                        <label className="checkbox">
                            <input type="checkbox" checked={goal.weeklyChecked[6]}/>
                            <span className="checkmark"></span>
                        </label>
                    </li>
                    <li>
                        <label className="checkbox">
                            <input type="checkbox" checked={goal.weeklyChecked[7]}/>
                            <span className="checkmark"></span>
                        </label>
                    </li>
                    </React.Fragment>
                )
            }
        }
        const displayDailyGoals = dailyGoals.map(goal => {
            return(
                <div className="onedailygoal">
                    <div className="onedailygoalheading" key={goal.id}>
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
                {console.log(dailyGoals)}
                { displayDailyGoals }
                {console.log(document.querySelector('.dailyheading').clientWidth/80)}
            </div>
        )
    }
}
export default DailyGoals
