import uuid from 'uuid';
import { getToday } from './commonCommands';

export function makeCompletedDailyGoal(newGoal) {
  return ({
    id: newGoal.id,
    title: newGoal.title,
    snippit: newGoal.snippit,
    startDate: newGoal.startDate,
    endDate: newGoal.endDate,
    daysChecked: newGoal.daysChecked,
    percentComplete: ((newGoal.daysChecked / (Math.abs(new Date(newGoal.startDate) - (new Date(newGoal.endDate))) / 8.64e+7) * 100).toString().substr(0, 2)),
  });
}

export function makeCompletedOtherGoal(newGoal, category) {
  return ({
    category: category.category,
    id: category.id,
    otherGoals: [
      newGoal,
    ],
  });
}

export function makeCompletedOtherGoalCategory(newGoal, category) {
  return ({
    category,
    id: uuid.v4(),
    otherGoals: [
      newGoal,
    ],
  });
}

export function makeDailyGoal(newGoal) {
  return ({
    id: uuid.v4(),
    title: newGoal.title,
    snippit: newGoal.snippit,
    startDate: getToday(),
    endDate: `${newGoal.endDate} 00:00`,
    lastDayUpdated: getToday(),
    daysChecked: 0,
    weeklyChecked: [false, false, false, false, false, false, false],
  });
}

export function makeOtherGoal(newGoal) {
  return ({
    id: uuid.v4(),
    title: newGoal.title,
    snippit: newGoal.snippit,
    startDate: getToday(),
    endDate: `${newGoal.endDate} 00:00`,
    percentComplete: 0,
  }
  );
}

export function makeOtherGoalCategory(newGoal, category) {
  return ({
    category,
    id: uuid.v4(),
    render: true,
    otherGoals: [
      newGoal,
    ],
  });
}
