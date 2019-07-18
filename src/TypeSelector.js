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
        const updateRenderIfs = (e) =>{
            this.props.updateRenderIfs(e.target.id)
        }
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
                        <ul onClick={updateRenderIfs}>
                            <li id='renderCurrent'>Current: {state.dailyLength + state.otherLength}</li> 
                            <li id='renderCompleted'>Completed: {state.completedLength}</li>
                        </ul>
                    </div>
                    <div className="goaltype">
                        <h3>Goal Type</h3>
                        <ul>
                            <li id='allTypes' onClick={updateRenderIfs}>All Types: {state.dailyLength + state.otherLength}</li> 
                            <li id='renderDaily' onClick={updateRenderIfs}>Daily Goals: {state.dailyLength}</li> 
                            <li id='renderOther' onClick={updateRenderIfs}>Other Goals: {state.otherLength}</li>
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