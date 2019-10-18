using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GoalTrackerAPI.Models
{
    public class OtherGoalCompleted
    {
        public string id { get; set; }
        public string title { get; set; }
        public string snippit { get; set; }
        public string startDate { get; set; }
        public string endDate { get; set; }
        public int percentComplete { get; set; }
    }
}