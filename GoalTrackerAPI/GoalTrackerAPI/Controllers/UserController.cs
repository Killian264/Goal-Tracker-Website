using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using GoalTrackerAPI;
using System;
using UserDataAccess;
using GoalTrackerAPI.Models;
using System.Web.Http.Cors;
using System.Net.Http;
using System.Text;
using System.IO;

namespace GoalTrackerAPI.Controllers
{
    public class UserController : ApiController
    {
        [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
        [BasicAuthenticationAttribute]
        [Route("api/User/login")]
        public string Post()
        {
            using (UsersEntities entities = new UsersEntities())
            {
                string[] emailPassword = Encoding.UTF8.GetString(Convert.FromBase64String(Request.Headers.Authorization.Parameter)).Split(':');
                string email = emailPassword[0];
                if (entities.sessions.Any(session => (session.userEmail.Equals(email, StringComparison.OrdinalIgnoreCase))))
                {
                    entities.sessions.Remove(entities.sessions.FirstOrDefault(session => (session.userEmail.Equals(email, StringComparison.OrdinalIgnoreCase))));
                }
                var newSession = new session
                {
                    issued = DateTime.Now,
                    sessionID = Guid.NewGuid().ToString(),
                    userEmail = email
                };
                entities.sessions.Add(newSession);
                entities.SaveChanges();
                return newSession.sessionID;
            }
        }
        [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
        [Route("api/User/register")]
        public HttpResponseMessage Post([FromBody] user user)
        {
            try
            {
                // ADD THIS LATER
                user.Username = "Test Account";
                using (UsersEntities entities = new UsersEntities())
                {
                    entities.users.Add(user);
                    entities.SaveChanges();
                    var message = Request.CreateResponse(HttpStatusCode.Created, user);
                    message.Headers.Location = new Uri(Request.RequestUri + user.Email.ToString());
                    return message;
                }
            }
            catch(Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}
