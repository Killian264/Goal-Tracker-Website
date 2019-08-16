import React from 'react';

function DayElement() {
  return (
    <div className="sidenav">
      <div className="user">
        <img src="Images/profile.png" alt="" />
        <a href="http://localhost:3000">Guest</a>
      </div>
      <div className="navlinks">
        <a href="http://localhost:3000">Dashboard</a>
        <a href="http://localhost:3000">Goals</a>
        <a href="http://localhost:3000">Tasks</a>
        <a href="http://localhost:3000">Portfolio Home</a>
      </div>
    </div>
  );
}

export default DayElement;
