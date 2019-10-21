using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UserDataAccess;

namespace GoalTrackerAPI.Classes
{
    public class UserLogin
    {
        public static bool Login(string username, string password)
        {
            using (UsersEntities users = new UsersEntities())
            {
                return users.users.Any(user => user.Email.Equals(username, StringComparison.OrdinalIgnoreCase) && user.Password == password);
            }
        }
    }
}