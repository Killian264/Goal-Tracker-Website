using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GoalTrackerAPI.Models
{
    public class DailyGoal
    {
        public string id { get; set; }
        public string title { get; set; }
        public string snippit { get; set; }
        public string startDate { get; set; }
        public string endDate { get; set; }
        public string lastDayUpdated { get; set; }
        public int daysChecked { get; set; }
        public bool[] weeklyChecked { get; set; }
    }
}