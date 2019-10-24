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
using System.Runtime.InteropServices;
using Newtonsoft.Json;
using System.Web;
using GoalTrackerAPI.HelperFunctions;

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
        [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
        public string Get()
        {
            try
            {
                string authToken = Encoding.UTF8.GetString(Convert.FromBase64String(Request.Headers.Authorization.Parameter));
                using (UsersEntities entities = new UsersEntities())
                {
                    var userSession = entities.sessions.FirstOrDefault(session => (session.sessionID.Equals(authToken)));
                    var email = entities.users.First(user => (user.Email.Equals(userSession.userEmail)));
                    var theUser = entities.users.First(user => (user.Email.Equals(userSession.userEmail)));
                    AllGoals goals = new AllGoals();
                    //ReturnGoals goals = new ReturnGoals();
                    goals.goals.daily = theUser.dailies.ToArray();
                    //goals.daily = theUser.dailies.ToArray();
                    goals.goals.otherGoalsCategory = theUser.otherCategories.ToArray();
                    goals.goals.completed.completedDaily = theUser.completedDailies.ToArray();
                    // NullToEmptyStringResolver from HelperFunctions ObjectConversionSettings
                    var settings = new JsonSerializerSettings() { ContractResolver = new NullToEmptyStringResolver() };
                    string output = JsonConvert.SerializeObject(goals, settings);
                    //var dailies = theUser.dailies.Where(daily => (daily.isCompleted));
                    //var dailiesCompleted = theUser.dailies.Where(daily => !(daily.isCompleted));
                    //var otherGoalsUnsorted = theUser.other;
                    return output;
                    //return File.ReadAllText(@"C:\Users\Killian\Desktop\Projects\Goal-Tracker with Login\goal-tracker\GoalTrackerAPI\GoalTrackerAPI\Goals.json");
                }
            }
            catch(Exception ex)
            {
                //return ex.ToString();
                return "yee";
            }
        }
        // POST api/values
        [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
        [TokenAuthenticationAttribute]
        [Route("api/values/daily")]
        public void Post(daily newDaily)
        {
            string authToken = Encoding.UTF8.GetString(Convert.FromBase64String(Request.Headers.Authorization.Parameter));
            using (UsersEntities entities = new UsersEntities())
            {
                var userSession = entities.sessions.FirstOrDefault(session => (session.sessionID.Equals(authToken)));
                var email = entities.users.First(user => (user.Email.Equals(userSession.userEmail)));
                newDaily.trueFalseArr = 8;
                newDaily.userEmail = email.Email;
                newDaily.user = email;
                var user2 = entities.users.First(user => (user.Email.Equals(userSession.userEmail)));
                user2.dailies.Add(newDaily);
                entities.SaveChanges();
            }
        }
        [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
        [TokenAuthenticationAttribute]
        [Route("api/values/otherCategory")]
        public void Post(otherCategory newOtherCategory)
        {
            string authToken = Encoding.UTF8.GetString(Convert.FromBase64String(Request.Headers.Authorization.Parameter));
            using (UsersEntities entities = new UsersEntities())
            {
                var userSession = entities.sessions.FirstOrDefault(session => (session.sessionID.Equals(authToken)));
                var email = entities.users.First(user => (user.Email.Equals(userSession.userEmail)));
                newOtherCategory.userEmail = email.Email;
                newOtherCategory.user = email;
                var test = newOtherCategory.otherGoals;
                var testing = newOtherCategory.otherGoals.ToArray();
                newOtherCategory.otherGoals.Remove(testing[0]);
                testing[0].categoryID = newOtherCategory.id;
                newOtherCategory.otherGoals.Add(testing[0]);
                var user2 = entities.users.First(user => (user.Email.Equals(userSession.userEmail)));
                user2.otherCategories.Add(newOtherCategory);
                entities.SaveChanges();
            }
        }
        //[EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
        //[TokenAuthenticationAttribute]
        //[Route("api/values/otherCategory")]
        //public void Get()
        //{

        //}
            // PUT api/values
            //public void Put(DailyGoal test)
            //{
            //    goals.goals.dailyGoals.Add(test);
            //}
            //public void Put(OtherGoalsCategory test)
            //{
            //    goals.goals.otherGoalsCategories.Add(test);
            //}
            //[Route("api/values/putdailygoal")]
            //[HttpPut]
            //public void updateDailyGoal(object test)
            //{
            //    //if (!IsAnyNullOrEmpty(test))
            //    //{
            //    //    string json = File.ReadAllText(@"C:\Users\Killian\Desktop\Projects\GoalTrackerAPI\GoalTrackerAPI\Goals.json");
            //    //    var goals = JsonConvert.DeserializeObject<AllGoals>(json);
            //    //    goals.goals.dailyGoals.Add(test);
            //    //}
            //    //else
            //    //{
            //    //    throw new HttpResponseException(HttpStatusCode.BadRequest);
            //    //}
            //}
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
