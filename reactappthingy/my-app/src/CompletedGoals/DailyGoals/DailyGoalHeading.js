import React, { Component } from 'react';

class DailyGoalHeading extends Component {
    render() {
        return (
            <div className="dailyheading">
                    <div className="dailyheadingheading">
                        <h1>Daily Goals</h1>
                    </div>
                    <ul>
                        <li>Mon<br/>1</li>
                        <li>Tue<br/>2</li>
                        <li>Wed<br/>3</li>
                        <li>Thu<br/>4</li>
                        <li>Fri<br/>5</li>
                        <li>Sat<br/>6</li>
                        <li>Sun<br/>7</li>
                        <li>Del<br/>▼</li>
                    </ul>
                </div>
        )
    }
}
export default DailyGoalHeading