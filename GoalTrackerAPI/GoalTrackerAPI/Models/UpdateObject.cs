using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GoalTrackerAPI.Models
{
    public class UpdateObject
    {
        public string id { get; set; }
        public string categoryID { get; set; }
        public bool[] weeklyChecked { get; set; }
        public object weeklyChecked2 { get; set; }
    }
}