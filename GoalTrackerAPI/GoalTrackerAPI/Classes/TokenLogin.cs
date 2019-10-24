using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UserDataAccess;

namespace GoalTrackerAPI.Classes
{
    public class TokenLogin
    {
        private static bool dateTimeComparison(DateTime issued)
        {
            return issued < DateTime.Now.Subtract(TimeSpan.FromHours(24)) && issued > DateTime.Now.Add(TimeSpan.FromHours(24));
        }
        public static bool Login(string token)
        {
            using (UsersEntities entities = new UsersEntities())
            {
                var session = entities.sessions.Find(token);
                if(session == null)
                {
                    return false;
                }
                else if (dateTimeComparison(session.issued))
                {
                    return false;
                }
                else
                {
                    return true;
                }

                //return entities.sessions.Any(session => session.sessionID.Equals(token) &&  session.issued.CompareTo(DateTime.Now.Subtract(TimeSpan.FromHours(24)));
            }
        }
    }
}