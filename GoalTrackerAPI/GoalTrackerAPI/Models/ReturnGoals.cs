using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UserDataAccess;

namespace GoalTrackerAPI.Models
{
    public class ReturnGoals
    {
        public dailyGoal[] dailyGoals { get; set; }
        public otherCategory[] otherGoalsCategories { get; set;}
        public Completed completed { get; set; }
    }
}