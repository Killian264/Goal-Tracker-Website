import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getToday } from '../commonCommands';

class OtherGoalsList extends Component {
  static propTypes = {
    othergoals: PropTypes.objectOf(PropTypes.object).isRequired,
    addPercentage: PropTypes.func.isRequired,
    subtractPercentage: PropTypes.func.isRequired,
    deleteGoal: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    const { othergoals } = this.props;
    if (othergoals === nextProps.othergoals) {
      return false;
    }
    return true;
  }

  render() {
    const {
      othergoals, subtractPercentage, addPercentage, deleteGoal,
    } = this.props;
    const displayOtherGoals = othergoals.otherGoals.map((goal) => {
      // Possibly rework this later to work after component did mount and make it run once only
      const endDate = new Date(goal.endDate);
      const totalDays = Math.abs(new Date(goal.startDate) - endDate) / 8.64e+7;
      const today = getToday();
      const timeLeft = (Math.abs(endDate - new Date(today)) / 8.64e+7).toString().split('.')[0];
      return (
        <div className="othergoalslist" key={goal.id}>
          <div className="otherdailygoal">
            <div className="otherdailygoalheading otherdailygoalheadingheading">
              <ul>
                <h4>{goal.title}</h4>
                {goal.snippit}
              </ul>
            </div>
            <div className="otherdailygoalheading extendeddailygoaltimeframe">
              <h4>
                {totalDays}
                {' '}
                Total Days
                <br />
                {timeLeft}
                {' '}
                Days Left
              </h4>
            </div>
            <div className="otherdailygoalheading extendeddailygoalyourprogress">
              <div
                tabIndex={0}
                role="button"
                onClick={() => { subtractPercentage(goal.id, othergoals.category); }}
                onKeyPress={() => {}}
              >
                <h1>−</h1>
              </div>
              <h1 />
              {/* fix later */}
              {/* <h1 onClick={() => { this.props.subtractPercentage(goal.id, othergoals.category); }} onKeyPress={() => { this.props.subtractPercentage(goal.id, othergoals.category); }}>−</h1> */}
              <div
                tabIndex={0}
                role="button"
                onClick={() => { addPercentage(goal.id, othergoals.category); }}
                onKeyPress={() => {}}
              >
                <h1>+</h1>
              </div>
              <h4>
                {goal.percentComplete}
                %
              </h4>
              <div
                tabIndex={0}
                role="button"
                className="close-container"
                onClick={() => { deleteGoal(goal.id, othergoals.category); }}
                onKeyPress={() => {}}
              >
                <div className="leftright" />
                <div className="rightleft" />
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>
        {displayOtherGoals}
      </div>
    );
  }
}

export default OtherGoalsList;
