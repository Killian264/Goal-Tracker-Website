import React, { Component } from "react";
import "../../css/app.css";
// Components
import Overlay from "../Components/Overlay";
import SideNav from "../Components/SideNav";
import TopNav from "../Components/TopNav";
import CategoriesPage from './CategoriesPage';
import PlannedPage from '../PlannedPage/PlannedPage';
// Funcs
import update from "immutability-helper";
import { goalService } from '../../services/goal.service';
import { helpers } from '../../helpers/helpers';
import { PulseLoader } from 'react-spinners';
import { updateStateForMount } from '../Helpers/FetchParsings';
import { stateHelper } from '../Helpers/StateGoalHelpers';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goals: {
                dailyGoals: [],
                otherGoalsCategories: [],
                completed: {
                    dailyGoals: [],
                }
            },
            otherStuffs: {
                overlayIsHidden: true,
                loading: true,
                pageDisplay: "Categories",
            }
        };
    }

    updateCategoryRender = index => {
		this.setState(update(this.state, {goals: {otherGoalsCategories: {[index]: {render: {$set: !this.state.goals.otherGoalsCategories[index].render}} } } } ));
    };

    componentDidMount() {
        goalService.getGoalsData().then(
            user => {
                let state = {
                    goals: JSON.parse(user)
                };
                this.setState(update(this.state, {goals: {$set: updateStateForMount(state).goals}, otherStuffs: {loading: {$set: false}}}));
            },
            error => {
                helpers.pushToLogin();
            }
        );
	}

    displayGoalOverlay = () => {
        this.setState({
            otherStuffs: update(this.state.otherStuffs, {overlayIsHidden: {$set: !this.state.otherStuffs.overlayIsHidden}}
        )});
    };

    updatePageDisplay = (pageName) => {
        this.setState({
            otherStuffs: update(this.state.otherStuffs, {pageDisplay: {$set: pageName}}
        )})
    }

    render() {
		const { state } = this;
        return (
            <React.Fragment>
                <SideNav 
                    updatePageDisplay={this.updatePageDisplay}
                    pageDisplay={this.state.otherStuffs.pageDisplay}
                />
                <TopNav
                    displayGoalOverlay={this.displayGoalOverlay}
                />
                {/* This could be done with a HOC or have this as this as its own page until load */}
                <PulseLoader
                    css={{position: "absolute", "z-index": 10, "margin-left": "50%", "margin-top": "25%", outline: "9999px solid rgba(0,0,0,0.5)", background: "rgba(0,0,0,0.5)"}}
                    sizeUnit={"px"}
                    size={15}
                    color={'black'}
                    loading={this.state.otherStuffs.loading}
                />
                {/* Side selector for what to render */}
                <div className="main">
                    {/* Categories Page */}
                    {state.otherStuffs.pageDisplay === "Categories" && 
                        <CategoriesPage 
                            goals={state.goals} 
                            updateCheckMark={stateHelper.updateCheckMark.bind(this)}
                            deleteGoal={stateHelper.deleteGoal.bind(this)}
                            completeGoal={stateHelper.completeGoal.bind(this)}
                            updateCategoryRender={this.updateCategoryRender} 
                        />
                    }
                    {/* Planned Page */}
                    {state.otherStuffs.pageDisplay === "Planned" && 
                        <PlannedPage 
                            otherGoalsCategories={state.goals.otherGoalsCategories} 
                            updateCategoryRender={this.updateCategoryRender} 
                            deleteGoal={stateHelper.deleteGoal.bind(this)}
                            completeGoal={stateHelper.completeGoal.bind(this)}
                        />
                    }
                    {/* Overlay */}
                    {!state.otherStuffs.overlayIsHidden && (
                        <Overlay
                            otherGoalCategories={
                                state.goals.otherGoalsCategories
                            }
                            closeGoalOverlay={this.displayGoalOverlay}
                            stateAdd={stateHelper.stateAdd.bind(this)}
                        />
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default App;
