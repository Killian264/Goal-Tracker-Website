import React, { Component } from "react";
import "../../css/app.css";
// Components
import Overlay from "../Components/Overlay";
import SideNav from "../Components/SideNav";
import TopNav from "../Components/TopNav";
import CategoriesPage from './CategoriesPage';
// Funcs
import update from "immutability-helper";
import {goalService} from '../../services/goal.service';
import { helpers } from '../../helpers/helpers';
import { PulseLoader} from 'react-spinners';
import {updateStateForMount} from '../Helpers/FetchParsings';
import {stateHelper} from '../Helpers/StateGoalHelpers';

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
                renderCurrent: true,
                renderCompleted: false,
                renderDaily: true,
                renderOther: true,
                loading: true
            }
        };
    }

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

    render() {
		const { state } = this;
        return (
            <React.Fragment>
                <SideNav/>
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
                        <CategoriesPage state={state} stateHelper={stateHelper}/>



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