import React from 'react';
import PropTypes from 'prop-types';

function DeleteElement(props) {
  const { id, deleteGoal, category } = props;

  return (
    <li className="close-container" tabIndex={0} role="button" key={8} onKeyPress={() => {}} onClick={() => { deleteGoal(id, category); }}>
      <div className="leftright" />
      <div className="rightleft" />
    </li>
  );
}

DeleteElement.propTypes = {
  id: PropTypes.string.isRequired,
  deleteGoal: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
};

export default DeleteElement;
