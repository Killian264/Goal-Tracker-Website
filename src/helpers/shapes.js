import PropTypes from "prop-types";

// export at bottom

let otherGoalShape = PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    snippit: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    isCompleted: PropTypes.bool,
})

let dailyGoalShape = PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    snippit: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    lastDayUpdated: PropTypes.string,
    daysChecked: PropTypes.number,
    weeklyChecked: PropTypes.arrayOf(PropTypes.bool),
})

let completedDailyGoalShape = PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    snippit: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    daysChecked: PropTypes.string,
    percentComplete: PropTypes.number,
})

let completedShape = PropTypes.shape({
    dailyGoals: PropTypes.arrayOf(completedDailyGoalShape),
})

let otherGoalsCategoryShape = PropTypes.shape({
    category: PropTypes.string,
    id: PropTypes.string,
    render: PropTypes.bool,
    unCompleted: PropTypes.number,
    otherGoals: PropTypes.arrayOf(otherGoalShape),
})

let goalShape = PropTypes.shape({
    dailyGoals: PropTypes.arrayOf(dailyGoalShape),
    otherGoalsCategories: PropTypes.arrayOf(otherGoalsCategoryShape),
    completed: completedShape,
})

let stateShape = PropTypes.shape({
    goals: PropTypes.objectOf(goalShape),
})

export const shapes = {
    stateShape,
    goalShape,
    completedShape,
    completedDailyGoalShape,
    otherGoalsCategoryShape,
    otherGoalShape,
    dailyGoalShape,
  }