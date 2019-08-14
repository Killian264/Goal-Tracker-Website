import React, { Component } from 'react';
import './App.css';
import uuid from 'uuid';
import DailyGoalHeading from './DailyGoals/DailyGoalHeading';
import OtherGoals from './OtherGoals/OtherGoals';
import TypeSelector from './TypeSelector';
import Overlay from './Overlay';
import { getToday, getYeseterday } from './commonCommands';
import CompletedDailyGoals from './CompletedGoals/DailyGoals/DailyGoals';
import CompletedOtherGoals from './CompletedGoals/OtherGoals/OtherGoals';

class App extends Component {
    state = {
      goals: {
        dailyGoals: [
          {
            id: 1,
            title: 'Programme',
            snippit: 'Write Code',
            startDate: '2019, 8, 1 00:00',
            endDate: '2019, 8, 30 00:00',
            lastDayUpdated: '2019, 8, 12 00:00',
            daysChecked: 20,
            weeklyChecked: [true, false, true, true, true, false, false],
          },
          {
            id: 2,
            title: 'Learn React',
            snippit: 'Write Code',
            startDate: '2019, 8, 1 00:00',
            endDate: '2019, 8, 30 00:00',
            lastDayUpdated: '2019, 8, 6 00:00',
            daysChecked: 12,
            weeklyChecked: [true, true, false, true, false, false, false],
          },
          {
            id: 3,
            title: 'Be Cool',
            snippit: 'Yea',
            startDate: '2019, 6, 6 00:00',
            endDate: '2019, 7, 10 00:00',
            lastDayUpdated: '2019, 7, 14 00:00',
            daysChecked: 12,
            weeklyChecked: [false, true, true, true, false, false, false],
          },
          {
            id: 5454,
            title: 'Be Cools',
            snippit: 'Yea',
            startDate: '2019, 6, 6 00:00',
            endDate: '2019, 7, 17 00:00',
            lastDayUpdated: '2019, 7, 14 00:00',
            daysChecked: 12,
            weeklyChecked: [false, true, true, true, false, false, false],
          },
        ],
        otherGoalsCategories: [
          {
            category: 'Programming',
            id: 4,
            render: true,
            otherGoals: [
              {
                id: 5,
                title: 'Learn React',
                snippit: 'Code a bunch of stuff',
                startDate: '2019, 7, 1 00:00',
                endDate: '2019, 7, 15 00:00',
                percentComplete: 20,
              },
              {
                id: 6,
                title: 'Learn to Code',
                snippit: 'Learn React, C++, SQL, and more C#',
                startDate: '2019, 5, 1 00:00',
                endDate: '2019, 8, 16 00:00',
                percentComplete: 40,
              },
            ],
          },
          {
            category: 'Reading',
            id: 7,
            render: true,
            otherGoals: [
              {
                id: 8,
                title: 'Read a book',
                snippit: 'Read the blade itself',
                startDate: '2019, 7, 8 00:00',
                endDate: '2019, 7, 30 00:00',
                percentComplete: 0,
              },
              {
                id: 9,
                title: 'Read 20 books',
                snippit: "Shouldn't be too hard he thought",
                startDate: '2019, 1, 1 00:00',
                endDate: '2020, 1, 1 00:00',
                percentComplete: 50,
              },
            ],
          },
          {
            category: 'Goal Tracker Project',
            id: 10,
            render: true,
            otherGoals: [
              {
                id: 11,
                title: 'Add Goal Adding',
                snippit: 'Add Form and State Addition',
                startDate: '2019, 7, 9 00:00',
                endDate: '2019, 7, 11 00:00',
                percentComplete: 0,
              },
              {
                id: 12,
                title: 'Add Goal Deletion',
                snippit: 'Add Form and State Deletion',
                startDate: '2019, 7, 9 00:00',
                endDate: '2019, 7, 11 00:00',
                percentComplete: 0,
              },
              {
                id: 13,
                title: 'Fix Small bugs',
                snippit: 'SideNav Stuff',
                startDate: '2019, 7, 9 00:00',
                endDate: '2019, 7, 12 00:00',
                percentComplete: 0,
              },
              {
                id: 14,
                title: 'Add Sorting Box',
                snippit: 'Should be easy after I learn add and delete stuff',
                startDate: '2019, 7, 9 00:00',
                endDate: '2019, 7, 12 00:00',
                percentComplete: 0,
              },
              {
                id: 15,
                title: 'Add Login and backend stuff1',
                snippit: 'This might be the hard part',
                startDate: '2019, 8, 9 00:00',
                endDate: '2019, 8, 19 00:00',
                percentComplete: 0,
              },
              {
                id: 16,
                title: 'Add Login and backend stuff2',
                snippit: 'This might be the hard part',
                startDate: '2019, 8, 9 00:00',
                endDate: '2019, 8, 19 00:00',
                percentComplete: 0,
              },
              {
                id: 17,
                title: 'Add Login and backend stuff3',
                snippit: 'This might be the hard part',
                startDate: '2019, 8, 9 00:00',
                endDate: '2019, 8, 19 00:00',
                percentComplete: 0,
              },

            ],
          },
        ],
        completed: {
          dailyGoals: [

          ],
          otherGoalsCategories: [
            {
              category: 'Programming',
              id: 16,
              otherGoals: [
                {
                  id: 17,
                  title: 'Learn React',
                  snippit: 'Code a bunch of stuff',
                  startDate: '2019, 7, 1 00:00',
                  endDate: '2019, 7, 15 00:00',
                  percentComplete: 20,
                },
              ],
            },
          ],
        },
      },
      otherStuffs: {
        overlayIsHidden: true,
        renderCurrent: true,
        renderCompleted: false,
        renderDaily: true,
        renderOther: true,
      },
    }

    makeCompletedDailyGoal = newGoal => (
      {
        id: newGoal.id,
        title: newGoal.title,
        snippit: newGoal.snippit,
        startDate: newGoal.startDate,
        endDate: newGoal.endDate,
        daysChecked: newGoal.daysChecked,
        percentComplete: ((newGoal.daysChecked / (Math.abs(new Date(newGoal.startDate) - (new Date(newGoal.endDate))) / 8.64e+7) * 100).toString().substr(0, 2)),
      }
    )

    makeCompletedOtherGoal = (newGoal, category) => (
      {
        category: category.category,
        id: category.id,
        otherGoals: [
          newGoal,
        ],
      }
    )

    makeCompletedOtherGoalCategory = (newGoal, category) => (
      {
        category,
        id: uuid.v4(),
        otherGoals: [
          newGoal,
        ],
      }
    )

    makeDailyGoal = newGoal => (
      {
        id: uuid.v4(),
        title: newGoal.title,
        snippit: newGoal.snippit,
        startDate: getToday(),
        endDate: `${newGoal.endDate} 00:00`,
        lastDayUpdated: getToday(),
        daysChecked: 0,
        weeklyChecked: [false, false, false, false, false, false, false],
      }
    )

    makeOtherGoal = newGoal => (
      {
        id: uuid.v4(),
        title: newGoal.title,
        snippit: newGoal.snippit,
        startDate: getToday(),
        endDate: `${newGoal.endDate} 00:00`,
        percentComplete: 0,
      }
    )

    makeOtherGoalCategory = (newGoal, category) => ({
      category,
      id: uuid.v4(),
      render: true,
      otherGoals: [
        newGoal,
      ],
    })

    componentDidMount() {
      const { state } = this;
      let updatedCompletedDailyGoals = state.goals.completed.dailyGoals;
      let updatedCompletedOtherCategories = state.goals.completed.otherGoalsCategories;
      const filteredDailyGoals = state.goals.dailyGoals.filter((goal) => {
        if (Date.parse(goal.endDate) <= Date.parse(getYeseterday())) {
          updatedCompletedDailyGoals = [...updatedCompletedDailyGoals, this.makeCompletedDailyGoal(goal)];
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
      this.setState({

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
              dailyGoals: [...state.goals.completed.dailyGoals, this.makeCompletedDailyGoal(toCompletedGoal)],
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
      return (found ? otherGoalsCategoryCompleted : completed.concat(this.makeCompletedOtherGoalCategory(goal, category)));
    }

    updateRenderIfs = (whichClicked) => {
      const { state, otherStuffs } = this.state;
      let updatedOtherStuffs;
      if (otherStuffs[whichClicked] === false) {
        updatedOtherStuffs = Object.assign({}, otherStuffs, {
          [whichClicked]: true,
        });
      }
      // switch to determine sort goals stuff can probably simplify
      switch (whichClicked) {
        case ('allTypes'):
          updatedOtherStuffs = Object.assign({}, otherStuffs, {
            renderDaily: true,
            renderOther: true,
          });
          break;
        case ('renderCurrent'):
          if (otherStuffs.renderCompleted === true) {
            updatedOtherStuffs = Object.assign({}, otherStuffs, {
              renderCompleted: false,
            });
          }
          break;
        case ('renderCompleted'):
          if (otherStuffs.renderCurrent === true) {
            updatedOtherStuffs = Object.assign({}, otherStuffs, {
              renderCurrent: false,
            });
          }
          break;
        case ('renderDaily'):
          if (otherStuffs.renderOther === true) {
            updatedOtherStuffs = Object.assign({}, otherStuffs, {
              renderOther: false,
            });
          }
          break;
        case ('renderOther'):
          if (otherStuffs.renderDaily === true) {
            updatedOtherStuffs = Object.assign({}, otherStuffs, {
              renderDaily: false,
            });
          }
          break;
        default:
          break;
      }
      this.setState({
        otherStuffs: updatedOtherStuffs,
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
      if (newGoal.type === 'daily') {
        newGoal = this.makeDailyGoal(newGoal);
        goals = Object.assign({}, goals, {
          dailyGoals: [...state.goals.dailyGoals, newGoal],
        });
      } else {
        const { category, newCategory } = newGoal;
        newGoal = this.makeOtherGoal(newGoal);
        if (newCategory === true) {
          newGoal = this.makeOtherGoalCategory(newGoal, category);
          state.goals.otherGoalsCategories = [...state.goals.otherGoalsCategories, newGoal];
        } else {
          goals.otherGoalsCategories = goals.otherGoalsCategories.map((goal) => {
            if (goal.category === category) {
              return Object.assign({}, goal, {
                otherGoals: [...goal.otherGoals, newGoal],
              });
            }
            return goal;
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
        <div>
          <div className="sidenav">
            <div className="user">
              <img src="Images/profile.png" alt="" />
              <a href="http://localhost:3000">Guest</a>
            </div>
            <div className="navlinks">
              <a href="http://localhost:3000">Dashboard</a>
              <a href="http://localhost:3000">Goals</a>
              <a href="http://localhost:3000">Tasks</a>
              <a href="http://localhost:3000">Portfolio Home</a>
            </div>
          </div>
          <div className="topnav">
            <div className="navdropdown" onClick={this.navSlideChange}>
              <div className="line1" />
              <div className="line2" />
              <div className="line3" />
            </div>
            <h1>Current Goals</h1>
            <div className="creategoalbutton">
              <button id="button" onClick={this.displayGoalOverlay}>Create Goal</button>
            </div>
          </div>
          <div className="main">
            {/* Side selector for what to render */}
            <TypeSelector goals={state.goals} updateRenderIfs={this.updateRenderIfs} updateCategoryRender={this.updateCategoryRender} />
            <div className="goals">
              {/* Daily Goals */}
              {state.otherStuffs.renderDaily && state.goals.dailyGoals.length !== 0 && state.otherStuffs.renderCurrent
                    && <DailyGoalHeading updateCheckMark={this.updateCheckMark} dailyGoals={state.goals.dailyGoals} deleteGoal={this.deleteGoal} />}
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
        </div>
      );
    }
}

export default App;
