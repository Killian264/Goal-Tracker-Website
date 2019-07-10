import React, {Component} from 'react';
import './App.css';
import DailyGoals from './DailyGoals';
import OtherGoals from './OtherGoals';
import Overlay from './Overlay';
import TopNav from './TopNav';

class App extends Component {
    state = {
        goals:{
            dailyGoals : [
                {
                    id: 1,
                    title: 'Programme',
                    snippit: 'Write Code',
                    startDate: '2019, 7, 1 00:00',
                    endDate: '2019, 7, 15 00:00',
                    daysChecked: 20,
                    weeklyChecked: [true, false, true, true, false, false, false]
                },
                {
                    id: 2,
                    title: 'Learn React',
                    snippit: 'Write Code',
                    startDate: '2019, 7, 1 00:00',
                    endDate: '2019, 7, 15 00:00',
                    daysChecked: 20,
                    weeklyChecked: [true, true, false, true, false, false, false]
                },
                {
                    id: 3,
                    title: 'Be Cool',
                    snippit: 'Yea',
                    startDate: '2019, 7, 1 00:00',
                    endDate: '2019, 7, 15 00:00',
                    daysChecked: 20,
                    weeklyChecked: [false, true, true, true, false, false, false]
                }
            ],
            otherGoalsCategories:[
                {
                    category: 'Programming',
                    id: 1,
                    otherGoals:[
                        {
                            id: 1,
                            title: 'Learn React',
                            snippit: 'Code a bunch of stuff',
                            startDate: '2019, 7, 1 00:00',
                            endDate: '2019, 7, 15 00:00',
                            percentComplete: 20
                        },
                        {
                            id: 2,
                            title: 'Learn to Code',
                            snippit: 'Learn React, C++, SQL, and more C#',
                            startDate: '2019, 5, 1 00:00',
                            endDate: '2019, 8, 16 00:00',
                            percentComplete: 40
                        }
                    ]
                },
                {
                    category: 'Reading',
                    id: 2,
                    otherGoals:[
                        {
                            id: 1,
                            title: 'Read a book',
                            snippit: 'Read the blade itself',
                            startDate: '2019, 7, 8 00:00',
                            endDate: '2019, 7, 30 00:00',
                            percentComplete: 0
                        },
                        {
                            id: 2,
                            title: 'Read 20 books',
                            snippit: "Should'nt be too hard he thought",
                            startDate: '2019, 1, 1 00:00',
                            endDate: '2020, 1, 1 00:00',
                            percentComplete: 50
                        }
                    ]
                },
                {
                    category: 'Goal Tracker Project',
                    id: 3,
                    otherGoals:[
                        {
                            id: 1,
                            title: 'Add Goal Adding',
                            snippit: 'Add Form and State Addition',
                            startDate: '2019, 7, 9 00:00',
                            endDate: '2019, 7, 11 00:00',
                            percentComplete: 0
                        },
                        {
                            id: 2,
                            title: 'Add Goal Deletion',
                            snippit: 'Add Form and State Deletion',
                            startDate: '2019, 7, 9 00:00',
                            endDate: '2019, 7, 11 00:00',
                            percentComplete: 0
                        },
                        {
                            id: 3,
                            title: 'Fix Small bugs',
                            snippit: 'SideNav Stuff',
                            startDate: '2019, 7, 9 00:00',
                            endDate: '2019, 7, 12 00:00',
                            percentComplete: 0
                        },
                        {
                            id: 4,
                            title: 'Add Sorting Box',
                            snippit: 'Should be easy after I learn add and delete stuff',
                            startDate: '2019, 7, 9 00:00',
                            endDate: '2019, 7, 12 00:00',
                            percentComplete: 0
                        },
                        {
                            id: 5,
                            title: 'Add Login and backend stuff',
                            snippit: 'This might be the hard part',
                            startDate: '2019, 7, 9 00:00',
                            endDate: '2019, 7, 19 00:00',
                            percentComplete: 0
                        }
                        
                    ]
                }
            ]
        },
        otherStuffs:{
            overlayIsHidden: true
        }
    }
    closeGoalOverlay = () => {
        let state = this.state
        state.otherStuffs.overlayIsHidden = true;
        this.setState({
            state: state
          })
    }
    displayGoalOverlay = () => {
        let state = this.state
        state.otherStuffs.overlayIsHidden = false;
        this.setState({
            state: state
          })
    }
    // state = {
    //     title: null,
    //     snippit: null,
    //     // '2019, 7, 1 00:00',
    //     endDate: null,
    //     type: 'daily',
    //     category: 'newCategory',
    //     newCategory: true
    // }
    stateAdd = (newGoal) => {
        if(newGoal.type == 'daily'){
            let state = this.state
            newGoal = {
                id: Math.random(),
                title: state.title,
                snippit: state.snippit,
                startDate: new Date().toString(),
                endDate: state.endDate,
                daysChecked: 0,
                weeklyChecked: [false, false, false, false, false, false, false]
            }
            state.goals.dailyGoals.push(newGoal);
            this.setState({
                state: state
              })
        }
    }
    render() {
        return (
            <div>
            <div className="sidenav">
                <div className="user">
                    <img src="Images/profile.png" alt=""/>
                    <a href="http://localhost:3000">Guest</a>
                </div>
                <div className="navlinks">
                    <a href= "http://localhost:3000" >Dashboard</a>
                    <a href= "http://localhost:3000" >Goals</a>
                    <a href= "http://localhost:3000" >Tasks</a>
                    <a href="http://localhost:3000" >Portfolio Home</a>
                </div>
            </div>
            <div className="topnav">
                    <div className = "navdropdown">
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </div>
                    <h1>Current Goals</h1>
                    <div className="creategoalbutton">
                            <button id="button" onClick={this.displayGoalOverlay}>Create Goal</button>
                    </div>
                </div>
            <div className="main">
                <div className="goaltypeselector">
                    <h2>Sort Goals</h2>
                    <div className="sort">
                        <ul>
                            <li><img src="../src/Images/pressed.png" alt=""/><span>Show Current</span></li> 
                            <li><img src="../src/Images/pressed.png" alt=""/><span>Show Completed</span></li>
                        </ul>
                    </div>
                    <div className="goaltype">
                        <h3>TimeFrame</h3>
                        <ul>
                            <li><img src="../src/Images/pressed.png" alt=""/><span>Daily Goals</span></li> 
                            <li><img src="../src/Images/pressed.png" alt=""/><span>Weekly Goals</span></li>
                        </ul>
                    </div>
                    <div className="catagories">
                        <h3>Catagories</h3>
                        <ul>
                            <li><img src="../src/Images/pressed.png" alt=""/><span>Programming</span></li> 
                            <li><img src="../src/Images/pressed.png" alt=""/><span>Knowledge</span></li>
                            <li><img src="../src/Images/pressed.png" alt=""/><span>Workout</span></li>
                        </ul>
                    </div>
                </div>
                <div className="goals">
                    <div className="dailygoals">
                        <div className="dailyheading">
                            <div className="dailyheadingheading">
                                <h1>Daily Goals</h1>
                            </div>
                            <ul>
                                <li>Mon<br/>1</li>
                                <li>Tue<br/>2</li>
                                <li>Wed<br/>3</li>
                                <li>Thu<br/>4</li>
                                <li>Fri<br/>5</li>
                                <li>Sat<br/>6</li>
                                <li>Sun<br/>7</li>
                                <li>Mon<br/>8</li>
                            </ul>
                        </div>
                        <div className="dailygoalslist">
                        <DailyGoals dailyGoals={this.state.goals.dailyGoals} />         
                        </div>
                    </div>
                    <OtherGoals otherGoalCategories={this.state.goals.otherGoalsCategories} />    
                </div>
                {!this.state.otherStuffs.overlayIsHidden && <Overlay closeGoalOverlay={this.closeGoalOverlay} otherGoalCategories={this.state.goals.otherGoalsCategories} stateAdd={this.stateAdd} />}   
            </div>
    </div>
    );
    }
}

export default App;

// const createGoalBtn = document.getElementById('button');
// const goalCreatePopup = document.getElementById('creategoaloverlay');
// const cancelBtn = document.getElementById('cancelbutton');

// createGoalBtn.addEventListener('click', ()=>{
//     goalCreatePopup.style.display = "block";
// }, false)

// cancelBtn.addEventListener('click', ()=>{
//     goalCreatePopup.style.display = "none";
// }, false)

// const navSlide = () => {
//     const navdropdown = document.querySelector('.navdropdown');
//     const nav = document.querySelector('.sidenav');
//     const navlinks = document.querySelectorAll('.navlinks a')

//     navdropdown.addEventListener('click', ()=>{
//         nav.classList.toggle('nav-active');
//         navlinks.forEach((link, index)=>{
//             if(link.style.animation){
//                 link.style.animation = '';
//             }
//             else{
//                 link.style.animation = `navLinkFade 0.5s ease forwards ${(index / 7) + .15}s`;
//             }
//         });

//         navdropdown.classList.toggle('toggle');
//     });
// }
// navSlide();