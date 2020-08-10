import React, { Component } from "react";
import "../../css/app.scss";

import PlannedTypeSelector from './Components/PlannedTypeSelector';
import GoalDisplay from './Components/GoalDisplay';
import PropTypes from "prop-types";

import {getToday} from '../../helpers/commonCommands';

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
        otherGoalsCategories: PropTypes.arrayOf(shapes.otherGoalsCategoryShape).isRequired,
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
                    return(
                        otherGoals.push(Object.assign({}, goal, {
                            goalIndex: goalIndex,
                            categoryIndex: categoryIndex,
                            category: category.category,
                            numDaysFromToday: Math.abs(today - new Date(goal.endDate)) / 8.64e7,
                        }))
                    )
                }
                return null
            })
            return null
        })

        otherGoals = otherGoals.sort(function(a, b){
            if(new Date(a.endDate) > new Date(b.endDate)) return 1
            if(new Date(a.endDate) < new Date(b.endDate)) return -1
            return 0;

        })
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
            if(goal.numDaysFromToday >= 8){
                timespanLists[3].push(goal);
            }
            return null;
        })

        let output = timespanLists.map((list, index)=>{
            if(list.length !== 0){
                return(
                    <div className="card mb-3" key={index}>
                        <div className="card-header pl-3">
                            <h3>{timespan[index]}</h3>
                        </div>
                        <ul className="list-group list-group-flush">
                            <GoalDisplay
                                otherGoals={list}
                                deleteGoal={deleteGoal}
                                completeGoal={completeGoal}
                            />
                        </ul>
                    </div>
                )
            }
            return null;
        })

        return (
            <React.Fragment>
                {/* Side selector for what to render */}
                <div className="col-sm-4 col-md-3 col-lg-3 col-xl-2 pb-4">
                    <PlannedTypeSelector
                        otherGoalsCategories={otherGoalsCategories}
                        updateCategoryRender={updateCategoryRender}
                    />
                </div>
                <div className="col-sm-8 col-md-9 col-lg-9 col-xl-10">
                        {output}
                </div>
            </React.Fragment>
        );
    }
}

export default PlannedPage;
