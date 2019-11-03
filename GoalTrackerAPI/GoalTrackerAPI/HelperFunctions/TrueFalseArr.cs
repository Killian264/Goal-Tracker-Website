using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GoalTrackerAPI.Models
{

    public class TrueFalseArr
    {
        public static Dictionary<int, bool[]> intToArr = new Dictionary<int, bool[]>(){
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
            {15, new [] {   true,   true,   false,  true,   false,  false,  false   } },
            {16, new []  {   true,   true,   true,   true,   true,  false,  false   } },
            {17, new []  {   false,  true,   true,   true,   true,  false,  false   } },
            {18, new []  {   false,  false,  true,   true,   true,  false,  false   } },
            {19, new []  {   false,  true,   false,  true,   true,  false,  false   } },
            {20, new []  {   false,  true,   true,   false,  true,  false,  false   } },
            {21, new []  {   false,  true,   false,  false,  true,  false,  false   } },
            {22, new []  {   false,  false,  true,   false,  true,  false,  false   } },
            {23, new []  {   false,  false,  false,  true,   true,  false,  false   } },
            {24, new []  {   false,  false,  false,  false,  true,  false,  false   } },
            {25, new []  {   true,   false,  true,   false,  true,  false,  false   } },
            {26, new [] {   true,   false,  false,  true,    true,  false,  false   } },
            {27, new [] {   true,   false,  true,   true,    true,  false,  false   } },
            {28, new [] {   true,   false,  false,  false,   true,  false,  false   } },
            {29, new [] {   true,   true,   false,  false,   true,  false,  false   } },
            {30, new [] {   true,   true,   true,   false,   true,  false,  false   } },
            {31, new [] {   true,   true,   false,  true,    true,  false,  false   } }
        };
        public static Dictionary<bool[], int> arrToInt = new Dictionary<bool[], int>(){
            {new [] {   true,   true,   true,   true,   false,  false,  false   },0  },
            {new []  {   false,  true,   true,   true,   false,  false,  false   },1  },
            {new []  {   false,  false,  true,   true,   false,  false,  false   },2  },
            {new []  {   false,  true,   false,  true,   false,  false,  false   },3  },
            {new []  {   false,  true,   true,   false,  false,  false,  false   },4  },
            {new []  {   false,  true,   false,  false,  false,  false,  false   },5  },
            {new []  {   false,  false,  true,   false,  false,  false,  false   },6  },
            {new []  {   false,  false,  false,  true,   false,  false,  false   },7  },
            {new []  {   false,  false,  false,  false,  false,  false,  false   },8  },
            {new []  {   true,   false,  true,   false,  false,  false,  false   },9  },
            {new [] {   true,   false,  false,  true,   false,  false,  false   } ,10 },
            {new [] {   true,   false,  true,   true,   false,  false,  false   } ,11 },
            {new [] {   true,   false,  false,  false,  false,  false,  false   } ,12 },
            {new [] {   true,   true,   false,  false,  false,  false,  false   } ,13 },
            {new [] {   true,   true,   true,   false,  false,  false,  false   } ,14 },
            {new [] {   true,   true,   false,  true,   false,  false,  false   } ,15 },
            {new []  {   true,   true,   true,   true,   true,  false,  false   } ,16 },
            {new []  {   false,  true,   true,   true,   true,  false,  false   } ,17 },
            {new []  {   false,  false,  true,   true,   true,  false,  false   } ,18 },
            {new []  {   false,  true,   false,  true,   true,  false,  false   } ,19 },
            {new []  {   false,  true,   true,   false,  true,  false,  false   } ,21 },
            {new []  {   false,  true,   false,  false,  true,  false,  false   } ,22 },
            {new []  {   false,  false,  true,   false,  true,  false,  false   } ,23 },
            {new []  {   false,  false,  false,  true,   true,  false,  false   } ,24 },
            {new []  {   false,  false,  false,  false,  true,  false,  false   } ,25 },
            {new []  {   true,   false,  true,   false,  true,  false,  false   } ,26 },
            {new [] {   true,   false,  false,  true,    true,  false,  false   } ,27 },
            {new [] {   true,   false,  true,   true,    true,  false,  false   } ,28 },
            {new [] {   true,   false,  false,  false,   true,  false,  false   } ,29 },
            {new [] {   true,   true,   false,  false,   true,  false,  false   } ,30 },
            {new [] {   true,   true,   true,   false,   true,  false,  false   } ,31 },
            {new [] {   true,   true,   false,  true,    true,  false,  false   } ,32 }
        };
    }
}