import React, {Component} from 'react'
import './App.css'
import DailyGoalHeading from './DailyGoals/DailyGoalHeading'
import DailyGoals from './DailyGoals/DailyGoals'
import OtherGoals from './OtherGoals/OtherGoals'
import TypeSelector from './TypeSelector'
import uuid from 'uuid'
import Overlay from './Overlay'
import {getToday, getYeseterday} from './commonCommands'
import CompletedDailyGoals from './CompletedGoals/DailyGoals/DailyGoals'
import CompletedOtherGoals from './CompletedGoals/OtherGoals/OtherGoals'

class App extends Component {
    state = {
        goals:{
            dailyGoals : [
                {
                    id: 1,
                    title: 'Programme',
                    snippit: 'Write Code',
                    startDate: '2019, 7, 1 00:00',
                    endDate: '2019, 7, 30 00:00',
                    lastDayUpdated:'2019, 7, 14 00:00',
                    daysChecked: 20,
                    weeklyChecked: [true, false, true, true, true, false, false]
                },
                {
                    id: 2,
                    title: 'Learn React',
                    snippit: 'Write Code',
                    startDate: '2019, 7, 1 00:00',
                    endDate: '2019, 7, 30 00:00',
                    lastDayUpdated:'2019, 7, 14 00:00',
                    daysChecked: 12,
                    weeklyChecked: [true, true, false, true, false, false, false]
                },
                {
                    id: 3,
                    title: 'Be Cool',
                    snippit: 'Yea',
                    startDate: '2019, 7, 1 00:00',
                    endDate: '2019, 7, 10 00:00',
                    lastDayUpdated:'2019, 7, 14 00:00',
                    daysChecked: 12,
                    weeklyChecked: [false, true, true, true, false, false, false]
                },
                {
                    id: 5454,
                    title: 'Be Cools',
                    snippit: 'Yea',
                    startDate: '2019, 7, 1 00:00',
                    endDate: '2019, 7, 17 00:00',
                    lastDayUpdated:'2019, 7, 14 00:00',
                    daysChecked: 12,
                    weeklyChecked: [false, true, true, true, false, false, false]
                }
            ],
            otherGoalsCategories:[
                {
                    category: 'Programming',
                    id: 4,
                    otherGoals:[
                        {
                            id: 5,
                            title: 'Learn React',
                            snippit: 'Code a bunch of stuff',
                            startDate: '2019, 7, 1 00:00',
                            endDate: '2019, 7, 15 00:00',
                            percentComplete: 20
                        },
                        {
                            id: 6,
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
                    id: 7,
                    otherGoals:[
                        {
                            id: 8,
                            title: 'Read a book',
                            snippit: 'Read the blade itself',
                            startDate: '2019, 7, 8 00:00',
                            endDate: '2019, 7, 30 00:00',
                            percentComplete: 0
                        },
                        {
                            id: 9,
                            title: 'Read 20 books',
                            snippit: "Shouldn't be too hard he thought",
                            startDate: '2019, 1, 1 00:00',
                            endDate: '2020, 1, 1 00:00',
                            percentComplete: 50
                        }
                    ]
                },
                {
                    category: 'Goal Tracker Project',
                    id: 10,
                    otherGoals:[
                        {
                            id: 11,
                            title: 'Add Goal Adding',
                            snippit: 'Add Form and State Addition',
                            startDate: '2019, 7, 9 00:00',
                            endDate: '2019, 7, 11 00:00',
                            percentComplete: 0
                        },
                        {
                            id: 12,
                            title: 'Add Goal Deletion',
                            snippit: 'Add Form and State Deletion',
                            startDate: '2019, 7, 9 00:00',
                            endDate: '2019, 7, 11 00:00',
                            percentComplete: 0
                        },
                        {
                            id: 13,
                            title: 'Fix Small bugs',
                            snippit: 'SideNav Stuff',
                            startDate: '2019, 7, 9 00:00',
                            endDate: '2019, 7, 12 00:00',
                            percentComplete: 0
                        },
                        {
                            id: 14,
                            title: 'Add Sorting Box',
                            snippit: 'Should be easy after I learn add and delete stuff',
                            startDate: '2019, 7, 9 00:00',
                            endDate: '2019, 7, 12 00:00',
                            percentComplete: 0
                        },
                        {
                            id: 15,
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
                        id: 16,
                        otherGoals:[
                            {
                                id: 17,
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
    componentDidMount(){
        let localState = this.state
        let updatedDailyGoals= []
        this.state.goals.dailyGoals.forEach(goal => {
            if(Date.parse(goal.endDate) <= Date.parse(getYeseterday())){
                localState.goals.completed.dailyGoals.push(this.changeDailyToCompleted(goal))
            }
            else{
                if(Date.parse(goal.lastDayUpdated) < Date.parse(getToday())){
                    let numDays = (((Date.parse(goal.lastDayUpdated) - Date.parse(getToday()))/ 8.64e+7) * -1)
                    updatedDailyGoals.push(this.updateLastUpdated(goal, numDays))
                }   
            }
        })
        // loop through categories
        let updatedOtherCategories = []
        this.state.goals.otherGoalsCategories.forEach(category => {
            //loop through goals
            let updatedOtherGoals= []
            category.otherGoals.forEach(goal => {
                if(Date.parse(goal.endDate) <= Date.parse(getYeseterday())){
                    //do push thingies
                    let pushed = false
                    this.state.goals.completed.otherGoalsCategories.forEach((completedCategory, index) => {
                        if(completedCategory.category === category.category){
                            localState.goals.completed.otherGoalsCategories[index].otherGoals.push(goal)
                            pushed = true
                        }
                    })
                    if(pushed === false){
                        localState.goals.completed.otherGoalsCategories.push(
                            {
                                category: category.category,
                                id: category.id,
                                otherGoals:[
                                    goal
                                ]
                            }
                        )
                    }

                }
                else{
                    updatedOtherGoals.push(goal)
                }
            })

            if(updatedOtherGoals.length !== 0){
                let categoryRet = category
                categoryRet.otherGoals = updatedOtherGoals
                updatedOtherCategories.push(categoryRet)
            }
        })
        localState.goals.otherGoalsCategories = updatedOtherCategories
        localState.goals.dailyGoals = updatedDailyGoals
        this.setState({
            state: localState
        })

    }
    updateLastUpdated = (goal, numDays) =>{
        if(numDays > 5){
            goal.lastDayUpdated = getToday()
            goal.weeklyChecked = [false, false, false, false, false, false, false]
        }
        else{
            goal.lastDayUpdated = getToday()
            let weeklyChecked = [false, false, false, false, false, false, false]
            for(let i = 0; i < (5 - numDays); i++){
                weeklyChecked[i] = goal.weeklyChecked[i + numDays]
            }
            goal.weeklyChecked = weeklyChecked
        }
        return goal
    }
    changeDailyToCompleted(newGoal){
        let endDate = new Date(newGoal.endDate);
        let totalDays = Math.abs(new Date(newGoal.startDate) - endDate) / 8.64e+7;
        newGoal = {
            id: newGoal.id,
            title: newGoal.title,
            snippit: newGoal.snippit,
            startDate: newGoal.startDate,
            endDate: newGoal.endDate,
            daysChecked: newGoal.daysChecked,
            percentComplete: ((newGoal.daysChecked/totalDays * 100).toString().substr(0, 2))
        }
        return newGoal
    }
    deleteGoal = (key, category) => {
        let state = this.state;
        let toCompletedGoal;
        if(category === 'daily'){
            let filteredArr = this.state.goals.dailyGoals;
            let index = this.mapFunc(this.state.goals.dailyGoals, 'id', key)
            toCompletedGoal = this.state.goals.dailyGoals[index]
            filteredArr.splice(index, 1);
            state.goals.dailyGoals = filteredArr
        }
        else{
            //maps and finds category
            this.state.goals.otherGoalsCategories.forEach((catagories, index) => {
                if(catagories.category === category){
                    // sets filtered Arr to goal then filters out the deleted goal
                    let filteredArr = this.state.goals.otherGoalsCategories[index].otherGoals;
                    // Finds and removes goal
                    this.state.goals.otherGoalsCategories[index].otherGoals.forEach((goal, index) =>{
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
        // switch to determine sort goals stuff can probably simplify
        switch(whichClicked){
            case('allTypes'):
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
            default:
                break;
        }
        this.setState({
            otherStuffs: otherStuffs
        })
    }
    completed = (newGoal, category) => {
        let state = this.state
        if(category === 'daily'){
            let endDate = new Date(newGoal.endDate);
            let totalDays = Math.abs(new Date(newGoal.startDate) - endDate) / 8.64e+7;
            newGoal = {
                id: newGoal.id,
                title: newGoal.title,
                snippit: newGoal.snippit,
                startDate: newGoal.startDate,
                endDate: newGoal.endDate,
                daysChecked: newGoal.daysChecked,
                percentComplete: ((newGoal.daysChecked/totalDays * 100).toString().substr(0, 2))
            }
            state.goals.completed.dailyGoals.push(newGoal);
        }
        else{
            let newCategory = true; // true of false if new category

            // checks for category and pushes to category if it finds it
            let index = this.mapFunc(this.state.goals.completed.otherGoalsCategories, 'category', category)
            if(index !== null){
                state.goals.completed.otherGoalsCategories[index].otherGoals.push(newGoal)
                    newCategory = false;
            }

            //makes new category and pushes
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
    displayGoalOverlay = () => {
        let state = this.state.otherStuffs
        state.overlayIsHidden = !state.overlayIsHidden;
        this.setState({
            [state.otherStuffs]: state
          })
    }
    updateCheckMark = (key) => {
        let state = this.state.goals;
        //finds index of item
        let index = this.mapFunc(state.dailyGoals, 'id', key)
        //updates index
        state.dailyGoals[index].weeklyChecked[4] = !state.dailyGoals[index].weeklyChecked[4]
        state.dailyGoals[index].weeklyChecked[4] ? state.dailyGoals[index].daysChecked++ : state.dailyGoals[index].daysChecked--
        this.setState({
            [state.goals]: state
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
                lastDayUpdated: startDate,
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
                let index = this.mapFunc(this.state.goals.otherGoalsCategories, 'category', category)
                state.goals.otherGoalsCategories[index].otherGoals.push(newGoal)
            }
        }
        //push to state and close overlay
        state.otherStuffs.overlayIsHidden = true;
        this.setState({
            state: state
        })
        return;
    }
    navSlideChange = ()=>{
        const nav = document.querySelector('.sidenav');
        nav.classList.toggle('nav-active');
    }
    addPercentage = (id, category) => {
        let state = this.state;

        let categoryIndex = this.mapFunc(this.state.goals.otherGoalsCategories, 'category', category)
        let goalIndex = this.mapFunc(this.state.goals.otherGoalsCategories[categoryIndex].otherGoals, 'id', id)
        state.goals.otherGoalsCategories[categoryIndex].otherGoals[goalIndex].percentComplete+= 2;

        if(state.goals.otherGoalsCategories[categoryIndex].otherGoals[goalIndex].percentComplete > 99){
            this.deleteGoal(id, category);
        }
        else{
            this.setState({
                state: state
            })
        }
    }
    subtractPercentage = (id, category) => {
        let state = this.state;

        let categoryIndex = this.mapFunc(this.state.goals.otherGoalsCategories, 'category', category)
        let goalIndex = this.mapFunc(this.state.goals.otherGoalsCategories[categoryIndex].otherGoals, 'id', id)

        if(state.goals.otherGoalsCategories[categoryIndex].otherGoals[goalIndex].percentComplete <= 0){
            return;
        }
        else{
            state.goals.otherGoalsCategories[categoryIndex].otherGoals[goalIndex].percentComplete+= -2;
            this.setState({
                state: state
            })
        }
    }
    mapFunc = (list, category, find) =>{
        for(let i = 0; i < list.length; i++){
            if(list[i][category] === find){
                return i;
            }
        }
        return null;
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
                <div className = "navdropdown" onClick={this.navSlideChange}>
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
                        {this.state.otherStuffs.renderDaily && this.state.goals.dailyGoals.length !== 0 && this.state.otherStuffs.renderCurrent && <DailyGoalHeading/>}
                        <div className="dailygoalslist">
                        {this.state.otherStuffs.renderDaily && this.state.goals.completed.dailyGoals.length !==  0 && this.state.otherStuffs.renderCompleted &&<CompletedDailyGoals dailyGoals={this.state.goals.completed.dailyGoals} />}
                         {this.state.otherStuffs.renderDaily && this.state.otherStuffs.renderCurrent && this.state.goals.dailyGoals.length !== 0 &&<DailyGoals updateCheckMark={this.updateCheckMark} dailyGoals={this.state.goals.dailyGoals} deleteGoal={this.deleteGoal}/>}
                        </div>
                    </div>
                    {this.state.otherStuffs.renderOther && this.state.otherStuffs.renderCurrent && this.state.goals.otherGoalsCategories.length !== 0 && <OtherGoals otherGoalCategories={this.state.goals.otherGoalsCategories} deleteGoal={this.deleteGoal}  addPercentage={this.addPercentage} subtractPercentage={this.subtractPercentage}/>}
                    {this.state.otherStuffs.renderOther && this.state.goals.completed.otherGoalsCategories.length !== 0 && this.state.otherStuffs.renderCompleted && <CompletedOtherGoals otherGoalCategories={this.state.goals.completed.otherGoalsCategories}/>}
                </div>
                {!this.state.otherStuffs.overlayIsHidden && <Overlay otherGoalCategories={this.state.goals.otherGoalsCategories} closeGoalOverlay={this.displayGoalOverlay} stateAdd={this.stateAdd}/>}
            </div>
    </div>
    );
    }
}

export default App;
