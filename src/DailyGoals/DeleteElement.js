import React from 'react';
import PropTypes from 'prop-types';

function DeleteElement(props) {
  const { id, deleteGoal } = props;
  return (
    <li className="close-container" onClick={() => { deleteGoal(id, 'daily'); }}>
      <div className="leftright" />
      <div className="rightleft" />
    </li>
  );
}

DeleteElement.propTypes = {
  id: PropTypes.string.isRequired,
  deleteGoal: PropTypes.func.isRequired,
};

export default DeleteElement;
