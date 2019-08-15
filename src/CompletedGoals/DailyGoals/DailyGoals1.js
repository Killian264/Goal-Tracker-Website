import React from 'react';
import PropTypes from 'prop-types';

function DayElement(props) {
    const { dailyGoals } = this.props;
    const displayOtherGoals = dailyGoals.map((goal) => {

    })
}

DayElement.propTypes = {
  dailyGoals: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DayElement;