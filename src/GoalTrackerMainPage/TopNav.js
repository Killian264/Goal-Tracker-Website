import React from 'react';
import PropTypes from 'prop-types';

function TopNav(props) {
  const { navSlideChange, displayGoalOverlay } = props;
  return (
    <div className="topnav">
      <div className="navdropdown" onClick={navSlideChange}>
        <div className="line1" />
        <div className="line2" />
        <div className="line3" />
      </div>
      <h1>Current Goals</h1>
      <div className="creategoalbutton">
        <button id="button" onClick={displayGoalOverlay}>Create Goal</button>
      </div>
    </div>
  );
}

TopNav.propTypes = {
  navSlideChange: PropTypes.func.isRequired,
  displayGoalOverlay: PropTypes.func.isRequired,
};

export default TopNav;
