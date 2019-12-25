import React, { Component } from "react";
import "../../css/app.css";

import PlannedTypeSelector from './Components/PlannedTypeSelector';
import GoalDisplay from './Components/GoalDisplay';
import PropTypes from "prop-types";

import {getTodayAsDateTime, getToday} from '../../helpers/commonCommands';

import { shapes } from '../../helpers/shapes';

class PlannedPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otherStuffs: {
                overlayIsHidden: true,
                renderCurrent: true,
                renderCompleted: false,
                renderDaily: true,
                renderOther: true,
                loading: true
            }
        };
    }
    static propTypes = {
        otherGoalsCategories: shapes.otherGoalsCategoryShape.isRequired,
        updateCategoryRender: PropTypes.func.isRequired,
        completeGoal: PropTypes.func.isRequired,
        deleteGoal: PropTypes.func.isRequired,
    };

    SortGoals = () =>{
        const { otherGoalsCategories } = this.props;
        let otherGoals = [];

        let today = new Date(getToday());

        otherGoalsCategories.map((category, categoryIndex) =>{
            category.otherGoals.map((goal, goalIndex) =>{
                if(category.render && !goal.isCompleted){
                    otherGoals.push(Object.assign({}, goal, {
                        goalIndex: goalIndex,
                        categoryIndex: categoryIndex,
                        category: category.category,
                        numDaysFromToday: Math.abs(today - new Date(goal.endDate)) / 8.64e7,
                    }))
                }
            })
        })

        otherGoals = otherGoals.sort(function(a, b){
            if(new Date(a.endDate) > new Date(b.endDate)) return 1
            if(new Date(a.endDate) < new Date(b.endDate)) return -1
            return 0;

        })
        // console.log(Math.abs(new Date(getToday()) - new Date(otherGoals[0].endDate)) / 8.64e7);
        // console.log(new Date(getToday()) === new Date(otherGoals[0].endDate));
        return otherGoals;

    }

    render() {
        const { otherGoalsCategories, updateCategoryRender, completeGoal, deleteGoal} = this.props;

        let otherGoals = this.SortGoals();

        // these are the timespan types
        let timespan = ["Today", "Tomorrow", "Week", "Later"];
        
        // these are the lists

        let timespanLists = [[]];

        timespanLists[0] = [];
        timespanLists[1] = [];
        timespanLists[2] = [];
        timespanLists[3] = [];
        // Mutation is fine here

        otherGoals.forEach((goal) => {
            if(goal.numDaysFromToday === 0){
                timespanLists[0].push(goal);
            }
            if(goal.numDaysFromToday === 1){
                timespanLists[1].push(goal);
            }
            if(goal.numDaysFromToday > 1 && goal.numDaysFromToday < 8){
                timespanLists[2].push(goal);
            }
            if(goal.numDaysFromToday > 8){
                timespanLists[3].push(goal);
            }
        })

        let output = timespanLists.map((list, index)=>{
            console.log(index, list);
            if(list.length !== 0){
                return(
                    <div className="othergoals" key={index}>
                        <div className="otherheading">
                            <div className="otherheadingheading">
                            <h1>{timespan[index]}</h1>
                            </div>
                        </div>
                        <GoalDisplay
                            otherGoals={list}
                            deleteGoal={deleteGoal}
                            completeGoal={completeGoal}
                        />
                    </div>
                )
            }
        })

        return (
            <React.Fragment>
                {/* Side selector for what to render */}
                <PlannedTypeSelector
                    otherGoalsCategories={otherGoalsCategories}
                    updateCategoryRender={updateCategoryRender}
                />
                <div className="goals">
                    {output}
                </div>
            </React.Fragment>
        );
    }
}

export default PlannedPage;
