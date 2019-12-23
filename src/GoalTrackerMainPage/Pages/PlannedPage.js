import React, { Component } from "react";
import "../../css/app.css";
import DailyGoalHeading from "../Components/DailyGoals/DailyGoalHeading";
import OtherGoals from "../Components/OtherGoals/OtherGoals";
import TypeSelector from "../Components/TypeSelector";
import CompletedDailyGoals from "../Components/CompletedGoals/DailyGoalsCompleted";
import update from "immutability-helper";
import PropTypes from "prop-types";

class App extends Component {
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
        state: PropTypes.objectOf(PropTypes.object).isRequired,
        stateHelper: PropTypes.objectOf(PropTypes.func).isRequired
      };

    updateCategoryRender = index => {
		this.setState(update(this.state, {goals: {otherGoalsCategories: {[index]: {render: {$set: !this.state.goals.otherGoalsCategories[index].render}} } } } ));
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

    render() {
		const { state, stateHelper } = this.props;
        return (
                <React.Fragment>
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
                                    updateCheckMark={stateHelper.updateCheckMark}
                                    dailyGoals={state.goals.dailyGoals}
                                    deleteGoal={stateHelper.deleteGoal.bind(this)}
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
                                    deleteGoal={stateHelper.deleteGoal.bind(this)}
                                />
                            )}
                        {/* Other Goals */}
                        {state.otherStuffs.renderOther &&
                            state.goals.otherGoalsCategories.length !== 0 && (
                                <OtherGoals
                                    otherGoalCategories={
                                        state.goals.otherGoalsCategories
                                    }
                                    deleteGoal={stateHelper.deleteGoal.bind(this)}
                                    completeGoal={stateHelper.completeGoal.bind(this)}
                                    displayCompleted={
                                        state.otherStuffs.renderCompleted
                                    }
                                />
                            )}
                    </div>
                </React.Fragment>
        );
    }
}

export default App;
