using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GoalTrackerAPI.Models
{
    public class Goals
    {
        public List<DailyGoal> dailyGoals { get; set; }
        public List<OtherGoalsCategory> otherGoalsCategories { get; set; }
        public Completed completed { get; set; }
    }
}