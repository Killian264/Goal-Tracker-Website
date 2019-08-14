import React, { Component } from 'react';
import DailyGoals from './DailyGoals';

class DailyGoalHeading extends Component {
    state = {
      renderAmount: 0,
    }

    heading = React.createRef();

    shouldComponentUpdate(nextProps) {
      if (this.props.dailyGoals !== nextProps.dailyGoals) {
        return true;
      }
      return false;
    }

    componentDidMount() {
      const len = this.heading.current.offsetWidth;

      this.updateState(len);
    }

    updateState = (len) => {
      // size of header is 200px checkmark is 80 px
      len = Math.floor((len - 200) / 80);
      if (len > 8) { len = 8; }
      const { state } = this;
      state.renderAmount = len;
      this.setState({
        state,
      });
    }

    listElement = i => (
      <li key={i}>
        {this.getWeekDay(i)}
        <br />
        {this.getMonthDay(i)}
      </li>
    )

    positivedateRenders = (len) => {
      const list = [
      ];
      for (let i = 1; i <= len; i++) {
        list.push(this.listElement(i));
      }
      return (
        [list]
      );
    }

    negativedateRenders = (len) => {
      const list = [
      ];
      if (this.state.renderAmount === 2) {
        return;
      }
      len /= 2;
      len < 2 ? len = Math.floor(len) : len = Math.ceil(len);
      for (let i = (4 - len); i <= 3; i++) {
        list.push(this.listElement(i - 4));
      }
      return (
        [list]
      );
    }

    getWeekDay = (offset) => {
      const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const today = new Date();
      return weekdays[new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset).getDay()];
    }

    getMonthDay = (offset) => {
      let today = new Date();
      today = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset);
      return today.getDate();
    }

    render() {
      return (
        <div className="dailygoals">
          <div className="dailyheading" ref={this.heading}>
            <div className="dailyheadingheading">
              <h1>Daily Goals</h1>
            </div>
            <ul>
              {this.negativedateRenders(this.state.renderAmount)}
              <li className="dailyWeekdate">
                {this.getWeekDay(0)}
                <br />
                {this.getMonthDay(0)}
              </li>
              {this.positivedateRenders((this.state.renderAmount / 2) - 2)}
              <li>
Del
                <br />
▼
              </li>
            </ul>
          </div>
          <div className="dailygoalslist">
            {<DailyGoals updateCheckMark={this.props.updateCheckMark} dailyGoals={this.props.dailyGoals} deleteGoal={this.props.deleteGoal} />}
          </div>
        </div>
      );
    }
}
export default DailyGoalHeading;
