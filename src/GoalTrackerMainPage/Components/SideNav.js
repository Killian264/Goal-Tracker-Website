import React, { Component } from 'react'
import {goalService} from '../../services/goal.service';
import { helpers} from '../../helpers/helpers';

class SideNav extends Component {
  state = {
    username: "",
  }

  onClick = (e) =>{
    e.preventDefault();
    helpers.pushToLogin();
  }
  
  componentDidMount(){
    goalService.getUserName().then(
      user => {
        this.setState({username: user});
      },
      error => {
        this.setState({username: "Error"});
      }
    );;
  }

  render() {
    const { updatePageDisplay } = this.props;
    return (
      <div className="sidenav">
      <div className="user">
        <img src="./images/profile.png" alt="" />
        <a href="">{this.state.username}</a>
      </div>
      <span className="pages-title">--Pages--</span>
      <div className="navlinks">
        <a onClick={() => {updatePageDisplay("Categories")}}>Categories</a>
        <a onClick={() => {updatePageDisplay("Planned")}}>Planned</a>
        <a href="https://goal-tracker.killiandebacker.com/login" onClick={this.onClick}>Log Out</a>
        <br></br>
        <br></br>
        <span className="pages-title2">--Other Links--</span>
        <a href="https://killiandebacker.com/">My Portfolio</a>
        <a href="https://github.com/Killian264/Goal-Tracker-Website" target="_blank">Github</a>
      </div>
      <div className="navlinksfootnote">
        Killian Debacker ©2019
      </div>
    </div>
    )
  }
}

export default SideNav

