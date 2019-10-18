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

namespace GoalTrackerAPI.Controllers
{
    public class UserController : ApiController
    {
        [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
        [BasicAuthenticationAttribute]
        [Route("api/User/login")]
        public string Post()
        {
            return Guid.NewGuid().ToString();
        }
        [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
        [Route("api/User/register")]
        public HttpResponseMessage Post([FromBody] userModel user)
        {
            try
            {
                user.Lastlogin = DateTime.Now;
                user.OtherDB = 1;
                using (UsersEntities entities = new UsersEntities())
                {
                    //users.users.Add(user);
                    //users.SaveChanges();
                    entities.userModels.Add(user);
                    //entities.users.Add(user);
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
