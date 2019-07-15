import React, {Component} from 'react'
import './App.css'
import DailyGoalHeading from './DailyGoals/DailyGoalHeading'
import DailyGoals from './DailyGoals/DailyGoals'
import OtherGoals from './OtherGoals/OtherGoals'
import Overlay from './Overlay'
import TypeSelector from './TypeSelector'
import uuid from 'uuid'
import {getToday} from './commonCommands'
import { bigIntLiteral } from '@babel/types';

class App extends Component {
    state = {
        goals:{
            dailyGoals : [
                {
                    id: 1,
                    title: 'Programme',
                    snippit: 'Write Code',
                    startDate: '2019, 7, 1 00:00',
                    endDate: '2019, 7, 10 00:00',
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
            ],
            completed : {
                dailyGoals : [
                ],
                otherGoalsCategories : [
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
                            }
                        ]
                    }
                ]
            }
        },
        otherStuffs:{
            overlayIsHidden: true,
            renderCurrent: true,
            renderCompleted: false,
            renderDaily: true,
            renderOther: true,
        }
    }
    
    deleteGoal = (key, category) => {
        let state = this.state;
        let toCompletedGoal;
        if(category === 'daily'){
            // sets filtered Arr to goal then filters out the deleted goal
            let filteredArr = this.state.goals.dailyGoals;
            this.state.goals.dailyGoals.map((goal, index) =>{
                if(goal.id === key){ 
                    filteredArr.splice(index, 1); 
                    toCompletedGoal = goal;
                }
                return true;
            })
            state.goals.dailyGoals = filteredArr
        }
        else{
            //maps and finds category
            this.state.goals.otherGoalsCategories.map((catagories, index) => {
                if(catagories.category === category){
                    // sets filtered Arr to goal then filters out the deleted goal
                    let filteredArr = this.state.goals.otherGoalsCategories[index].otherGoals;
                    // Finds and removes goal
                    this.state.goals.otherGoalsCategories[index].otherGoals.map((goal, index) =>{
                        if(goal.id === key){ 
                            filteredArr.splice(index, 1); 
                            toCompletedGoal = goal;
                        }
                        return true;
                    })
                    // sets local state
                    state.goals.otherGoalsCategories[index].otherGoals = filteredArr
                    //checks if category is empty
                    if((state.goals.otherGoalsCategories[index].otherGoals).length === 0){
                        state.goals.otherGoalsCategories.splice(index, 1);
                    }
                }
                return true;
            })
        }
        this.setState({
            [state]: state
        })
        this.completed(toCompletedGoal, category)
        return;
    }
    updateRenderIfs = (whichClicked) => {
        let otherStuffs = this.state.otherStuffs
        if(this.state.otherStuffs[whichClicked] === false){
            otherStuffs[whichClicked] = true;
        }
        console.log('which clicked', whichClicked)
        switch(whichClicked){
            case('allTypes'):
                console.log('eeyfasdkfasjdfk')
                otherStuffs.renderDaily = true;
                otherStuffs.renderOther = true;
                break;
            case('renderCurrent'):
                if(this.state.otherStuffs.renderCompleted === true){
                    otherStuffs.renderCompleted = false;
                }
                break;
            case('renderCompleted'):
                if(this.state.otherStuffs.renderCurrent === true){
                    otherStuffs.renderCurrent = false;
                }
                break;
            case('renderDaily'):
                if(this.state.otherStuffs.renderOther === true){
                    otherStuffs.renderOther = false;
                }
                break;
            case('renderOther'):
                if(this.state.otherStuffs.renderDaily === true){
                    otherStuffs.renderDaily = false;
                }
                break;
        }
        this.setState({
            otherStuffs: otherStuffs
        })
    }
    completed = (newGoal, category) => {
        let state = this.state
        // check if daily
        if(category === 'daily'){
            state.goals.completed.dailyGoals.push(newGoal);
        }
        else{
            let newCategory = true; // true of false if new category
    
            this.state.goals.completed.otherGoalsCategories.map((catagories, index) => {
                if(catagories.category === category){
                    state.goals.completed.otherGoalsCategories[index].otherGoals.push(newGoal)
                    newCategory = false;
                }
                return true;
            })
            //check if new category
            if(newCategory === true){
                newGoal = {
                    category: category,
                    id: uuid.v4(),
                    otherGoals: [
                        newGoal
                    ]
                }
                // push to local state
                state.goals.completed.otherGoalsCategories.push(newGoal);
            }
        }
        //push to state and close overlay
        state.otherStuffs.overlayIsHidden = true;
        this.setState({
            state: state
            })
        return;
    }
    closeGoalOverlay = () => {
        let state = this.state
        state.otherStuffs.overlayIsHidden = true;
        this.setState({
            state: state
          })
        return;
    }
    displayGoalOverlay = () => {
        let state = this.state
        state.otherStuffs.overlayIsHidden = false;
        this.setState({
            state: state
          })
    }
    stateAdd = (newGoal) => {
        let state = this.state
        let startDate = getToday()
        // check if daily
        if(newGoal.type === 'daily'){
            newGoal = {
                id: uuid.v4(),
                title: newGoal.title,
                snippit: newGoal.snippit,
                startDate: startDate,
                endDate: newGoal.endDate + " 00:00",
                daysChecked: 0,
                weeklyChecked: [false, false, false, false, false, false, false]
            }
            // push to local state
            state.goals.dailyGoals.push(newGoal);
        }
        else{
            let category = newGoal.category; // the new category
            let newCategory = newGoal.newCategory; // true of false if new category
            newGoal = {
                id: uuid.v4(),
                title: newGoal.title,
                snippit: newGoal.snippit,
                startDate: startDate,
                endDate: newGoal.endDate + " 00:00",
                percentComplete: 0
            }
            //check if new category
            if(newCategory === true){
                newGoal = {
                    category: category,
                    id: uuid.v4(),
                    otherGoals: [
                        newGoal
                    ]
                }
                // push to local state
                state.goals.otherGoalsCategories.push(newGoal);
            }
            else{
                //finds category to add to
                this.state.goals.otherGoalsCategories.map((catagories, index) => {
                    if(catagories.category === category){
                        state.goals.otherGoalsCategories[index].otherGoals.push(newGoal)
                    }
                    return true;
                })
            }
        }
        //push to state and close overlay
        state.otherStuffs.overlayIsHidden = true;
        this.setState({
            state: state
        })
        return;
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

                <TypeSelector goals={this.state.goals} updateRenderIfs={this.updateRenderIfs}/>
                <div className="goals">
                    <div className="dailygoals"> 
                        {this.state.otherStuffs.renderDaily && this.state.goals.dailyGoals.length !== 0 && <DailyGoalHeading/>}  
                        <div className="dailygoalslist">
                         {this.state.otherStuffs.renderDaily && <DailyGoals dailyGoals={this.state.goals.dailyGoals} deleteGoal={this.deleteGoal} />} 
                        </div>
                    </div>
                    {this.state.otherStuffs.renderOther && <OtherGoals otherGoalCategories={this.state.goals.otherGoalsCategories} deleteGoal={this.deleteGoal} />}
                </div>
                {/* Need new classes for these unless I componentDidMount map the dates n stuff */}
                {/* <div className="goals">
                    <div className="dailygoals"> 
                        {this.state.otherStuffs.renderDaily && this.state.goals.completed.dailyGoals.length !== 0 &&<DailyGoalHeading />}  
                        <div className="dailygoalslist">
                         {this.state.otherStuffs.renderDaily && this.state.goals.completed.dailyGoals.length !==  0 &&<DailyGoals dailyGoals={this.state.goals.completed.dailyGoals} deleteGoal={this.deleteGoal} />} 
                        </div>
                    </div>
                    {this.state.otherStuffs.renderOther && this.state.goals.completed.otherGoalsCategories.length !== 0 && <OtherGoals otherGoalCategories={this.state.goals.completed.otherGoalsCategories} deleteGoal={this.deleteGoal} />}
                </div> */}
                {!this.state.otherStuffs.overlayIsHidden && <Overlay closeGoalOverlay={this.closeGoalOverlay} otherGoalCategories={this.state.goals.completed.otherGoalsCategories} stateAdd={this.stateAdd} />}   
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