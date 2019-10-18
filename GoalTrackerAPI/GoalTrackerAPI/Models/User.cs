using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GoalTrackerAPI.Models
{
    public class User
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime Lastlogin { get; set; }
        //public Goals goals { get; set; }
        public int OtherDB { get; set; }
    }
}