import {goalService} from '../../services/goal.service';
import {makeGoal} from "../../helpers/MakeGoals";
import update from "immutability-helper";
import { getToday, getYeseterday } from "../../helpers/commonCommands";

export function updateStateForMount(state) {
    if (state.goals === undefined) {
        return state;
    }
    if (state.goals.dailyGoals.length !== 0) {
        state = updateDailyGoals(state);
    }
    if (state.goals.otherGoalsCategories !== undefined) {
        state = updateOtherGoalsCategories(state);
    }
    return state;
}

function updateDailyGoals(state){
    let updatedCompletedDailyGoals = state.goals.completed.dailyGoals;

    // update goals that need to be updated and moved to completed
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

    // update uncompleded goals' daily info
    const updatedDailyGoals = filteredDailyGoals.map(goal => {
        if (Date.parse(goal.lastDayUpdated) < Date.parse(getToday())) {
            const numDays =
                ((Date.parse(goal.lastDayUpdated) -
                    Date.parse(getToday())) /
                    8.64e7) *
                -1;
            return updateLastUpdated(goal, numDays);
        }
        return goal;
    });

    state.goals.dailyGoals = updatedDailyGoals;
    // update this when JS is updated with undefined ? thingy
    if (updatedCompletedDailyGoals === undefined) {
        state.goals.completed.dailyGoals = [];
    } else {
        state.goals.completed.dailyGoals = updatedCompletedDailyGoals;
    }
    return state;
}

function updateOtherGoalsCategories(state){
    let count = 0;
    let updatedOtherGoalsCategories = state.goals.otherGoalsCategories.map(categories => {
            count = 0;
            const updatedOtherGoals = categories.otherGoals.map(goal => {
                    if (!goal.isCompleted) {
                        if (Date.parse(goal.endDate) <= Date.parse(getYeseterday())) {
                            // this function pushes info to server
                            goalService.updateGoal(goal.id, categories.id,null);

                            goal = update(goal, {
                                isCompleted: { $set: true }
                            });

                        } else {
                            count++;
                        }
                    }
                    return goal;
            });

            return Object.assign({}, categories, {
                otherGoals: updatedOtherGoals,
                unCompleted: count,
                render: true,
            });
        });

    updatedOtherGoalsCategories = updatedOtherGoalsCategories.filter(
        categories => categories !== null
    );
    state.goals.otherGoalsCategories = updatedOtherGoalsCategories;

    return state
}

// this updates daily gaol checked infomation
function updateLastUpdated(goal, numDays) {
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