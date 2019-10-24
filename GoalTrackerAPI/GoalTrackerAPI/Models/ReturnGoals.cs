using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UserDataAccess;

namespace GoalTrackerAPI.Models
{
    public class ReturnGoals
    {
        public daily[] daily { get; set; }
        public otherCategory[] otherGoalsCategory {get; set;}
        public Completed completed { get; set; }
    }
}