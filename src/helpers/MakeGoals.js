import uuid from "uuid";
import { getToday } from "./commonCommands";

export const makeGoal = {
  makeCompletedDailyGoal,
  makeCompletedOtherGoal,
  makeCompletedOtherGoalCategory,
  makeDailyGoal,
  makeOtherGoal,
  makeOtherGoalCategory,
  makeStaticGoals,
}

function makeStaticGoals(){
	let state = {
		goals: {
			dailyGoals: [
				{
					"id": "0041c8a2-5e74-44a0-91d9-3557ccb2dec8",
					"title": "Site Redesign and Fixes",
					"snippit": "See Categories",
					"startDate": "2020/8/4",
					"endDate": "2020/8/31",
					"lastDayUpdated": "2020/8/8",
					"daysChecked": 0,
					"weeklyChecked": [ false, true, true, true, false, false, false ]
				},
				// {
				// 	"id": "0041c8a2-7e74-44a0-91d9-3557ccb2dec8",
				// 	"title": "Site Redesign and Fixes",
				// 	"snippit": "See Categories",
				// 	"startDate": "2020/7/28",
				// 	"endDate": "2020/8/31",
				// 	"lastDayUpdated": "2019/8/26",
				// 	"daysChecked": 0,
				// 	"weeklyChecked": [ false, false, false, false, false, false, false ]
				// }
			],
			otherGoalsCategories: [
				{
					"category": "Front-End",
					"id": "dca48b83-f503-4a58-afce-07925deb6e97",
					"render": true,
					"otherGoals": [
						{
							"id": "67cdc340-7729-4660-a90a-b4a23c24a08a",
							"title": "Static Site!",
							"snippit": "Static version of website",
							"startDate": "2020/8/1",
							"endDate": "2020/8/4",
							"isCompleted": false
						},
						{
							"id": "67cdc340-7b49-4660-a90a-b4a23c24a08a",
							"title": "Bootstrap 4!",
							"snippit": "Visual tweaks and updates",
							"startDate": "2020/7/25",
							"endDate": "2020/8/8",
							"isCompleted": false
						},
						{
							"id": "67cdc340-7b49-4660-a90a-b4a23c2348a",
							"title": "Hooks!",
							"snippit": "Look into changes",
							"startDate": "2020/8/3",
							"endDate": "2020/8/15",
							"isCompleted": false
						},
					]
				},
				{
					"category": "New API",
					"id": "dca48b83-f503-4a58-afce-07998deb6e97",
					"render": true,
					"otherGoals": [
						{
							"id": "67cdc340-7b49-4660-a90a-b4a23c2430b",
							"title": "Django API!",
							"snippit": "Begin Research",
							"startDate": "2020/8/3",
							"endDate": "2020/8/17",
							"isCompleted": false
						},
					]
				},
				{
					"category": "Summer Courses",
					"id": "dca9375-f503-4a58-afce-07998deb6e97",
					"render": true,
					"otherGoals": [
						{
							"id": "67cjy340-7b49-4660-a90a-b4a23c2430b",
							"title": "Software Security",
							"snippit": "Finish the class",
							"startDate": "2020/5/17",
							"endDate": "2020/8/7",
							"isCompleted": false
						},
						{
							"id": "67cjy340-7b49-4660-a90a-b4auyk2430b",
							"title": "Discrete Mathmatics",
							"snippit": "Finish the class",
							"startDate": "2020/5/17",
							"endDate": "2020/8/7",
							"isCompleted": false
						},
					]
				},
				// {
				// 	"category": "Super category that is very long",
				// 	"id": "dca48b83-f503-4a58-afce-079534deb6e97",
				// 	"render": true,
				// 	"otherGoals": [
				// 		{
				// 			"id": "67cdc340-7b49-44560-a90a-b4a23c2430b",
				// 			"title": "Super long name for the goal!",
				// 			"snippit": "Super long snippet that is actually pretty long",
				// 			"startDate": "2020/8/3",
				// 			"endDate": "2020/8/17",
				// 			"isCompleted": false
				// 		},
				// 	]
				// },
			],
			completed: {
				dailyGoals: [],
				otherGoalsCategories: [],
			},
		},
	};
	return state;
}

function makeCompletedDailyGoal(newGoal) {
  return {
    id: newGoal.id,
    title: newGoal.title,
    snippit: newGoal.snippit,
    startDate: newGoal.startDate.split("T")[0],
    endDate: newGoal.endDate.split("T")[0],
    daysChecked: newGoal.daysChecked,
    percentComplete: (
      (newGoal.daysChecked /
        ((Math.abs(new Date(newGoal.startDate) - new Date(newGoal.endDate)) + 1) /8.64e7)) *100)
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
