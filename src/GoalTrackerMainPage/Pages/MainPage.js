import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "../../css/app.scss";

// Components
import Overlay from "../Components/Overlay";
import SideNav from "../Components/SideNav";
import MiniNav from "../Components/MiniNav";
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
import { makeGoal } from '../../helpers/MakeGoals';

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
                innerWidth: 1000,
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
                this.setState(update(this.state, {goals: {$set: updateStateForMount(state).goals}, otherStuffs: {loading: {$set: false}, innerWidth: {$set: window.innerWidth} }}));
            },
            error => {
                // atob decodes base64 cookie
                let user = atob(window.btoa(localStorage.getItem("user")));
                if(user !== "Static"){
                    helpers.pushToLogin();
                }
                let state = makeGoal.makeStaticGoals();
                this.setState(update(this.state, {goals: {$set: updateStateForMount(state).goals}, otherStuffs: {loading: {$set: false}, innerWidth: {$set: window.innerWidth} }}));
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
        const style = {
            loader: {
                position: "absolute", 
                zIndex: 9999, 
                marginLeft: "50%", 
                marginTop: "25%", 
                outline: "9999px solid rgba(0,0,0,0.5)", 
                background: "rgba(0,0,0,0.5)"
            }
        }
        return (
            <React.Fragment>
                {/* This could be done with a HOC or have this as this as its own page until load */}
                <PulseLoader
                    css={style.loader}
                    sizeUnit={"px"}
                    size={15}
                    color={'black'}
                    loading={this.state.otherStuffs.loading}
                />
                <TopNav
                    displayGoalOverlay={this.displayGoalOverlay}
                />
                {(this.state.otherStuffs.innerWidth > 720) && 
                <MiniNav 
                    updatePageDisplay={this.updatePageDisplay}
                    pageDisplay={this.state.otherStuffs.pageDisplay}
                />}
                <SideNav 
                    updatePageDisplay={this.updatePageDisplay}
                    pageDisplay={this.state.otherStuffs.pageDisplay}
                />
                {/* Side selector for what to render */}
                <div className={"container-fluid pt-3 " + ((this.state.otherStuffs.innerWidth > 720) ? "size-minus-mininav" : "") }  >
                    <div className="row">
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
                </div>
            </React.Fragment>
        );
    }
}

export default App;
