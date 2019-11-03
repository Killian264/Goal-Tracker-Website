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
        [Route("api/values")]
        public HttpResponseMessage Get()
        {
            try
            {
                using (UsersEntities entities = new UsersEntities())
                {
                    string authToken = Encoding.UTF8.GetString(Convert.FromBase64String(Request.Headers.Authorization.Parameter));
                    var userSession = entities.sessions.FirstOrDefault(session => (session.sessionID.Equals(authToken)));
                    var theUser = entities.users.First(user => (user.Email.Equals(userSession.userEmail)));
                    AllGoals goals = new AllGoals
                    {
                        goals = new ReturnGoals
                        {
                            dailyGoals = theUser.dailyGoals.ToArray(),
                            otherGoalsCategories = theUser.otherCategories.ToArray(),
                            completed = new Completed
                            {
                                dailyGoals = theUser.completedDailies.ToArray()
                            }
                        }
                    };
                    foreach (var dailyGoal in theUser.dailyGoals.ToArray())
                    {
                        dailyGoal.weeklyChecked = TrueFalseArr.intToArr[dailyGoal.trueFalseArr];
                        //var test = TrueFalseArr.arrToInt[new bool[] { dailyGoal.weeklyChecked [0], dailyGoal.weeklyChecked[1], dailyGoal.weeklyChecked[2], dailyGoal.weeklyChecked[3], dailyGoal.weeklyChecked[4], dailyGoal.weeklyChecked[5], dailyGoal.weeklyChecked[6]}];

                    }
                    //var settings = new JsonSerializerSettings() { ContractResolver = new NullToEmptyStringResolver(), ReferenceLoopHandling = ReferenceLoopHandling.Ignore };
                    string output = JsonConvert.SerializeObject(goals.goals);

                    var message = Request.CreateResponse(HttpStatusCode.OK, output);
                    return message;
                }
            }
            catch(Exception ex)
            {
                //return ex.ToString();
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
        // POST api/values
        [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
        [TokenAuthenticationAttribute]
        [Route("api/values/daily")]
        public HttpResponseMessage Post(dailyGoal newDaily)
        {
            try
            {
                using (UsersEntities entities = new UsersEntities())
                {
                    string authToken = Encoding.UTF8.GetString(Convert.FromBase64String(Request.Headers.Authorization.Parameter));
                    var userSession = entities.sessions.FirstOrDefault(session => (session.sessionID.Equals(authToken)));
                    var theUser = entities.users.First(user => (user.Email.Equals(userSession.userEmail)));
                    if (theUser.dailyGoals.Any(goal => (goal.id.Equals(newDaily.id))))
                    {
                        var percentComplete = Math.Truncate(Convert.ToDouble(newDaily.daysChecked) / (newDaily.endDate - newDaily.startDate).TotalDays);
                        completedDaily newCompletedDaily = new completedDaily
                        {
                            id = newDaily.id,
                            title = newDaily.title,
                            snippit = newDaily.snippit,
                            startDate = newDaily.startDate,
                            endDate = newDaily.endDate,
                            daysChecked = newDaily.daysChecked,
                            percentComplete = Convert.ToInt32(percentComplete),
                        };
                        var dailyGoalEntity = entities.Set<dailyGoal>();
                        var toDelete = theUser.dailyGoals.First(goal => (goal.id.Equals(newDaily.id)));
                        dailyGoalEntity.Remove(toDelete);
                        theUser.completedDailies.Add(newCompletedDaily);
                        var message = Request.CreateResponse(HttpStatusCode.Created);
                        return message;
                    }
                    newDaily.trueFalseArr = 8;
                    newDaily.userEmail = theUser.Email;
                    newDaily.user = theUser;
                    theUser.dailyGoals.Add(newDaily);
                    entities.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.Created);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
        [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
        [TokenAuthenticationAttribute]
        [Route("api/values/otherCategory")]
        public HttpResponseMessage Post(otherCategory newOtherCategory)
        {
            try
            {
                using (UsersEntities entities = new UsersEntities())
                {
                    string authToken = Encoding.UTF8.GetString(Convert.FromBase64String(Request.Headers.Authorization.Parameter));
                    var userSession = entities.sessions.FirstOrDefault(session => (session.sessionID.Equals(authToken)));
                    var theUser = entities.users.First(user => (user.Email.Equals(userSession.userEmail)));
                    newOtherCategory.userEmail = theUser.Email;
                    newOtherCategory.user = theUser;
                    newOtherCategory.otherGoals.First().categoryID = newOtherCategory.id;
                    theUser.otherCategories.Add(newOtherCategory);
                    entities.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.Created);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
        [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
        [TokenAuthenticationAttribute]
        [Route("api/values/otherGoal")]
        public HttpResponseMessage Post(otherGoal newOtherGoal)
        {
            try
            {
                using (UsersEntities entities = new UsersEntities())
                {
                    string authToken = Encoding.UTF8.GetString(Convert.FromBase64String(Request.Headers.Authorization.Parameter));
                    var userSession = entities.sessions.FirstOrDefault(session => (session.sessionID.Equals(authToken)));
                    var theUser = entities.users.First(user => (user.Email.Equals(userSession.userEmail)));
                    var theCategory = theUser.otherCategories.First(category => (category.id.Equals(newOtherGoal.categoryID)));
                    //newOtherGoal.otherCategory = theCategory;
                    theCategory.otherGoals.Add(newOtherGoal);
                    entities.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.Created);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
        [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
        [TokenAuthenticationAttribute]
        [Route("api/values/delete")]
        public HttpResponseMessage Delete(DeleteObject goalToDelete)
        {
            try
            {
                using (UsersEntities entities = new UsersEntities())
                {
                    string authToken = Encoding.UTF8.GetString(Convert.FromBase64String(Request.Headers.Authorization.Parameter));
                    var userSession = entities.sessions.FirstOrDefault(session => (session.sessionID.Equals(authToken)));
                    var theUser = entities.users.First(user => (user.Email.Equals(userSession.userEmail)));
                    if (goalToDelete.categoryID == "daily")
                    {
                        var dailyGoalEntity = entities.Set<dailyGoal>();
                        var toDelete = theUser.dailyGoals.First(goal => (goal.id.Equals(goalToDelete.id)));
                        dailyGoalEntity.Remove(toDelete);
                    }
                    else if (goalToDelete.categoryID == "completeddaily")
                    {
                        var dailyGoalCompletedEntity = entities.Set<completedDaily>();
                        var toDelete = theUser.completedDailies.First(goal => (goal.id.Equals(goalToDelete.id)));
                        dailyGoalCompletedEntity.Remove(toDelete);
                    }
                    else
                    {
                        var theCategory = theUser.otherCategories.First(category => ( category.id.Equals(goalToDelete.categoryID)));
                        var otherGoals = theCategory.otherGoals.ToArray();
                        var otherGoalEntity = entities.Set<otherGoal>();
                        var toDelete = otherGoals.First(goal => (goal.id.Equals(goalToDelete.id)));
                        otherGoalEntity.Remove(toDelete);
                        if (otherGoals.Length == 1)
                        {
                            var test = entities.Set<otherCategory>();
                            test.Remove(theCategory);
                        }
                    }
                    entities.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
        [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
        [TokenAuthenticationAttribute]
        [Route("api/values/update")]
        public HttpResponseMessage PATCH(UpdateObject goalToUpdate)
        {
            try
            {
                using (UsersEntities entities = new UsersEntities())
                {
                    string authToken = Encoding.UTF8.GetString(Convert.FromBase64String(Request.Headers.Authorization.Parameter));
                    var userSession = entities.sessions.FirstOrDefault(session => (session.sessionID.Equals(authToken)));
                    var theUser = entities.users.First(user => (user.Email.Equals(userSession.userEmail)));
                    if (goalToUpdate.categoryID == "daily")
                    {
                        var theGoal = theUser.dailyGoals.First(goal => (goal.id.Equals(goalToUpdate.id)));
                        if(true)
                        {
                            var arr = TrueFalseArr.intToArr[theGoal.trueFalseArr];
                            theGoal.daysChecked += arr[4] ? 1 : -1;
                            arr[4] = !arr[4];
                            theGoal.trueFalseArr = TrueFalseArr.arrToInt[arr];
                        }
                        else
                        {
                            theGoal.trueFalseArr = TrueFalseArr.arrToInt[goalToUpdate.weeklyChecked];
                        }
                    }
                    else
                    {
                        var theCategory = theUser.otherCategories.First(category => (category.id.Equals(goalToUpdate.categoryID)));
                        var theGoal = theCategory.otherGoals.First(goal => (goal.id.Equals(goalToUpdate.id)));
                        theGoal.isCompleted = true;
                        if(theGoal.endDate > DateTime.Now)
                        {
                            theGoal.endDate = DateTime.Now.Date;
                        }
                    }
                    entities.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}
