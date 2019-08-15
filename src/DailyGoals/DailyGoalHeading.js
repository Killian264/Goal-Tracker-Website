import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DailyGoals from './DailyGoals';
import DayElement from './DayElement';
import { getWeekDay, getMonthDay } from '../commonCommands';

class DailyGoalHeading extends Component {
  static propTypes = {
    dailyGoals: PropTypes.arrayOf(PropTypes.object).isRequired,
    updateCheckMark: PropTypes.func.isRequired,
    deleteGoal: PropTypes.func.isRequired,
  };

    state = {
      renderAmount: 0,
      negativeLen: 0,
      positiveLen: 0,
    }

    heading = React.createRef();

    // shouldComponentUpdate(nextProps) {
    //   if (this.props.dailyGoals !== nextProps.dailyGoals) {
    //     return true;
    //   }
    //   return false;
    // }

    componentDidMount() {
      const startLen = this.heading.current.offsetWidth;
      let len = Math.floor((startLen - 200) / 80);
      if (len > 8) { len = 8; }
      const negativeLen = len < 2 ? Math.floor(len / 2) : Math.ceil(len / 2);
      const positiveLen = (len / 2) - 2;
      this.setState({
        renderAmount: len,
        negativeLen,
        positiveLen,
      });
    }

    dateRenders = () => {
      const { state } = this;
      const list = [
      ];
      if (state.renderAmount !== 2) {
        for (let i = (4 - state.negativeLen); i <= 3; i += 1) {
          list.push(<DayElement i={i - 4} />);
        }
      }
      list.push(
        <li className="dailyWeekdate">
          {getWeekDay(0)}
          <br />
          {getMonthDay(0)}
        </li>,
      );
      for (let i = 1; i <= state.positiveLen; i += 1) {
        list.push(<DayElement i={i} />);
      }
      list.push(
        <li>
          Del
          <br />
          ▼
        </li>,
      );
      return (
        [list]
      );
    }

    render() {
      const { state } = this;
      const { updateCheckMark, dailyGoals, deleteGoal } = this.props;
      return (
        <div className="dailygoals">
          <div className="dailyheading" ref={this.heading}>
            <h1>Daily Goals</h1>
            <ul>
              {this.dateRenders()}
            </ul>
          </div>
          {<DailyGoals updateCheckMark={updateCheckMark} dailyGoals={dailyGoals} deleteGoal={deleteGoal} negativeLen={state.negativeLen} positiveLen={state.positiveLen} renderAmount={state.renderAmount} />}
        </div>
      );
    }
}
export default DailyGoalHeading;
