using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GoalTrackerAPI.Models
{
    public class OtherGoalCategoryCompleted
    {
        public string category { get; set; }
        public string id { get; set; }
        public List<OtherGoalCompleted> otherGoals { get; set; }
    }
}