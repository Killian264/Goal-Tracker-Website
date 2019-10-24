using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GoalTrackerAPI.Models
{
    public class TrueFalseArr
    {
        Dictionary<int, bool[]> intToArr = new Dictionary<int, bool[]>(){
            {0, new []  {   true,   true,   true,   true,   false,  false,  false   } },
            {1, new []  {   false,  true,   true,   true,   false,  false,  false   } },
            {2, new []  {   false,  false,  true,   true,   false,  false,  false   } },
            {3, new []  {   false,  true,   false,  true,   false,  false,  false   } },
            {4, new []  {   false,  true,   true,   false,  false,  false,  false   } },
            {5, new []  {   false,  true,   false,  false,  false,  false,  false   } },
            {6, new []  {   false,  false,  true,   false,  false,  false,  false   } },
            {7, new []  {   false,  false,  false,  true,   false,  false,  false   } },
            {8, new []  {   false,  false,  false,  false,  false,  false,  false   } },
            {9, new []  {   true,   false,  true,   false,  false,  false,  false   } },
            {10, new [] {   true,   false,  false,  true,   false,  false,  false   } },
            {11, new [] {   true,   false,  true,   true,   false,  false,  false   } },
            {12, new [] {   true,   false,  false,  false,  false,  false,  false   } },
            {13, new [] {   true,   true,   false,  false,  false,  false,  false   } },
            {14, new [] {   true,   true,   true,   false,  false,  false,  false   } },
            {15, new [] {   true,   true,   false,  true,   false,  false,  false   } }
        };
        Dictionary<bool[], int> arrToInt = new Dictionary<bool[], int>(){
            {new [] {   true,   true,   true,   true,   false,  false,  false   }, 0},
            {new [] {   false,  true,   true,   true,   false,  false,  false   }, 1},
            {new [] {   false,  false,  true,   true,   false,  false,  false   }, 2},
            {new [] {   false,  true,   false,  true,   false,  false,  false   }, 3},
            {new [] {   false,  true,   true,   false,  false,  false,  false   }, 4},
            {new [] {   false,  true,   false,  false,  false,  false,  false   }, 5},
            {new [] {   false,  false,  true,   false,  false,  false,  false   }, 6},
            {new [] {   false,  false,  false,  true,   false,  false,  false   }, 7},
            {new [] {   false,  false,  false,  false,  false,  false,  false   }, 8},
            {new [] {   true,   false,  true,   false,  false,  false,  false   }, 9},
            {new [] {   true,   false,  false,  true,   false,  false,  false   }, 10},
            {new [] {   true,   false,  true,   true,   false,  false,  false   }, 11},
            {new [] {   true,   false,  false,  false,  false,  false,  false   }, 12},
            {new [] {   true,   true,   false,  false,  false,  false,  false   }, 13},
            {new [] {   true,   true,   true,   false,  false,  false,  false   }, 14},
            {new [] {   true,   true,   false,  true,   false,  false,  false   }, 15}
        };
    }
}