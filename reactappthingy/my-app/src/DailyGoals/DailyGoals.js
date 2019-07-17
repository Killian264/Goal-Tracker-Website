import React, { Component } from 'react';
import {getYeseterday, getToday} from '../commonCommands'

class DailyGoals extends Component {
    state = {
        renderAmount: 0
    }
    heading = React.createRef();
    componentDidMount() {
      let len = this.heading.current.offsetWidth
      this.updateState(len);
    }
    updateState = (len)=> {
        // size of header is 200px checkmark is 80 px
        len = Math.floor((len - 200)/80)
        len > 8 ? len = 8 : len = len
        let state = this.state
        state.renderAmount = len
        this.setState({
            state: state
        })
    }
    listElement = (goal, i) =>{
        return(
            <li>
                <label className="checkbox">
                    <input type="checkbox" checked={goal.weeklyChecked[i]} readOnly={true}/>
                    <span className="checkmark"></span>
                </label>
            </li>
        )
    }
    positivedateRenders = (goal, len) => {
        let list =[
        ];
        for(let i = 1; i <= len; i++){
            list.push(this.listElement(goal, (i + 4)))
        }
        return(
            [list]
        )
    }
    negativedateRenders = (goal, len) => {
        let list =[
        ];
        if(this.state.renderAmount === 2){
           return;
        }
        len = len/2
        len < 2 ? len = Math.floor(len) : len = Math.ceil(len)
        for(let i = (4-len); i <= 3; i++){
            list.push(this.listElement(goal, (i)))
        }
        return(
            [list]
        )
    }
    onClick = (e) => {
        this.props.deleteGoal(e.target.title, 'daily')
    }
    updateCheckMark = (e) => {
        this.props.updateCheckMark(e.target.id)
    }

    render() {
        const{dailyGoals, deleteGoal, updateCheckMark} = this.props;
        const displayCheckBoxes = (goal) =>{
                return(
                    <React.Fragment>
                        <div className="onedailygoalcheckmark">
                            <ul>
                                {this.negativedateRenders(goal, this.state.renderAmount )}
                                <li>
                                    <label className="checkbox checkboxmain">
                                        <input type="checkbox" checked={goal.weeklyChecked[4]} readOnly={true} onClick={() => {this.props.updateCheckMark(goal.id)}} />
                                        <span className="checkmark"></span>
                                    </label>
                                </li>
                                {this.positivedateRenders(goal, Math.floor((this.state.renderAmount/2)) - 2) }
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
        const displayDailyGoals = dailyGoals.map(goal => {
            if(Date.parse(goal.endDate) < Date.parse(getYeseterday())){
                {this.props.deleteGoal(goal.id, 'daily')}
            }
            if(Date.parse(goal.lastDayUpdated) < Date.parse(getToday())){
                {this.props.updateDaily()}
            }
            return(
                <div className="onedailygoal" key={goal.id} ref={this.heading}>
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
