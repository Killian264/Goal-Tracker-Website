import React, { Component } from "react";
import "../../css/app.css";
import DailyGoalHeading from "../Components/DailyGoals/DailyGoalHeading";
import OtherGoals from "../Components/OtherGoals/OtherGoals";
import TypeSelector from "../Components/TypeSelector";
import CompletedDailyGoals from "../Components/CompletedGoals/DailyGoalsCompleted";
import update from "immutability-helper";
import PropTypes from "prop-types";

import { shapes } from '../../helpers/shapes';

class CategoriesPage extends Component {
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
        goals: shapes.goalShape.isRequired,
        updateCategoryRender: PropTypes.func.isRequired,
        updateCheckMark: PropTypes.func.isRequired,
        completeGoal: PropTypes.func.isRequired,
        deleteGoal: PropTypes.func.isRequired,
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

    render() {
        const { goals, updateCategoryRender, updateCheckMark, deleteGoal, completeGoal} = this.props;
        const { otherStuffs } = this.state;
        return (
                <React.Fragment>
                    {/* Side selector for what to render */}
                    <TypeSelector
                        goals={goals}
                        updateRenderIfs={this.updateRenderIfs}
                        updateCategoryRender={updateCategoryRender}
                    />
                    <div className="goals">
                        {/* Daily Goals */}
                        {otherStuffs.renderDaily &&
                            goals.dailyGoals.length !== 0 &&
                            otherStuffs.renderCurrent && (
                                <DailyGoalHeading
                                    updateCheckMark={updateCheckMark}
                                    dailyGoals={goals.dailyGoals}
                                    deleteGoal={deleteGoal}
                                    otherStuffs={otherStuffs}
                                />
                            )}
                        {/* Completed Daily Goals */}
                        {otherStuffs.renderDaily &&
                            goals.completed.dailyGoals.length !== 0 &&
                            otherStuffs.renderCompleted && (
                                <CompletedDailyGoals
                                    dailyGoals={goals.completed.dailyGoals}
                                    deleteGoal={deleteGoal}
                                />
                            )}
                        {/* Other Goals */}
                        {otherStuffs.renderOther &&
                            goals.otherGoalsCategories.length !== 0 && (
                                <OtherGoals
                                    otherGoalCategories={goals.otherGoalsCategories}
                                    deleteGoal={deleteGoal}
                                    completeGoal={completeGoal}
                                    displayCompleted={
                                        otherStuffs.renderCompleted
                                    }
                                />
                            )}
                    </div>
                </React.Fragment>
        );
    }
}

export default CategoriesPage;
