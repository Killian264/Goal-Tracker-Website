import React, { Component } from 'react';
import './App.css';
import Overlay from './Overlay';

class TopNav extends Component {
    state = {
        isHidden: true
    }
    render() {
        const displayGoalOverlay = () => {
            this.setState({
                isHidden: false
              })
        }

        return(
        <React.Fragment>
            <div className="topnav">
                    <div className = "navdropdown">
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </div>
                    <h1>Current Goals</h1>
                    <div className="creategoalbutton">
                            <button id="button" onClick={displayGoalOverlay}>Create Goal</button>
                    </div>
                </div>
                {!this.state.isHidden && <Overlay/>}
        </React.Fragment>
        )
    }
}

export default TopNav