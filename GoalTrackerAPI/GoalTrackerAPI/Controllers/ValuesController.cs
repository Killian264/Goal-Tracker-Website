using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using GoalTrackerAPI.Models;
using Newtonsoft.Json;
using System.IO;
using System.Web.Http.Cors;
using System.Reflection;
using UserDataAccess;
using System.Text;

namespace GoalTrackerAPI.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class ValuesController : ApiController
    {
        AllGoals goals = new AllGoals();
        public AllGoals GoalController()
        {
            string json = File.ReadAllText(@"C:\Users\Killian\Desktop\Projects\Goal-Tracker with Login\goal-tracker\GoalTrackerAPI\GoalTrackerAPI\Goals.json");
            var goals = JsonConvert.DeserializeObject<AllGoals>(json);
            return goals;
        }
        [TokenAuthenticationAttribute]
        public string Get()
        {
            string authToken = Encoding.UTF8.GetString(Convert.FromBase64String(Request.Headers.Authorization.Parameter));
            using (UsersEntities entities = new UsersEntities())
            {
                var userSession = entities.sessions.FirstOrDefault(session => (session.sessionID.Equals(authToken)));
                var test = entities.users.First(user => (user.Email.Equals(userSession.userEmail))).goals;
                return entities.users.First(user => (user.Email.Equals(userSession.userEmail))).goals;
            }
        }
        // POST api/values
        public void Post(DailyGoal test)
        {
            goals.goals.dailyGoals.Add(test);
        }

        // PUT api/values
        public void Put(DailyGoal test)
        {
            goals.goals.dailyGoals.Add(test);
        }
        public void Put(OtherGoalsCategory test)
        {
            goals.goals.otherGoalsCategories.Add(test);
        }
        [Route("api/values/putdailygoal")]
        [HttpPut]
        public void updateDailyGoal(object test)
        {
            //if (!IsAnyNullOrEmpty(test))
            //{
            //    string json = File.ReadAllText(@"C:\Users\Killian\Desktop\Projects\GoalTrackerAPI\GoalTrackerAPI\Goals.json");
            //    var goals = JsonConvert.DeserializeObject<AllGoals>(json);
            //    goals.goals.dailyGoals.Add(test);
            //}
            //else
            //{
            //    throw new HttpResponseException(HttpStatusCode.BadRequest);
            //}
        }
        // PUT api/values
        //public void Put(int id)
        //{
        //    Console.Write("asjfasdf");
        //}
        //// PUT api/values
        //public void Put(string id)
        //{
        //    Console.Write("asjfasdf");
        //}

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
