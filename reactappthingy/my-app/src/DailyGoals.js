import React, { Component } from 'react';
import './App.css';

class DailyGoals extends Component {
    render() {
        const{dailyGoals} = this.props;
        const displayDailyGoals = dailyGoals.map(goal => {
            return(
                <div className="onedailygoal">
                    <div className="onedailygoalheading" key={goal.id}>
                        <h4>{goal.title}</h4>{goal.snippit}
                    </div>
                    <div className="onedailygoalcheckmark">
                        <ul>
                        <li>
                                <label className="checkbox">
                                    <input type="checkbox" />
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
                                    <input type="checkbox" />
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
                                    <input type="checkbox" />
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
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                </label>
                            </li>
                            <li>
                                <label className="checkbox">
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
            )
        })

        return (
            <div>
                {console.log(dailyGoals)}
                { displayDailyGoals }
                {console.log(document.querySelector('.dailyheading').clientWidth)}
            </div>
        )
    }
}

export default DailyGoals
