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
        //AllGoals goals = new AllGoals();
        //public AllGoals GoalController()
        //{
        //    string json = File.ReadAllText(@"C:\Users\Killian\Desktop\Projects\Goal-Tracker with Login\goal-tracker\GoalTrackerAPI\GoalTrackerAPI\Goals.json");
        //    var goals = JsonConvert.DeserializeObject<AllGoals>(json);
        //    return goals;
        //}
        [TokenAuthenticationAttribute]
        [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
        public string Get()
        {
            try
            {
                using (UsersEntities entities = new UsersEntities())
                {
                    var theUser = entities.users.First(user => (user.Email.Equals(entities.sessions.FirstOrDefault
                            (session => (session.sessionID.Equals(Encoding.UTF8.GetString(Convert.FromBase64String(Request.Headers.Authorization.Parameter))))))));
                    AllGoals goals = new AllGoals
                    {
                        goals = new ReturnGoals
                        {
                            dailyGoals = theUser.dailyGoals.ToArray(),
                            otherGoalsCategories = theUser.otherCategories.ToArray(),
                            completed = new Completed
                            {
                                completedDaily = theUser.completedDailies.ToArray()
                            }
                        }
                    };
                    foreach (var dailyGoal in theUser.dailyGoals.ToArray())
                    {
                        dailyGoal.weeklyChecked = TrueFalseArr.intToArr[dailyGoal.trueFalseArr];
                    }
                    //var settings = new JsonSerializerSettings() { ContractResolver = new NullToEmptyStringResolver(), ReferenceLoopHandling = ReferenceLoopHandling.Ignore };
                    string output = JsonConvert.SerializeObject(goals.goals);
                    return output;
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
        public void Post(dailyGoal newDaily)
        {
            try
            {
                using (UsersEntities entities = new UsersEntities())
                {
                    var theUser = entities.users.First(user => (user.Email.Equals(entities.sessions.FirstOrDefault
                            (session => (session.sessionID.Equals(Encoding.UTF8.GetString(Convert.FromBase64String(Request.Headers.Authorization.Parameter))))).userEmail)));
                    newDaily.trueFalseArr = 8;
                    newDaily.userEmail = theUser.Email;
                    newDaily.user = theUser;
                    theUser.dailyGoals.Add(newDaily);
                    entities.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                // probably gotta add something here
            }
        }
        [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
        [TokenAuthenticationAttribute]
        [Route("api/values/otherCategory")]
        public void Post(otherCategory newOtherCategory)
        {
            try
            {
                using (UsersEntities entities = new UsersEntities())
                {
                    var theUser = entities.users.First(user => (user.Email.Equals(entities.sessions.FirstOrDefault
                        (session => (session.sessionID.Equals(Encoding.UTF8.GetString(Convert.FromBase64String(Request.Headers.Authorization.Parameter))))).userEmail)));
                    newOtherCategory.userEmail = theUser.Email;
                    newOtherCategory.user = theUser;
                    newOtherCategory.otherGoals.First().categoryID = newOtherCategory.id;
                    theUser.otherCategories.Add(newOtherCategory);
                    entities.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                // probably gotta add something here
            }
        }
        [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
        [TokenAuthenticationAttribute]
        [Route("api/values/otherGoal")]
        public void Post(otherGoal newOtherGoal)
        {
            try
            {
                using (UsersEntities entities = new UsersEntities())
                {
                    var theUser = entities.users.First(user => (user.Email.Equals(entities.sessions.FirstOrDefault
                        (session => (session.sessionID.Equals(Encoding.UTF8.GetString(Convert.FromBase64String(Request.Headers.Authorization.Parameter))))).userEmail)));
                    var theCategory = theUser.otherCategories.First(category => (category.id.Equals(newOtherGoal.categoryID)));
                    //newOtherGoal.otherCategory = theCategory;
                    theCategory.otherGoals.Add(newOtherGoal);
                    entities.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                // probably gotta add something here
            }
        }
        [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
        [TokenAuthenticationAttribute]
        [Route("api/values/otherCategory")]
        public void Delete(int id)
        {
        }
    }
}
