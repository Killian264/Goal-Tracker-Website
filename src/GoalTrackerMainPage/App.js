import React, { Component } from "react";
import "../css/app.css";
import DailyGoalHeading from "./DailyGoals/DailyGoalHeading";
import OtherGoals from "./OtherGoals/OtherGoals";
import TypeSelector from "./TypeSelector";
import Overlay from "./Overlay";
import { getToday, getYeseterday } from "../helpers/commonCommands";
import CompletedDailyGoals from "./CompletedGoals/DailyGoalsCompleted";
import SideNav from "./SideNav";
import TopNav from "./TopNav";
import update from "immutability-helper";
import {goalService} from '../services/goal.service';
import {makeGoal} from "../helpers/MakeGoals";
import { helpers } from '../helpers/helpers';
import { PulseLoader} from 'react-spinners';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goals: {
                dailyGoals: [],
                otherGoalsCategories: [],
                completed: {
                    dailyGoals: [],
                    otherGoalsCategories: []
                }
            },
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
    updateStateForMount(state) {
        if (state.goals === undefined) {
            return state;
        }
        if (state.goals.dailyGoals.length !== 0) {
            let updatedCompletedDailyGoals = state.goals.completed.dailyGoals;
            const filteredDailyGoals = state.goals.dailyGoals.filter(goal => {
                if (Date.parse(goal.endDate) <= Date.parse(getYeseterday())) {
                    updatedCompletedDailyGoals = [
                        ...updatedCompletedDailyGoals,
                        makeGoal.makeCompletedDailyGoal(goal)
                    ];
                    goalService.postGoal(goal, "daily");
                    return false;
                }
                return true;
            });
            const updatedDailyGoals = filteredDailyGoals.map(goal => {
                if (Date.parse(goal.lastDayUpdated) < Date.parse(getToday())) {
                    const numDays =
                        ((Date.parse(goal.lastDayUpdated) -
                            Date.parse(getToday())) /
                            8.64e7) *
                        -1;
                    return this.updateLastUpdated(goal, numDays);
                }
                return goal;
            });
            state.goals.dailyGoals = updatedDailyGoals;
            if (updatedCompletedDailyGoals === undefined) {
                state.goals.completed.dailyGoals = [];
            } else {
                state.goals.completed.dailyGoals = updatedCompletedDailyGoals;
            }
        }
        if (state.goals.otherGoalsCategories !== undefined) {
            let count = 0;
            let updatedOtherGoalsCategories = state.goals.otherGoalsCategories.map(
                categories => {
                    count = 0;
                    const updatedOtherGoals = categories.otherGoals.map(
                        goal => {
                            if (!goal.isCompleted) {
                                if (
                                    Date.parse(goal.endDate) <=
                                    Date.parse(getYeseterday())
                                ) {
                                    goalService.updateGoal(
                                        goal.id,
                                        categories.id,
                                        null
                                    );
                                    goal = update(goal, {
                                        isCompleted: { $set: true }
                                    });
                                } else {
                                    count++;
                                }
                            }
                            return goal;
                        }
                    );

                    return Object.assign({}, categories, {
                        otherGoals: updatedOtherGoals,
                        unCompleted: count,
                        render: true,
                    });
                }
            );
            updatedOtherGoalsCategories = updatedOtherGoalsCategories.filter(
                categories => categories !== null
            );
            state.goals.otherGoalsCategories = updatedOtherGoalsCategories;
        }
        return state;
    }

    componentDidMount() {
        goalService.getGoalsData().then(
            user => {
                let state = {
                    goals: JSON.parse(user)
                };
                let otherStuffs = update(this.state, {goals: {$set: this.updateStateForMount(state).goals}, otherStuffs: {loading: {$set: false}}})
                this.setState(update(this.state, {goals: {$set: this.updateStateForMount(state).goals}, otherStuffs: {loading: {$set: false}}}));
            },
            error => {
                helpers.pushToLogin();
            }
        );
	}

    updateCategoryRender = index => {
		this.setState(update(this.state, {goals: {otherGoalsCategories: {[index]: {render: {$set: !this.state.goals.otherGoalsCategories[index].render}} } } } ));
    };

    updateLastUpdated = (goal, numDays) => {
        let newGoal;
        const weeklyChecked = [false, false, false, false, false, false, false];
        if (numDays > 5) {
            newGoal = Object.assign({}, goal, {
                lastDayUpdated: getToday(),
                weeklyChecked
            });
        } else {
            for (let i = 0; i < 5 - numDays; i += 1) {
                weeklyChecked[i] = goal.weeklyChecked[i + numDays];
            }
            newGoal = Object.assign({}, goal, {
                weeklyChecked,
                lastDayUpdated: getToday()
            });
		}
        goalService.updateGoal(goal.id, "daily", newGoal.weeklyChecked);
        return newGoal;
	};
	
    deleteGoal = (isDaily, categoryLoc, goalLoc) => {
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
    completeGoal = (categoryLoc, goalLoc) => {
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

    updateRenderIfs = whichClicked => {
        let { otherStuffs } = this.state;
        if (otherStuffs[whichClicked] === false) {
            otherStuffs = Object.assign({}, otherStuffs, {
                [whichClicked]: true
            });
        }
        // switch to determine sort goals stuff can probably simplify
        switch (whichClicked) {
            case "allTypes":
                if (
                    otherStuffs.renderDaily === true &&
                    otherStuffs.renderOther === true
                ) {
                    return;
                }
                otherStuffs = Object.assign({}, otherStuffs, {
                    renderDaily: true,
                    renderOther: true
                });
                break;
            case "renderCurrent":
                if (otherStuffs.renderCompleted === true) {
                    otherStuffs = Object.assign({}, otherStuffs, {
                        renderCompleted: false
                    });
                }
                break;
            case "renderCompleted":
                if (otherStuffs.renderCurrent === true) {
                    otherStuffs = Object.assign({}, otherStuffs, {
                        renderCurrent: false
                    });
                }
                break;
            case "renderDaily":
                if (otherStuffs.renderOther === true) {
                    otherStuffs = Object.assign({}, otherStuffs, {
                        renderOther: false
                    });
                }
                break;
            case "renderOther":
                if (otherStuffs.renderDaily === true) {
                    otherStuffs = Object.assign({}, otherStuffs, {
                        renderDaily: false
                    });
                }
                break;
            default:
                break;
        }
        if (otherStuffs === this.state.otherStuffs) {
            return;
        }
        this.setState({
            otherStuffs
        });
    };

    displayGoalOverlay = () => {
        this.setState({
            otherStuffs: update(this.state.otherStuffs, {overlayIsHidden: {$set: !this.state.otherStuffs.overlayIsHidden}}
        )});
    };
    updateCheckMark = key => {
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

    stateAdd = newGoal => {
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

    render() {
		const { state } = this;
        return (
            <React.Fragment>
                <SideNav/>
                <TopNav
                    displayGoalOverlay={this.displayGoalOverlay}
                />
                <PulseLoader
                    css={{position: "absolute", "z-index": 10, "margin-left": "50%", "margin-top": "25%", outline: "9999px solid rgba(0,0,0,0.5)", background: "rgba(0,0,0,0.5)"}}
                    sizeUnit={"px"}
                    size={15}
                    color={'black'}
                    loading={this.state.otherStuffs.loading}
                    />
                <div className="main">
                    {/* Side selector for what to render */}
                    <TypeSelector
                        goals={state.goals}
                        updateRenderIfs={this.updateRenderIfs}
                        updateCategoryRender={this.updateCategoryRender}
                    />
                    <div className="goals">
                        {/* Daily Goals */}
                        {state.otherStuffs.renderDaily &&
                            state.goals.dailyGoals.length !== 0 &&
                            state.otherStuffs.renderCurrent && (
                                <DailyGoalHeading
                                    updateCheckMark={this.updateCheckMark}
                                    dailyGoals={state.goals.dailyGoals}
                                    deleteGoal={this.deleteGoal}
                                    otherStuffs={state.otherStuffs}
                                />
                            )}
                        {/* Completed Daily Goals */}
                        {state.otherStuffs.renderDaily &&
                            state.goals.completed.dailyGoals.length !== 0 &&
                            state.otherStuffs.renderCompleted && (
                                <CompletedDailyGoals
                                    dailyGoals={
                                        state.goals.completed.dailyGoals
                                    }
                                    deleteGoal={this.deleteGoal}
                                />
                            )}
                        {/* Other Goals */}
                        {state.otherStuffs.renderOther &&
                            state.goals.otherGoalsCategories.length !== 0 && (
                                <OtherGoals
                                    otherGoalCategories={
                                        state.goals.otherGoalsCategories
                                    }
                                    deleteGoal={this.deleteGoal}
                                    completeGoal={this.completeGoal}
                                    displayCompleted={
                                        state.otherStuffs.renderCompleted
                                    }
                                />
                            )}
                        {/* Completed Other Goals */}
                        {/* {state.otherStuffs.renderOther && state.goals.completed.otherGoalsCategories.length !== 0 && state.otherStuffs.renderCompleted
							&& <CompletedOtherGoals otherGoalCategories={state.goals.completed.otherGoalsCategories} />} */}
                    </div>
                    {/* Overlay */}
                    {!state.otherStuffs.overlayIsHidden && (
                        <Overlay
                            otherGoalCategories={
                                state.goals.otherGoalsCategories
                            }
                            closeGoalOverlay={this.displayGoalOverlay}
                            stateAdd={this.stateAdd}
                        />
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default App;
