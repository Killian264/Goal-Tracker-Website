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
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UserController : ApiController
    {
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [BasicAuthenticationAttribute]
        [Route("api/User/login")]
        public HttpResponseMessage Get()
        {
            try
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
                    //return newSession.sessionID;

                    var message = Request.CreateResponse(HttpStatusCode.Created, newSession.sessionID);
                    //message.Headers.Location = new Uri(Request.RequestUri + user.Email.ToString());
                    return message;
                }
            }
            catch(Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [Route("api/User/register")]
        public HttpResponseMessage Post([FromBody] user user)
        {
            try
            {
                // ADD THIS LATER
                user.Salt = "add later";
                user.Image = null;
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
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [Route("api/User/testingAccount")]
        public HttpResponseMessage Post()
        {
            var user = new user
            {
                Username = "Test Account",
                Email = Guid.NewGuid().ToString() + "@test.com",
                Password = Guid.NewGuid().ToString(),
                Salt = "add later",
                Image = null,
            };
            var newSession = new session
            {
                issued = DateTime.Now.Add(TimeSpan.FromDays(7)),
                sessionID = Guid.NewGuid().ToString(),
                userEmail = user.Email
            };
            var initialCategory = new otherCategory
            {
                category = "Account Info",
                id = Guid.NewGuid().ToString(),
                user = user,
                userEmail = user.Email
            };
            var initialGoal = new otherGoal
            {
                title = "Account will be deleted in 7 days",
                snippit = "Or on logout",
                id = Guid.NewGuid().ToString(),
                isCompleted = false,
                categoryID = initialCategory.id,
                otherCategory = initialCategory,
                endDate = DateTime.Now.AddDays(7),
                startDate = DateTime.Now,
            };
            initialCategory.otherGoals.Add(initialGoal);
            user.otherCategories.Add(initialCategory);
            try
            {
                using (UsersEntities entities = new UsersEntities())
                {
                    entities.users.Add(user);
                    entities.sessions.Add(newSession);
                    entities.SaveChanges();
                    var message = Request.CreateResponse(HttpStatusCode.Created, newSession.sessionID);
                    return message;
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}
