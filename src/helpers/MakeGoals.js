import uuid from "uuid";
import { getToday } from "./commonCommands";

export const makeGoal = {
  makeCompletedDailyGoal,
  makeCompletedOtherGoal,
  makeCompletedOtherGoalCategory,
  makeDailyGoal,
  makeOtherGoal,
  makeOtherGoalCategory,
}

function makeCompletedDailyGoal(newGoal) {
  return {
    id: newGoal.id,
    title: newGoal.title,
    snippit: newGoal.snippit,
    startDate: newGoal.startDate,
    endDate: newGoal.endDate,
    daysChecked: newGoal.daysChecked,
    percentComplete: (
      (newGoal.daysChecked /
        (Math.abs(new Date(newGoal.startDate) - new Date(newGoal.endDate)) /
          8.64e7)) *
      100
    )
      .toString()
      .substr(0, 2)
  };
}

function makeCompletedOtherGoal(newGoal, category) {
  return {
    category: category.category,
    id: category.id,
    otherGoals: [newGoal]
  };
}

function makeCompletedOtherGoalCategory(newGoal, category) {
  return {
    category,
    id: uuid.v4(),
    otherGoals: [newGoal]
  };
}

function makeDailyGoal(newGoal) {
  return {
    id: uuid.v4(),
    title: newGoal.title,
    snippit: newGoal.snippit,
    startDate: getToday(),
    endDate: newGoal.endDate,
    lastDayUpdated: getToday(),
    daysChecked: 0,
    weeklyChecked: [false, false, false, false, false, false, false]
  };
}

function makeOtherGoal(newGoal) {
  return {
    id: uuid.v4(),
    title: newGoal.title,
    snippit: newGoal.snippit,
    startDate: getToday(),
    endDate: newGoal.endDate,
    isCompleted: false
  };
}

function makeOtherGoalCategory(newGoal, category) {
  return {
    category,
    id: uuid.v4(),
    render: true,
    unCompleted: 1,
    otherGoals: [newGoal]
  };
}
