/* eslint-disable max-len */
import React, { Component } from 'react';
import './App.css';
import DailyGoalHeading from './DailyGoals/DailyGoalHeading';
import OtherGoals from './OtherGoals/OtherGoals';
import TypeSelector from './TypeSelector';
import Overlay from './Overlay';
import { getToday, getYeseterday } from './commonCommands';
import CompletedDailyGoals from './CompletedGoals/DailyGoals/DailyGoalsCompleted';
import CompletedOtherGoals from './CompletedGoals/OtherGoals/OtherGoalsCompleted';
import SideNav from './SideNav';
import TopNav from './TopNav';
import {
  makeCompletedDailyGoal, makeDailyGoal, makeCompletedOtherGoalCategory, makeOtherGoal, makeOtherGoalCategory,
} from './MakeGoals';
// import {
//   makeCompletedDailyGoal, makeCompletedOtherGoal, makeDailyGoal, makeCompletedOtherGoalCategory, makeOtherGoal, makeOtherGoalCategory,
// } from './MakeGoals';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: {
        dailyGoals: [
        ],
        otherGoalsCategories: [
        ],
        completed: {
          dailyGoals: [],
          otherGoalsCategories: [],
        },
      },
      otherStuffs: {
        overlayIsHidden: true,
        renderCurrent: true,
        renderCompleted: false,
        renderDaily: true,
        renderOther: true,
      },
    };
  }

  // eslint-disable-next-line react/sort-comp
  updateStateForMount(state) {
    let updatedCompletedDailyGoals = state.goals.completed.dailyGoals;
    let updatedCompletedOtherCategories = state.goals.completed.otherGoalsCategories;
    // eslint-disable-next-line no-unused-vars
    let today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const filteredDailyGoals = state.goals.dailyGoals.filter((goal) => {
      if (Date.parse(goal.endDate) <= Date.parse(getYeseterday())) {
        updatedCompletedDailyGoals = [...updatedCompletedDailyGoals, makeCompletedDailyGoal(goal)];
        return false;
      }
      return true;
    });
    const updatedDailyGoals = filteredDailyGoals.map((goal) => {
      if (Date.parse(goal.lastDayUpdated) < Date.parse(getToday())) {
        const numDays = (((Date.parse(goal.lastDayUpdated) - Date.parse(getToday())) / 8.64e+7) * -1);
        return (this.updateLastUpdated(goal, numDays));
      }
      return goal;
    });
    let updatedOtherGoalsCategories = state.goals.otherGoalsCategories.map((categories) => {
      const updatedOtherGoals = categories.otherGoals.filter((goal) => {
        if (Date.parse(goal.endDate) <= Date.parse(getYeseterday())) {
          updatedCompletedOtherCategories = this.updatedOtherCompleted(goal, categories.category, updatedCompletedOtherCategories);
          return false;
        }
        return true;
      });
      if (updatedOtherGoals.length <= 0) {
        return null;
      }
      return Object.assign({}, categories, {
        otherGoals: updatedOtherGoals,
      });
    });
    updatedOtherGoalsCategories = updatedOtherGoalsCategories.filter(categories => categories !== null);
    return ({
      goals: Object.assign({}, state.goals, {
        dailyGoals: updatedDailyGoals,
        otherGoalsCategories: updatedOtherGoalsCategories,
        completed: Object.assign({}, state.goals.completed, {
          dailyGoals: updatedCompletedDailyGoals,
          otherGoalsCategories: updatedCompletedOtherCategories,
        }),
      }),

    });
  }

  componentDidMount() {
    // fetch('http://localhost:61487/api/values')
    //   .then(response => response.json())
    //   .then(data => this.setState(this.updateStateForMount(data)));
  }

    updateCategoryRender = (key) => {
      this.setState((prevState) => {
        const updatedCategoryRender = prevState.goals.otherGoalsCategories.map((category) => {
          if (category.id === key) {
            return Object.assign({}, category, {
              render: !category.render,
            });
          }
          return category;
        });
        return ({
          goals: Object.assign({}, prevState.goals, {
            otherGoalsCategories: updatedCategoryRender,
          }),
        });
      });
    }

    updateLastUpdated = (goal, numDays) => {
      let newGoal;
      const weeklyChecked = [false, false, false, false, false, false, false];
      if (numDays > 5) {
        newGoal = Object.assign({}, goal, {
          lastDayUpdated: getToday(),
          weeklyChecked,
        });
      } else {
        for (let i = 0; i < (5 - numDays); i += 1) {
          weeklyChecked[i] = goal.weeklyChecked[i + numDays];
        }
        newGoal = Object.assign({}, goal, {
          weeklyChecked,
          lastDayUpdated: getToday(),
        });
      }
      return newGoal;
    }

    deleteGoal = (key, category) => {
      let { state } = this;
      let toCompletedGoal;
      if (category === 'daily') {
        const updatedDaily = state.goals.dailyGoals.filter((goal) => {
          if (goal.id === key) {
            toCompletedGoal = goal;
            return false;
          }
          return true;
        });
        state = Object.assign({}, state, {
          goals: Object.assign({}, state.goals, {
            dailyGoals: updatedDaily,
            completed: Object.assign({}, state.goals.completed, {
              dailyGoals: [...state.goals.completed.dailyGoals, makeCompletedDailyGoal(toCompletedGoal)],
            }),
          }),
        });
      } else {
        let updatedOtherGoalsCategories = state.goals.otherGoalsCategories.map((categories) => {
          if (categories.category === category) {
            if (categories.otherGoals.length !== 1) {
              const updatedOtherGoals = categories.otherGoals.filter((goal) => {
                if (goal.id === key) {
                  toCompletedGoal = goal;
                  return false;
                }
                return true;
              });
              return Object.assign({}, categories, {
                otherGoals: updatedOtherGoals,
              });
            }
            toCompletedGoal = categories.otherGoals[0];
            return null;
          }
          return categories;
        });
        updatedOtherGoalsCategories = updatedOtherGoalsCategories.filter(categories => categories !== null);
        state = Object.assign({}, state, {
          goals: Object.assign({}, state.goals, {
            otherGoalsCategories: updatedOtherGoalsCategories,
            completed: Object.assign({}, state.goals.completed, {
              otherGoalsCategories: this.updatedOtherCompleted(toCompletedGoal, category, state.goals.completed.otherGoalsCategories),
            }),
          }),
        });
      }
      this.setState(state);
    }

    updatedOtherCompleted = (goal, category, completed) => {
      let found = false;
      const otherGoalsCategoryCompleted = completed.map((categories) => {
        if (categories.category === category) {
          found = true;
          return Object.assign({}, categories, {
            otherGoals: categories.otherGoals.concat(goal),
          });
        }
        return categories;
      });
      return (found ? otherGoalsCategoryCompleted : completed.concat(makeCompletedOtherGoalCategory(goal, category)));
    }

    updateRenderIfs = (whichClicked) => {
      let { otherStuffs } = this.state;
      if (otherStuffs[whichClicked] === false) {
        otherStuffs = Object.assign({}, otherStuffs, {
          [whichClicked]: true,
        });
      }
      // switch to determine sort goals stuff can probably simplify
      switch (whichClicked) {
        case ('allTypes'):
          if (otherStuffs.renderDaily === true && otherStuffs.renderOther === true) {
            return;
          }
          otherStuffs = Object.assign({}, otherStuffs, {
            renderDaily: true,
            renderOther: true,
          });
          break;
        case ('renderCurrent'):
          if (otherStuffs.renderCompleted === true) {
            otherStuffs = Object.assign({}, otherStuffs, {
              renderCompleted: false,
            });
          }
          break;
        case ('renderCompleted'):
          if (otherStuffs.renderCurrent === true) {
            otherStuffs = Object.assign({}, otherStuffs, {
              renderCurrent: false,
            });
          }
          break;
        case ('renderDaily'):
          if (otherStuffs.renderOther === true) {
            otherStuffs = Object.assign({}, otherStuffs, {
              renderOther: false,
            });
          }
          break;
        case ('renderOther'):
          if (otherStuffs.renderDaily === true) {
            otherStuffs = Object.assign({}, otherStuffs, {
              renderDaily: false,
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
        otherStuffs,
      });
    }

    displayGoalOverlay = () => {
      this.setState(prevState => ({
        otherStuffs: Object.assign({}, prevState.otherStuffs, {
          overlayIsHidden: !prevState.otherStuffs.overlayIsHidden,
        }),
      }));
    }

    updateCheckMark = (key) => {
      const state = Object.assign({}, this.state);
      state.goals.dailyGoals = state.goals.dailyGoals.map((goal) => {
        if (goal.id === key) {
          return (
            Object.assign({}, goal, {
              daysChecked: !goal.weeklyChecked[4] ? goal.daysChecked + 1 : goal.daysChecked - 1,
              weeklyChecked: Object.assign({}, goal.weeklyChecked, {
                4: !goal.weeklyChecked[4],
              }),
            })
          );
        }
        return goal;
      });
      this.setState(state);
    }

    stateAdd = (newGoal) => {
      const { state } = this;
      let { goals } = this.state;
      let goal;
      if (newGoal.type === 'daily') {
        goal = makeDailyGoal(newGoal);
        goals = Object.assign({}, goals, {
          dailyGoals: [...goals.dailyGoals, goal],
        });
      } else {
        const { category, newCategory } = newGoal;
        goal = makeOtherGoal(newGoal);
        if (newCategory === true) {
          goal = makeOtherGoalCategory(goal, category);
          goals = Object.assign({}, goals, {
            otherGoalsCategories: [...goals.otherGoalsCategories, newGoal],
          });
        } else {
          goals.otherGoalsCategories = goals.otherGoalsCategories.map((goal2) => {
            if (goal2.category === category) {
              return Object.assign({}, goal2, {
                otherGoals: [...goal2.otherGoals, goal],
              });
            }
            return goal2;
          });
        }
      }
      this.setState({
        goals,
        otherStuffs: Object.assign({}, state.otherStuffs, {
          overlayIsHidden: true,
        }),
      });
    }

    navSlideChange = () => {
      const nav = document.querySelector('.sidenav');
      nav.classList.toggle('nav-active');
    }

    addPercentage = (id, category) => {
      const { state } = this;
      let deleteThis = false;
      state.goals.otherGoalsCategories = state.goals.otherGoalsCategories.map((categories) => {
        if (categories.category === category) {
          const updatedOtherGoals = categories.otherGoals.map((goal) => {
            if (goal.id === id) {
              const updatedGoal = Object.assign({}, goal, {
                percentComplete: goal.percentComplete + 2,
              });
              if (updatedGoal.percentComplete >= 99) {
                deleteThis = true;
                this.deleteGoal(id, category);
              }
              return updatedGoal;
            }
            return goal;
          });
          return Object.assign({}, categories, {
            otherGoals: updatedOtherGoals,
          });
        }
        return categories;
      });
      if (deleteThis === false) {
        this.setState(state);
      }
    }

    subtractPercentage = (id, category) => {
      const { state } = this;
      state.goals.otherGoalsCategories = state.goals.otherGoalsCategories.map((categories) => {
        if (categories.category === category) {
          const updatedOtherGoals = categories.otherGoals.map((goal) => {
            if (goal.id === id) {
              if (goal.percentComplete <= 0) {
                return goal;
              }
              return (
                Object.assign({}, goal, {
                  percentComplete: goal.percentComplete - 2,
                })
              );
            }
            return goal;
          });
          return Object.assign({}, categories, {
            otherGoals: updatedOtherGoals,
          });
        }
        return categories;
      });
      this.setState(state);
    }

    render() {
      const { state } = this;
      return (
        <React.Fragment>
          <SideNav />
          <TopNav navSlideChange={this.navSlideChange} displayGoalOverlay={this.displayGoalOverlay} />
          <div className="main">
            {/* Side selector for what to render */}
            <TypeSelector goals={state.goals} updateRenderIfs={this.updateRenderIfs} updateCategoryRender={this.updateCategoryRender} />
            <div className="goals">
              {/* Daily Goals */}
              {state.otherStuffs.renderDaily && state.goals.dailyGoals.length !== 0 && state.otherStuffs.renderCurrent
                    && <DailyGoalHeading updateCheckMark={this.updateCheckMark} dailyGoals={state.goals.dailyGoals} deleteGoal={this.deleteGoal} otherStuffs={state.otherStuffs} />}
              {/* Completed Daily Goals */}
              {state.otherStuffs.renderDaily && state.goals.completed.dailyGoals.length !== 0 && state.otherStuffs.renderCompleted
                    && <CompletedDailyGoals dailyGoals={state.goals.completed.dailyGoals} />}
              {/* Other Goals */}
              {state.otherStuffs.renderOther && state.otherStuffs.renderCurrent && state.goals.otherGoalsCategories.length !== 0
                    && <OtherGoals otherGoalCategories={state.goals.otherGoalsCategories} deleteGoal={this.deleteGoal} addPercentage={this.addPercentage} subtractPercentage={this.subtractPercentage} />}
              {/* Completed Other Goals */}
              {state.otherStuffs.renderOther && state.goals.completed.otherGoalsCategories.length !== 0 && state.otherStuffs.renderCompleted
                    && <CompletedOtherGoals otherGoalCategories={state.goals.completed.otherGoalsCategories} />}
            </div>
            {/* Overlay */}
            {!state.otherStuffs.overlayIsHidden
                && <Overlay otherGoalCategories={state.goals.otherGoalsCategories} closeGoalOverlay={this.displayGoalOverlay} stateAdd={this.stateAdd} />}
          </div>
        </React.Fragment>
      );
    }
}

export default App;
