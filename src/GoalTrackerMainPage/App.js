/* eslint-disable max-len */
import React, { Component } from "react";
import "./App.css";
import DailyGoalHeading from "./DailyGoals/DailyGoalHeading";
import OtherGoals from "./OtherGoals/OtherGoals";
import TypeSelector from "./TypeSelector";
import Overlay from "./Overlay";
import { getToday, getYeseterday } from "./commonCommands";
import CompletedDailyGoals from "./CompletedGoals/DailyGoals/DailyGoalsCompleted";
// import CompletedOtherGoals from './CompletedGoals/OtherGoals/OtherGoalsCompleted';
import SideNav from "./SideNav";
import TopNav from "./TopNav";
import update from "immutability-helper";
// import {makeCompletedOtherGoalCategory} from './MakeGoals';
import {
  makeCompletedDailyGoal,
  makeDailyGoal,
  makeOtherGoal,
  makeOtherGoalCategory
} from "./MakeGoals";
import { userService } from "../services/user.service";
import { createBrowserHistory } from "history";
// import {
//   makeCompletedDailyGoal, makeCompletedOtherGoal, makeDailyGoal, makeCompletedOtherGoalCategory, makeOtherGoal, makeOtherGoalCategory,
// } from './MakeGoals';
// this could and probably should be simplified more later by moving the completed daily goals into their own section inside goals or even having a category for them inside otherGoalsCategories
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
        renderOther: true
      }
    };
  }
  updateStateForMount(state) {
    let updatedCompletedDailyGoals = state.goals.completed.dailyGoals;
    let updatedCompletedOtherCategories =
      state.goals.completed.otherGoalsCategories;
    let today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const filteredDailyGoals = state.goals.dailyGoals.filter(goal => {
      if (Date.parse(goal.endDate) <= Date.parse(getYeseterday())) {
        updatedCompletedDailyGoals = [
          ...updatedCompletedDailyGoals,
          makeCompletedDailyGoal(goal)
        ];
        return false;
      }
      return true;
    });
    const updatedDailyGoals = filteredDailyGoals.map(goal => {
      if (Date.parse(goal.lastDayUpdated) < Date.parse(getToday())) {
        const numDays =
          ((Date.parse(goal.lastDayUpdated) - Date.parse(getToday())) /
            8.64e7) *
          -1;
        return this.updateLastUpdated(goal, numDays);
      }
      return goal;
    });
    let count = 0;
    let updatedOtherGoalsCategories = state.goals.otherGoalsCategories.map(
      categories => {
        count = 0;
        const updatedOtherGoals = categories.otherGoals.map(goal => {
          if (Date.parse(goal.endDate) <= Date.parse(getYeseterday())) {
            // updatedCompletedOtherCategories = this.updatedOtherCompleted(goal, categories.category, updatedCompletedOtherCategories);
            goal = update(goal, { isCompleted: { $set: true } });
          } else {
            count++;
          }
          return goal;
        });

        // if (updatedOtherGoals.length <= 0) {
        // 	return null;
        // }
        return Object.assign({}, categories, {
          otherGoals: updatedOtherGoals,
          unCompleted: count
        });
      }
    );
    updatedOtherGoalsCategories = updatedOtherGoalsCategories.filter(
      categories => categories !== null
    );
    return {
      goals: Object.assign({}, state.goals, {
        dailyGoals: updatedDailyGoals,
        otherGoalsCategories: updatedOtherGoalsCategories,
        completed: Object.assign({}, state.goals.completed, {
          dailyGoals: updatedCompletedDailyGoals,
          otherGoalsCategories: updatedCompletedOtherCategories
        })
      })
    };
  }

  componentDidMount() {
    userService.getData().then(
      user => {
        console.log("user", user);
        this.setState(this.updateStateForMount(JSON.parse(user)));
      },
      error => {
        const history = createBrowserHistory();
        history.push("/login");
        document.location.reload();
      }
    );
  }

  updateCategoryRender = key => {
    this.setState(prevState => {
      const updatedCategoryRender = prevState.goals.otherGoalsCategories.map(
        category => {
          if (category.id === key) {
            return Object.assign({}, category, {
              render: !category.render
            });
          }
          return category;
        }
      );
      return {
        goals: Object.assign({}, prevState.goals, {
          otherGoalsCategories: updatedCategoryRender
        })
      };
    });
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
    return newGoal;
  };
  deleteGoal = (isDaily, categoryLoc, goalLoc) => {
    if (isDaily) {
      if (categoryLoc === -1) {
        this.setState(
          update(this.state, {
            goals: { completed: { dailyGoals: { $splice: [[goalLoc, 1]] } } }
          })
        );
      } else {
        this.setState(
          update(this.state, {
            goals: { dailyGoals: { $splice: [[goalLoc, 1]] } }
          })
        );
      }
      return;
    } else {
      // prolly need to make this delete the category if nothing is left
      let updatedUnCompleted = this.state.goals.otherGoalsCategories[
        categoryLoc
      ].unCompleted;
      if (
        !this.state.goals.otherGoalsCategories[categoryLoc].otherGoals[goalLoc]
          .isCompleted
      ) {
        updatedUnCompleted -= 1;
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
    setTimeout(() => {
      if (
        this.state.goals.otherGoalsCategories[categoryLoc].unCompleted !== 0
      ) {
        let updatedUnCompleted =
          this.state.goals.otherGoalsCategories[categoryLoc].unCompleted - 1;
        this.setState(
          update(this.state, {
            goals: {
              otherGoalsCategories: {
                [categoryLoc]: {
                  otherGoals: {
                    [goalLoc]: {
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
    this.setState(prevState => ({
      otherStuffs: Object.assign({}, prevState.otherStuffs, {
        overlayIsHidden: !prevState.otherStuffs.overlayIsHidden
      })
    }));
  };

  updateCheckMark = key => {
    const state = Object.assign({}, this.state);
    state.goals.dailyGoals = state.goals.dailyGoals.map(goal => {
      if (goal.id === key) {
        return Object.assign({}, goal, {
          daysChecked: !goal.weeklyChecked[4]
            ? goal.daysChecked + 1
            : goal.daysChecked - 1,
          weeklyChecked: Object.assign({}, goal.weeklyChecked, {
            4: !goal.weeklyChecked[4]
          })
        });
      }
      return goal;
    });
    this.setState(state);
  };

  getData(goal, valueType) {
    console.log(goal);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + window.btoa(localStorage.getItem("user"))
      },
      body: JSON.stringify(goal) + goal.weeklyChecked
    };
    return fetch(
      `http://localhost:61487/api/values/` + valueType,
      requestOptions
    )
      .then()
      .then(user => {
        console.log(user);
      });
  }

  stateAdd = newGoal => {
    const { state } = this;
    let { goals } = this.state;
    let goal;
    if (newGoal.type === "daily") {
      goal = makeDailyGoal(newGoal);
      this.getData(goal, "daily");
      goals = Object.assign({}, goals, {
        dailyGoals: [...goals.dailyGoals, goal]
      });
    } else {
      const { category, newCategory } = newGoal;
      goal = makeOtherGoal(newGoal);
      // this.getData(goal);
      if (newCategory === true) {
        console.log("goal", goal);
        goal = makeOtherGoalCategory(goal, category);
        this.getData(goal, "otherCategory");
        goals = Object.assign({}, goals, {
          otherGoalsCategories: [...goals.otherGoalsCategories, goal]
        });
      } else {
        goals.otherGoalsCategories = goals.otherGoalsCategories.map(goal2 => {
          if (goal2.category === category) {
            return Object.assign({}, goal2, {
              otherGoals: [...goal2.otherGoals, goal]
            });
          }
          return goal2;
        });
      }
    }
    console.log(goals);
    this.setState({
      goals,
      otherStuffs: Object.assign({}, state.otherStuffs, {
        overlayIsHidden: true
      })
    });
  };

  navSlideChange = () => {
    const nav = document.querySelector(".sidenav");
    nav.classList.toggle("nav-active");
  };

  render() {
    const { state } = this;
    return (
      <React.Fragment>
        <SideNav />
        <TopNav
          navSlideChange={this.navSlideChange}
          displayGoalOverlay={this.displayGoalOverlay}
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
                  dailyGoals={state.goals.completed.dailyGoals}
                  deleteGoal={this.deleteGoal}
                />
              )}
            {/* Other Goals */}
            {state.otherStuffs.renderOther &&
              state.goals.otherGoalsCategories.length !== 0 && (
                <OtherGoals
                  otherGoalCategories={state.goals.otherGoalsCategories}
                  deleteGoal={this.deleteGoal}
                  completeGoal={this.completeGoal}
                  displayCompleted={state.otherStuffs.renderCompleted}
                />
              )}
            {/* Completed Other Goals */}
            {/* {state.otherStuffs.renderOther && state.goals.completed.otherGoalsCategories.length !== 0 && state.otherStuffs.renderCompleted
							&& <CompletedOtherGoals otherGoalCategories={state.goals.completed.otherGoalsCategories} />} */}
          </div>
          {/* Overlay */}
          {!state.otherStuffs.overlayIsHidden && (
            <Overlay
              otherGoalCategories={state.goals.otherGoalsCategories}
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
