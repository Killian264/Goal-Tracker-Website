import React from 'react';
import PropTypes from 'prop-types';

function DayElement(props) {
  const { id, deleteGoal } = props;
  return (
    <li className="close-container" onClick={() => { deleteGoal(id, 'daily'); }}>
      <div className="leftright" />
      <div className="rightleft" />
    </li>
  );
}

DayElement.propTypes = {
  id: PropTypes.string.isRequired,
  deleteGoal: PropTypes.func.isRequired,
};

export default DayElement;
