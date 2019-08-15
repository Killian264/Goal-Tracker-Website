import React from 'react';
import PropTypes from 'prop-types';

function DayElement(props) {
    const { goal } = this.props;
    <h4>
    {goal.percentComplete}
    %
    <br />
    {' '}
    Completed
    {' '}
    {goal.daysChecked}
    {' '}
    Days
  </h4>
}

DayElement.propTypes = {
  dailyGoals: PropTypes.object
};

export default DayElement;