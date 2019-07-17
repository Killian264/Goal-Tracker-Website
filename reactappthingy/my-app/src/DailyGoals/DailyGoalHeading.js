import React, { Component } from 'react';

class DailyGoalHeading extends Component {
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
    listElement = (i) =>{
        return(
            <li>{this.getWeekDay(i)}<br/>{this.getMonthDay(i)}</li>
        )
    }
    positivedateRenders = (len) => {
        let list =[
        ];
        for(let i = 1; i <= len; i++){
            list.push(this.listElement(i))
        }
        return(
            [list]
        )
    }
    negativedateRenders = (len) => {
        let list =[
        ];
        if(this.state.renderAmount === 2){
            return;
         }
        len = len/2
        len < 2 ? len = Math.floor(len) : len = Math.ceil(len)
        for(let i = (4-len); i <= 3; i++){
            list.push(this.listElement(i - 4))
        }
        return(
            [list]
        )
    }
    getWeekDay = (offset) => {
        let weekdays = new Array(
            "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
        );
        let today = new Date;
        return weekdays[new Date(today.getFullYear(), today.getMonth(),  today.getDate() + offset).getDay()]
    }
    getMonthDay = (offset) => {
        let today = new Date;
        today = new Date(today.getFullYear(), today.getMonth(),  today.getDate() + offset);
        return today.getDate()
    }
    render() {
        return (
            <div className="dailyheading" ref={this.heading}>
                    <div className="dailyheadingheading">
                        <h1>Daily Goals</h1>
                    </div>
                    <ul>
                        {this.negativedateRenders(this.state.renderAmount)}
                        <li>{this.getWeekDay(0)}<br/>{this.getMonthDay(0)}</li>
                        {this.positivedateRenders((this.state.renderAmount/2) -2)}
                        <li>Del<br/>▼</li>
                    </ul>
                </div>
        )
    }
}
export default DailyGoalHeading