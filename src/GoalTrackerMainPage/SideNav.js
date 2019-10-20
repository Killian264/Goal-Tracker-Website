import React from "react";

function DayElement() {
  return (
    <div className="sidenav">
      <div className="user">
        <img src="./Images/profile.png" alt="" />
        <a href="http://localhost:3000">Guest</a>
      </div>
      <div className="navlinks">
        {/* <a href="https://goal-tracker.killiandebacker.com/">Dashboard</a> */}
        {/* <a href="http://localhost:3000">Goals</a>
        <a href="http://localhost:3000">Tasks</a> */}
        {/* <a href="https://goal-tracker.killiandebacker.com">Sign In</a> */}
        <a href="http://localhost:3000/login">Log Out</a>
        Planned
      </div>
      <div className="navlinksfootnote">
        -Note this is a guest account and changes are NOT saved.
        <br />
        -Accounts and additional features coming soon.
        <br />
        <br />
        Killian Debacker ©2019
      </div>
    </div>
  );
}

export default DayElement;
