using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GoalTrackerAPI.Models
{
    public class Completed
    {
        public List<DailyGoalCompleted> dailyGoals { get; set; }
        public List<OtherGoalCategoryCompleted> otherGoalsCategories { get; set; }
    }
}