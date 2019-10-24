using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UserDataAccess;

namespace GoalTrackerAPI.Models
{
    public class Completed
    {
        public completedDaily[] completedDaily { get; set; }
    }
}