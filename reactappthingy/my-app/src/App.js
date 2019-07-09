import React, {Component} from 'react';
import './App.css';
import DailyGoals from './DailyGoals';
import OtherGoals from './OtherGoals';
import Overlay from './Overlay';

class App extends Component {
    state = {
        goals:{
            dailyGoals : [
                {
                    id: 1,
                    title: 'Programme',
                    snippit: 'Write Code',
                    totalDays: 30,
                    daysChecked: 20,
                    weeklyChecked: [true, false, true, true, false, false, false]
                },
                {
                    id: 2,
                    title: 'Learn React',
                    snippit: 'Write Code',
                    totalDays: 30,
                    daysChecked: 20,
                    weeklyChecked: [true, true, false, true, false, false, false]
                },
                {
                    id: 3,
                    title: 'Be Cool',
                    snippit: 'Yea',
                    totalDays: 30,
                    daysChecked: 20,
                    weeklyChecked: [false, true, true, true, false, false, false]
                }
            ],
            otherGoalsCategories:[
                {
                    id: 1,
                    category: 'Programming',
                    title: 'Learn React',
                    snippit: 'Yea',
                    startDate: new Date(2019, 7, 1),
                    endDate: new Date(2019, 7, 15 ),
                    percentComplete: 20
                },
                {
                    id: 2,
                    category: 'Programming',
                    title: 'Learn to Code',
                    snippit: 'Yea',
                    startDate: new Date(2019, 5, 1),
                    endDate: new Date(2019, 8, 16 ),
                    percentComplete: 40
                },
                {
                    id: 3,
                    category: 'Reading',
                    title: 'Read a book',
                    snippit: 'Yea',
                    startDate: new Date(2019, 7, 8),
                    endDate: new Date(2019, 7, 30),
                    percentComplete: 0
                },
                {
                    id: 4,
                    category: 'Reading',
                    title: 'Read 20 books',
                    snippit: 'Yea',
                    startDate: new Date(2019, 1, 1),
                    endDate: new Date(2020, 1, 1 ),
                    percentComplete: 50
                }
            ]
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
                        <div className="dailygoalslist" id="rendertest">
                        <DailyGoals dailyGoals={this.state.goals.dailyGoals} />             
                        </div>
                    </div>    
                </div>
                <Overlay />
            </div>
                <OtherGoals otherGoalCategories={this.state.goals.otherGoalsCategories} />
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