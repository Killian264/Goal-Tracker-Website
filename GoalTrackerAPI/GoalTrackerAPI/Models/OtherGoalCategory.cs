using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GoalTrackerAPI.Models
{
    public class OtherGoalsCategory
    {
        public string category { get; set; }
        public string id { get; set; }
        public bool render { get; set; }
        public List<OtherGoal> otherGoals { get; set; }
    }
}