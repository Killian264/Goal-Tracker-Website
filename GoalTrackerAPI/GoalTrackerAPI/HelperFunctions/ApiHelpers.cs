using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using UserDataAccess;

namespace GoalTrackerAPI.HelperFunctions
{
    public class ApiHelpers
    {
        public static user getUser(string codedAuthToken)
        {
            string authToken = Encoding.UTF8.GetString(Convert.FromBase64String(codedAuthToken));
            using (UsersEntities entities = new UsersEntities())
            {
                var userSession = entities.sessions.FirstOrDefault(session => (session.sessionID.Equals(authToken)));
                var theUser = entities.users.First(user => (user.Email.Equals(userSession.userEmail)));
                return theUser;
            }
        }
    }
}