import {goalService} from '../../services/goal.service';
import update from "immutability-helper";
import {makeGoal} from "../../helpers/MakeGoals";
import { getToday } from "../../helpers/commonCommands";

export const stateHelper = {
    updateCheckMark,
    stateAdd,
    deleteGoal,
    completeGoal,
};

function updateCheckMark(key){
    // this could be simplified using update from immutability helper and passing index instead of key
    const state = Object.assign({}, this.state);
    state.goals.dailyGoals = state.goals.dailyGoals.map(goal => {
        if (goal.id === key) {
            let weeklyChecked = update(goal.weeklyChecked, {4: {$set: !goal.weeklyChecked[4]}});
            let newGoal = Object.assign({}, goal, {
                daysChecked: !goal.weeklyChecked[4]
                    ? goal.daysChecked + 1
                    : goal.daysChecked - 1,
                weeklyChecked: weeklyChecked
            });
            goalService.updateGoal(goal.id, "daily", weeklyChecked);
            return newGoal;
        }
        return goal;
    });
    this.setState(state);
};

function stateAdd(newGoal){
    let { goals } = this.state;
    let goal;
    let postType;
    if(newGoal.type === "daily"){
        goal = makeGoal.makeDailyGoal(newGoal);
        goals = update(goals, {dailyGoals: {$push: [goal]}});
        postType = "daily";
    }
    else{
        const { category, newCategory, type } = newGoal;
        goal = makeGoal.makeOtherGoal(newGoal);
        if (newCategory === true) {
            goal = makeGoal.makeOtherGoalCategory(goal, category);
            goals = update(goals, {otherGoalsCategories: {$push: [goal]}});
            postType = "otherCategory";
        } 
        else {
            goals = update(goals, {otherGoalsCategories: {[type]: {otherGoals: {$push: [goal]}, unCompleted: {$set: goals.otherGoalsCategories[type].unCompleted+=1} }}});
            goal = {
                ...goal,
                categoryID: goals.otherGoalsCategories[type].id,
            }
            postType = "otherGoal";
        }
    }
    goalService.postGoal(goal, postType);
    this.setState({
        goals,
        otherStuffs: Object.assign({}, this.state.otherStuffs, {
            overlayIsHidden: true
        })
    });
};

export function deleteGoal(isDaily, categoryLoc, goalLoc){
    if (isDaily) {
        if (categoryLoc === -1) {
            goalService.APIDeleteGoal(
                this.state.goals.completed.dailyGoals[goalLoc].id,
                "completedDaily"
            );

            this.setState(
                update(this.state, {
                    goals: {
                        completed: {
                            dailyGoals: { $splice: [[goalLoc, 1]] }
                        }
                    }
                })
            );
        } else {
            goalService.APIDeleteGoal(
                this.state.goals.dailyGoals[goalLoc].id,
                "daily"
            );
            this.setState(
                update(this.state, {
                    goals: { dailyGoals: { $splice: [[goalLoc, 1]] } }
                })
            );
        }
        return;
    } else {
        goalService.APIDeleteGoal(
            this.state.goals.otherGoalsCategories[categoryLoc].otherGoals[goalLoc].id,
            this.state.goals.otherGoalsCategories[categoryLoc].id
        );
        let updatedUnCompleted = this.state.goals.otherGoalsCategories[categoryLoc].unCompleted;
        if (!this.state.goals.otherGoalsCategories[categoryLoc].otherGoals[goalLoc].isCompleted) {
            updatedUnCompleted -= 1;
        }
        if (this.state.goals.otherGoalsCategories[categoryLoc].length === 1) {
            this.setState(
                update(this.state, {
                    goals: {
                        otherGoalsCategories: {
                            [categoryLoc]: { $splice: [[categoryLoc, 1]] }
                        }
                    }
                })
            );
            return;
        }
        this.setState(
            update(this.state, {
                goals: {
                    otherGoalsCategories: {
                        [categoryLoc]: {
                            unCompleted: { $set: updatedUnCompleted },
                            otherGoals: { $splice: [[goalLoc, 1]] }
                        }
                    }
                }
            })
        );
    }
};
function completeGoal(categoryLoc, goalLoc){
    goalService.updateGoal(this.state.goals.otherGoalsCategories[categoryLoc].otherGoals[goalLoc].id,
        this.state.goals.otherGoalsCategories[categoryLoc].id,
        null
    );
    setTimeout(() => {
        if (this.state.goals.otherGoalsCategories[categoryLoc].unCompleted !== 0) {
            let updatedUnCompleted = this.state.goals.otherGoalsCategories[categoryLoc].unCompleted - 1;
            this.setState(
                update(this.state, {
                    goals: {otherGoalsCategories: {[categoryLoc]: {otherGoals: {[goalLoc]: {
                                        isCompleted: { $set: true },
                                        endDate: { $set: getToday() }
                                    }
                                },
                                unCompleted: { $set: updatedUnCompleted }
                            }
                        }
                    }
                })
            );
        }
    }, 1000);
};