import React, { Component } from 'react';
import './App.css';

class TypeSelector extends Component {
    state = {
        dailyLength: 0,
        otherLength: 0,
        completedLength: 0
    }
    render() {
        const{goals} = this.props.goals;

        const getLengths = () =>{
            let state = this.state;
            let length = 0
            let lengthTemp = 0
            // daily
            state.dailyLength = (this.props.goals.dailyGoals).length

            // otherGoals
            this.props.goals.otherGoalsCategories.map(catagories => {
                lengthTemp = catagories.otherGoals.length
                state[catagories.catagory] = lengthTemp
                length += lengthTemp
                lengthTemp = 0
                return true
            })
            state.otherLength = length
            length = 0
            lengthTemp = 0

            //completed
            // daily
            length = (this.props.goals.completed.dailyGoals).length

            // otherGoals
            this.props.goals.completed.otherGoalsCategories.map(catagories => {
                lengthTemp = catagories.otherGoals.length
                state[catagories.catagory] = lengthTemp
                length += lengthTemp
                lengthTemp = 0
                return true
            })
            state.completedLength = length
            return(
                <div className="goaltypeselector">
                    <h2>Sort Goals</h2>
                    <div className="sort">
                        <ul>
                            <li><span>Current: {state.dailyLength + state.otherLength}</span></li> 
                            <li><span>Completed: {state.completedLength}</span></li>
                        </ul>
                    </div>
                    <div className="goaltype">
                        <h3>TimeFrame</h3>
                        <ul>
                            <li><span>Daily Goals: {state.dailyLength}</span></li> 
                            <li><span>Other Goals: {state.otherLength}</span></li>
                        </ul>
                    </div>
                    <div className="catagories">
                        <h3>Catagories</h3>
                        <ul>
                            {renderSelector}
                        </ul>
                    </div>
                </div>
            )
        }
        const renderSelector = this.props.goals.otherGoalsCategories.map(catagories => {
                return(
                    <li key={catagories.id}><span>{catagories.category}: {catagories.otherGoals.length}</span></li> 
                )
            })
        return (
            <React.Fragment>
            {getLengths()}
            </React.Fragment>
        )
    }
}
export default TypeSelector