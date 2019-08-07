import React, { Component } from 'react';
import './App.css';

class TypeSelector extends Component {
    // shouldComponentUpdate(nextProps){
    //     if(this.props.goals.otherGoalCategories != nextProps.goals.otherGoalCategories){
    //         return true;
    //     }
    //     if(this.props.goals.dailyGoals.length != nextProps.goals.dailyGoals.length){
    //         return true;
    //     }
    //     return false
    // }
    state = {
        dailyLength: 0,
        otherLength: 0,
        completedLength: 0
    }
    render() {
        const getLengths = () =>{
            let state = this.state;
            let length = 0
            let lengthTemp = 0
            // daily
            state.dailyLength = (this.props.goals.dailyGoals).length

            // otherGoals
            this.props.goals.otherGoalsCategories.forEach(catagories => {
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
            this.props.goals.completed.otherGoalsCategories.forEach(catagories => {
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
                            <label className="radiobtn">Current: {state.dailyLength + state.otherLength}
                                <input type="radio" onClick={() =>  this.props.updateRenderIfs('renderCurrent')} name='currentOrCompleted'defaultChecked />
                                <span id='renderCurrent' className="radiocheckmark"></span>
                            </label>
                            <label className="radiobtn">Completed: {state.completedLength}
                                <input type="radio" onClick={() =>  this.props.updateRenderIfs('renderCompleted')} name='currentOrCompleted' />
                                <span id='renderCompleted' className="radiocheckmark"></span>
                            </label>
                        </ul>
                    </div>
                    <div className="goaltype">
                        <h3>Goal Type</h3>
                        <ul>
                            <label className="radiobtn">All Types: {state.dailyLength + state.otherLength}
                                <input type="radio" onClick={() => this.props.updateRenderIfs('allTypes')} name="goaltype" defaultChecked />
                                <span id='allTypes' className="radiocheckmark"></span>
                            </label>
                            <label className="radiobtn">Daily Goals: {state.dailyLength}
                                <input type="radio" onClick={() => this.props.updateRenderIfs('renderDaily')} name="goaltype" />
                                <span className="radiocheckmark"></span>
                            </label>
                            <label className="radiobtn">Other Goals: {state.otherLength}
                                <input type="radio"  onClick={() => this.props.updateRenderIfs('renderOther')} name="goaltype" />
                                <span className="radiocheckmark"></span>
                            </label>
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
        const renderSelector = this.props.goals.otherGoalsCategories.map(categories => {
                return(
                    <label key={categories.id}className="radiobtn" id='renderDaily'>{categories.category}: {categories.otherGoals.length}
                        <input type="checkbox" onClick={() => this.props.updateCategoryRender(categories.id)} name="category" defaultChecked />
                        <span id='renderDaily' className="radiocheckmark"></span>
                    </label>
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