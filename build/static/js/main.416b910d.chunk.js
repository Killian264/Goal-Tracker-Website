(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,a){e.exports=a(21)},21:function(e,t,a){"use strict";a.r(t);var r=a(0),l=a.n(r),n=a(12),o=a.n(n),s=a(6),i=a(1),c=a(2),d=a(4),h=a(3),m=a(5),u=(a(9),function(e){function t(){var e,a;Object(i.a)(this,t);for(var r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return(a=Object(d.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(n)))).state={renderAmount:0},a.heading=l.a.createRef(),a.updateState=function(e){(e=Math.floor((e-200)/80))>8&&(e=8);var t=a.state;t.renderAmount=e,a.setState({state:t})},a.listElement=function(e,t){return l.a.createElement("li",{key:t},l.a.createElement("label",{className:"checkbox"},l.a.createElement("input",{type:"checkbox",checked:e.weeklyChecked[t],readOnly:!0}),l.a.createElement("span",{className:"checkmark"})))},a.positivedateRenders=function(e,t){for(var r=[],l=1;l<=t;l++)r.push(a.listElement(e,l+4));return[r]},a.negativedateRenders=function(e,t){var r=[];if(2!==a.state.renderAmount){for(var l=4-(t=(t/=2)<2?Math.floor(t):Math.ceil(t));l<=3;l++)r.push(a.listElement(e,l));return[r]}},a.onClick=function(e){a.props.deleteGoal(e.target.title,"daily")},a.updateCheckMark=function(e){a.props.updateCheckMark(e.target.id)},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this.heading.current.offsetWidth;this.updateState(e)}},{key:"render",value:function(){var e=this,t=this.props,a=t.dailyGoals,r=t.deleteGoal,n=t.updateCheckMark,o=a.map(function(t){return l.a.createElement("div",{className:"onedailygoal",key:t.id,ref:e.heading},l.a.createElement("div",{className:"onedailygoalheading"},l.a.createElement("h4",null,t.title),t.snippit),function(t){return l.a.createElement("ul",{key:t.id},e.negativedateRenders(t,e.state.renderAmount),l.a.createElement("li",{key:4},l.a.createElement("label",{className:"checkbox checkboxmain"},l.a.createElement("input",{type:"checkbox",checked:t.weeklyChecked[4],readOnly:!0,onClick:function(){n(t.id)}}),l.a.createElement("span",{className:"checkmark"}))),e.positivedateRenders(t,Math.floor(e.state.renderAmount/2)-2),l.a.createElement("li",{key:8,className:"close-container",onClick:function(){r(t.id,"daily")}},l.a.createElement("div",{className:"leftright"}),l.a.createElement("div",{className:"rightleft"}),l.a.createElement("label",{className:"close"},"close")))}(t))});return l.a.createElement("div",{className:"onedailygoalcheckmark"},o)}}]),t}(r.Component)),p=function(e){function t(){var e,a;Object(i.a)(this,t);for(var r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return(a=Object(d.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(n)))).state={renderAmount:0},a.heading=l.a.createRef(),a.updateState=function(e){(e=Math.floor((e-200)/80))>8&&(e=8);var t=a.state;t.renderAmount=e,a.setState({state:t})},a.listElement=function(e){return l.a.createElement("li",{key:e},a.getWeekDay(e),l.a.createElement("br",null),a.getMonthDay(e))},a.positivedateRenders=function(e){for(var t=[],r=1;r<=e;r++)t.push(a.listElement(r));return[t]},a.negativedateRenders=function(e){var t=[];if(2!==a.state.renderAmount){for(var r=4-(e=(e/=2)<2?Math.floor(e):Math.ceil(e));r<=3;r++)t.push(a.listElement(r-4));return[t]}},a.getWeekDay=function(e){var t=new Date;return["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][new Date(t.getFullYear(),t.getMonth(),t.getDate()+e).getDay()]},a.getMonthDay=function(e){var t=new Date;return(t=new Date(t.getFullYear(),t.getMonth(),t.getDate()+e)).getDate()},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this.heading.current.offsetWidth;this.updateState(e)}},{key:"render",value:function(){return l.a.createElement("div",{className:"dailygoals"},l.a.createElement("div",{className:"dailyheading",ref:this.heading},l.a.createElement("div",{className:"dailyheadingheading"},l.a.createElement("h1",null,"Daily Goals")),l.a.createElement("ul",null,this.negativedateRenders(this.state.renderAmount),l.a.createElement("li",{className:"dailyWeekdate"},this.getWeekDay(0),l.a.createElement("br",null),this.getMonthDay(0)),this.positivedateRenders(this.state.renderAmount/2-2),l.a.createElement("li",null,"Del",l.a.createElement("br",null),"\u25bc"))),l.a.createElement("div",{className:"dailygoalslist"},l.a.createElement(u,{updateCheckMark:this.props.updateCheckMark,dailyGoals:this.props.dailyGoals,deleteGoal:this.props.deleteGoal})))}}]),t}(r.Component);function g(){var e=new Date;return e.getFullYear().toString()+"/"+(e.getMonth()+1).toString()+"/"+e.getDate().toString()+" 00:00"}function y(){var e=new Date;return e.getFullYear().toString()+"/"+(e.getMonth()+1).toString()+"/"+(e.getDate()-1).toString()+" 00:00"}var f=function(e){function t(){return Object(i.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=this.props.othergoals,a=t.otherGoals.map(function(a){var r=new Date(a.endDate),n=Math.abs(new Date(a.startDate)-r)/864e5,o=g(),s=(Math.abs(r-new Date(o))/864e5).toString().split(".")[0];return l.a.createElement("div",{className:"othergoalslist",key:a.id},l.a.createElement("div",{className:"otherdailygoal"},l.a.createElement("div",{className:"otherdailygoalheading otherdailygoalheadingheading"},l.a.createElement("ul",null,l.a.createElement("h4",null,a.title),a.snippit)),l.a.createElement("div",{className:"otherdailygoalheading extendeddailygoaltimeframe"},l.a.createElement("h4",null,n," Total Days",l.a.createElement("br",null),s," Days Left")),l.a.createElement("div",{className:"otherdailygoalheading extendeddailygoalyourprogress"},l.a.createElement("h1",{onClick:function(){e.props.subtractPercentage(a.id,t.category)}},"\u2212"),l.a.createElement("h1",{onClick:function(){e.props.addPercentage(a.id,t.category)}},"+"),l.a.createElement("h4",null,a.percentComplete,"%"),l.a.createElement("div",{className:"close-container",onClick:function(){e.props.deleteGoal(a.id,t.category)}},l.a.createElement("div",{className:"leftright"}),l.a.createElement("div",{className:"rightleft"})))))});return l.a.createElement("div",null,a)}}]),t}(r.Component),E=function(e){function t(){return Object(i.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.otherGoalCategories,r=t.deleteGoal,n=a.map(function(t){return!1===t.render?null:l.a.createElement("div",{className:"othergoals",key:t.id},l.a.createElement("div",{className:"otherheading"},l.a.createElement("div",{className:"otherheadingheading"},l.a.createElement("h1",null,t.category)),l.a.createElement("div",{className:"otherheadingheading otherheadingheadingtimeframe"},l.a.createElement("h1",null,"TimeFrame")),l.a.createElement("div",{className:"otherheadingheading otherheadingheadingyourprogress"},l.a.createElement("h1",null,"Your Progress"))),l.a.createElement(f,{othergoals:t,deleteGoal:r,addPercentage:e.props.addPercentage,subtractPercentage:e.props.subtractPercentage}))});return l.a.createElement("div",null,n)}}]),t}(r.Component),C=function(e){function t(){var e,a;Object(i.a)(this,t);for(var r=arguments.length,l=new Array(r),n=0;n<r;n++)l[n]=arguments[n];return(a=Object(d.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(l)))).state={dailyLength:0,otherLength:0,completedLength:0},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=this.props.goals.otherGoalsCategories.map(function(t){return l.a.createElement("label",{key:t.id,className:"radiobtn",id:"renderDaily"},t.category,": ",t.otherGoals.length,l.a.createElement("input",{type:"checkbox",onClick:function(){return e.props.updateCategoryRender(t.id)},name:"category",defaultChecked:!0}),l.a.createElement("span",{id:"renderDaily",className:"radiocheckmark"}))});return l.a.createElement(l.a.Fragment,null,function(){var a=e.state,r=0,n=0;return a.dailyLength=e.props.goals.dailyGoals.length,e.props.goals.otherGoalsCategories.forEach(function(e){return n=e.otherGoals.length,a[e.catagory]=n,r+=n,n=0,!0}),a.otherLength=r,r=0,n=0,r=e.props.goals.completed.dailyGoals.length,e.props.goals.completed.otherGoalsCategories.forEach(function(e){return n=e.otherGoals.length,a[e.catagory]=n,r+=n,n=0,!0}),a.completedLength=r,l.a.createElement("div",{className:"goaltypeselector"},l.a.createElement("h2",null,"Sort Goals"),l.a.createElement("div",{className:"sort"},l.a.createElement("ul",null,l.a.createElement("label",{className:"radiobtn"},"Current: ",a.dailyLength+a.otherLength,l.a.createElement("input",{type:"radio",onClick:function(){return e.props.updateRenderIfs("renderCurrent")},name:"currentOrCompleted",defaultChecked:!0}),l.a.createElement("span",{id:"renderCurrent",className:"radiocheckmark"})),l.a.createElement("label",{className:"radiobtn"},"Completed: ",a.completedLength,l.a.createElement("input",{type:"radio",onClick:function(){return e.props.updateRenderIfs("renderCompleted")},name:"currentOrCompleted"}),l.a.createElement("span",{id:"renderCompleted",className:"radiocheckmark"})))),l.a.createElement("div",{className:"goaltype"},l.a.createElement("h3",null,"Goal Type"),l.a.createElement("ul",null,l.a.createElement("label",{className:"radiobtn"},"All Types: ",a.dailyLength+a.otherLength,l.a.createElement("input",{type:"radio",onClick:function(){return e.props.updateRenderIfs("allTypes")},name:"goaltype",defaultChecked:!0}),l.a.createElement("span",{id:"allTypes",className:"radiocheckmark"})),l.a.createElement("label",{className:"radiobtn"},"Daily Goals: ",a.dailyLength,l.a.createElement("input",{type:"radio",onClick:function(){return e.props.updateRenderIfs("renderDaily")},name:"goaltype"}),l.a.createElement("span",{className:"radiocheckmark"})),l.a.createElement("label",{className:"radiobtn"},"Other Goals: ",a.otherLength,l.a.createElement("input",{type:"radio",onClick:function(){return e.props.updateRenderIfs("renderOther")},name:"goaltype"}),l.a.createElement("span",{className:"radiocheckmark"})))),l.a.createElement("div",{className:"catagories"},l.a.createElement("h3",null,"Catagories"),l.a.createElement("ul",null,t)))}())}}]),t}(r.Component),v=a(7),k=a.n(v),D=function(e){function t(){var e,a;Object(i.a)(this,t);for(var r=arguments.length,l=new Array(r),n=0;n<r;n++)l[n]=arguments[n];return(a=Object(d.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(l)))).state={title:null,snippit:null,endDate:null,type:"daily",category:"",newCategory:!0},a.onChange=function(e){a.setState(Object(s.a)({},e.target.id,e.target.value))},a.categoryOnChange=function(e){var t,r;r="newCategory"===e.target.value,a.setState((t={},Object(s.a)(t,e.target.id,e.target.value),Object(s.a)(t,"newCategory",r),t))},a.onSubmit=function(e){if(e.preventDefault(),!a.state.title||!a.state.endDate||a.state.newCategory&&"newCategory"===a.state.category)return window.alert("Please fill out all fields");new Date(a.state.endDate)<new Date(y())?window.alert("Date must be today or later"):a.props.stateAdd(a.state)},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props,t=e.otherGoalCategories,a=e.closeGoalOverlay,r=t.map(function(e){return l.a.createElement("option",{key:e.key,value:e.category}," ",e.category)});return l.a.createElement("div",{className:"creategoaloverlay",id:"creategoaloverlay"},l.a.createElement("div",{className:"creategoal"},l.a.createElement("h1",null,"Create Goal"),l.a.createElement("div",{className:"goalallinput"},l.a.createElement("ul",null,l.a.createElement("li",null,"Goal:",l.a.createElement("br",null),l.a.createElement("input",{className:"goalinput goal",id:"title",type:"text",name:"goal",onChange:this.onChange})),l.a.createElement("li",null,"Short Description:",l.a.createElement("br",null)," ",l.a.createElement("input",{className:"goalinput sDes",id:"snippit",type:"text",name:"sDes",onChange:this.onChange})),l.a.createElement("li",null,"Ends:",l.a.createElement("br",null)," ",l.a.createElement("input",{type:"date",className:"goalinput dDate",id:"endDate",name:"dDate",onChange:this.onChange})),l.a.createElement("li",null,"Type:",l.a.createElement("select",{name:"type",id:"type",className:"type",onChange:this.onChange},l.a.createElement("option",{value:"daily"}," Daily Goal"),l.a.createElement("option",{value:"default"}," Default Goal"))),"Category:",l.a.createElement("select",{name:"type",className:"type",id:"category",onChange:this.categoryOnChange,disabled:"daily"===this.state.type},l.a.createElement("option",{value:"newCategory"}," New Category"),r),l.a.createElement("li",null,"New Category:",l.a.createElement("br",null)," ",l.a.createElement("input",{className:"goalinput category",id:"category",type:"text",name:"category",onChange:this.onChange,disabled:"daily"===this.state.type||!this.state.newCategory})))),l.a.createElement("div",{className:"submitarea"},l.a.createElement("input",{id:"cancelbutton",className:"button",type:"submit",value:"Cancel",onClick:a}),l.a.createElement("div",{className:"submitbutton"},l.a.createElement("input",{className:"button submit",type:"submit",value:"Submit",onClick:this.onSubmit})))))}}]),t}(r.Component),b=function(e){function t(){return Object(i.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props.dailyGoals.map(function(e){var t=new Date(e.endDate),a=Math.abs(new Date(e.startDate)-t)/864e5;return l.a.createElement("div",{className:"othergoalslist",key:e.id},l.a.createElement("div",{className:"otherdailygoal"},l.a.createElement("div",{className:"otherdailygoalheading otherdailygoalheadingheading"},l.a.createElement("ul",null,l.a.createElement("h4",null,e.title),e.snippit)),l.a.createElement("div",{className:"otherdailygoalheading extendeddailygoaltimeframe"},l.a.createElement("h4",null,a," Total Days",l.a.createElement("br",null)," Ended ",e.endDate.split("00:00")[0])),l.a.createElement("div",{className:"otherdailygoalheading extendeddailygoalyourprogress"},l.a.createElement("h4",null,e.percentComplete,"%",l.a.createElement("br",null)," Completed ",e.daysChecked," Days"))))});return l.a.createElement("div",{className:"othergoals"},l.a.createElement("div",{className:"otherheading"},l.a.createElement("div",{className:"otherheadingheading"},l.a.createElement("h1",null,"Daily")),l.a.createElement("div",{className:"otherheadingheading otherheadingheadingtimeframe"},l.a.createElement("h1",null,"TimeFrame")),l.a.createElement("div",{className:"otherheadingheading otherheadingheadingyourprogress"},l.a.createElement("h1",null,"Final Progress"))),e)}}]),t}(r.Component),G=function(e){function t(){return Object(i.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props.othergoals.otherGoals.map(function(e){var t=new Date(e.endDate),a=Math.abs(new Date(e.startDate)-t)/864e5;return l.a.createElement("div",{className:"othergoalslist",key:e.id},l.a.createElement("div",{className:"otherdailygoal"},l.a.createElement("div",{className:"otherdailygoalheading otherdailygoalheadingheading"},l.a.createElement("ul",null,l.a.createElement("h4",null,e.title),e.snippit)),l.a.createElement("div",{className:"otherdailygoalheading extendeddailygoaltimeframe"},l.a.createElement("h4",null,a," Total Days",l.a.createElement("br",null)," Ended ",e.endDate.split("00:00")[0])),l.a.createElement("div",{className:"otherdailygoalheading extendeddailygoalyourprogress"},l.a.createElement("h4",null,e.percentComplete,"%"))))});return l.a.createElement("div",null,e)}}]),t}(r.Component),N=function(e){function t(){return Object(i.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props.otherGoalCategories.map(function(e){return l.a.createElement("div",{className:"othergoals",key:e.id},l.a.createElement("div",{className:"otherheading"},l.a.createElement("div",{className:"otherheadingheading"},l.a.createElement("h1",null,e.category)),l.a.createElement("div",{className:"otherheadingheading otherheadingheadingtimeframe"},l.a.createElement("h1",null,"TimeFrame")),l.a.createElement("div",{className:"otherheadingheading otherheadingheadingyourprogress"},l.a.createElement("h1",null,"Final Progress"))),l.a.createElement(G,{othergoals:e}))});return l.a.createElement("div",null,e)}}]),t}(r.Component),O=function(e){function t(){var e,a;Object(i.a)(this,t);for(var r=arguments.length,l=new Array(r),n=0;n<r;n++)l[n]=arguments[n];return(a=Object(d.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(l)))).state={goals:{dailyGoals:[{id:1,title:"Programme",snippit:"Write Code",startDate:"2019, 7, 1 00:00",endDate:"2019, 7, 30 00:00",lastDayUpdated:"2019, 7, 14 00:00",daysChecked:20,weeklyChecked:[!0,!1,!0,!0,!0,!1,!1]},{id:2,title:"Learn React",snippit:"Write Code",startDate:"2019, 7, 1 00:00",endDate:"2019, 7, 30 00:00",lastDayUpdated:"2019, 7, 14 00:00",daysChecked:12,weeklyChecked:[!0,!0,!1,!0,!1,!1,!1]},{id:3,title:"Be Cool",snippit:"Yea",startDate:"2019, 7, 1 00:00",endDate:"2019, 7, 10 00:00",lastDayUpdated:"2019, 7, 14 00:00",daysChecked:12,weeklyChecked:[!1,!0,!0,!0,!1,!1,!1]},{id:5454,title:"Be Cools",snippit:"Yea",startDate:"2019, 7, 1 00:00",endDate:"2019, 7, 17 00:00",lastDayUpdated:"2019, 7, 14 00:00",daysChecked:12,weeklyChecked:[!1,!0,!0,!0,!1,!1,!1]}],otherGoalsCategories:[{category:"Programming",id:4,render:!0,otherGoals:[{id:5,title:"Learn React",snippit:"Code a bunch of stuff",startDate:"2019, 7, 1 00:00",endDate:"2019, 7, 15 00:00",percentComplete:20},{id:6,title:"Learn to Code",snippit:"Learn React, C++, SQL, and more C#",startDate:"2019, 5, 1 00:00",endDate:"2019, 8, 16 00:00",percentComplete:40}]},{category:"Reading",id:7,render:!0,otherGoals:[{id:8,title:"Read a book",snippit:"Read the blade itself",startDate:"2019, 7, 8 00:00",endDate:"2019, 7, 30 00:00",percentComplete:0},{id:9,title:"Read 20 books",snippit:"Shouldn't be too hard he thought",startDate:"2019, 1, 1 00:00",endDate:"2020, 1, 1 00:00",percentComplete:50}]},{category:"Goal Tracker Project",id:10,render:!0,otherGoals:[{id:11,title:"Add Goal Adding",snippit:"Add Form and State Addition",startDate:"2019, 7, 9 00:00",endDate:"2019, 7, 11 00:00",percentComplete:0},{id:12,title:"Add Goal Deletion",snippit:"Add Form and State Deletion",startDate:"2019, 7, 9 00:00",endDate:"2019, 7, 11 00:00",percentComplete:0},{id:13,title:"Fix Small bugs",snippit:"SideNav Stuff",startDate:"2019, 7, 9 00:00",endDate:"2019, 7, 12 00:00",percentComplete:0},{id:14,title:"Add Sorting Box",snippit:"Should be easy after I learn add and delete stuff",startDate:"2019, 7, 9 00:00",endDate:"2019, 7, 12 00:00",percentComplete:0},{id:15,title:"Add Login and backend stuff",snippit:"This might be the hard part",startDate:"2019, 7, 9 00:00",endDate:"2019, 7, 19 00:00",percentComplete:0}]}],completed:{dailyGoals:[],otherGoalsCategories:[{category:"Programming",id:16,otherGoals:[{id:17,title:"Learn React",snippit:"Code a bunch of stuff",startDate:"2019, 7, 1 00:00",endDate:"2019, 7, 15 00:00",percentComplete:20}]}]}},otherStuffs:{overlayIsHidden:!0,renderCurrent:!0,renderCompleted:!1,renderDaily:!0,renderOther:!0}},a.updateCategoryRender=function(e){var t=a.state;a.state.goals.otherGoalsCategories.map(function(a,r){return console.log(a.id,e),a.id===e&&(t.goals.otherGoalsCategories[r].render=!t.goals.otherGoalsCategories[r].render,console.log("found it")),!0}),a.setState({state:t})},a.updateLastUpdated=function(e,t){if(t>5)e.lastDayUpdated=g(),e.weeklyChecked=[!1,!1,!1,!1,!1,!1,!1];else{e.lastDayUpdated=g();for(var a=[!1,!1,!1,!1,!1,!1,!1],r=0;r<5-t;r++)a[r]=e.weeklyChecked[r+t];e.weeklyChecked=a}return e},a.deleteGoal=function(e,t){var r,l=a.state;if("daily"===t){var n=a.state.goals.dailyGoals,o=a.mapFunc(a.state.goals.dailyGoals,"id",e);r=a.state.goals.dailyGoals[o],n.splice(o,1),l.goals.dailyGoals=n}else a.state.goals.otherGoalsCategories.forEach(function(n,o){if(n.category===t){var s=a.state.goals.otherGoalsCategories[o].otherGoals;a.state.goals.otherGoalsCategories[o].otherGoals.forEach(function(t,a){return t.id===e&&(s.splice(a,1),r=t),!0}),l.goals.otherGoalsCategories[o].otherGoals=s,0===l.goals.otherGoalsCategories[o].otherGoals.length&&l.goals.otherGoalsCategories.splice(o,1)}return!0});a.setState(Object(s.a)({},l,l)),a.completed(r,t)},a.updateRenderIfs=function(e){var t=a.state.otherStuffs;switch(!1===a.state.otherStuffs[e]&&(t[e]=!0),e){case"allTypes":t.renderDaily=!0,t.renderOther=!0;break;case"renderCurrent":!0===a.state.otherStuffs.renderCompleted&&(t.renderCompleted=!1);break;case"renderCompleted":!0===a.state.otherStuffs.renderCurrent&&(t.renderCurrent=!1);break;case"renderDaily":!0===a.state.otherStuffs.renderOther&&(t.renderOther=!1);break;case"renderOther":!0===a.state.otherStuffs.renderDaily&&(t.renderDaily=!1)}a.setState({otherStuffs:t})},a.completed=function(e,t){var r=a.state;if("daily"===t){var l=new Date(e.endDate),n=Math.abs(new Date(e.startDate)-l)/864e5;e={id:e.id,title:e.title,snippit:e.snippit,startDate:e.startDate,endDate:e.endDate,daysChecked:e.daysChecked,percentComplete:(e.daysChecked/n*100).toString().substr(0,2)},r.goals.completed.dailyGoals.push(e)}else{var o=!0,s=a.mapFunc(a.state.goals.completed.otherGoalsCategories,"category",t);null!==s&&(r.goals.completed.otherGoalsCategories[s].otherGoals.push(e),o=!1),!0===o&&(e={category:t,id:k.a.v4(),otherGoals:[e]},r.goals.completed.otherGoalsCategories.push(e))}r.otherStuffs.overlayIsHidden=!0,a.setState({state:r})},a.displayGoalOverlay=function(){var e=a.state.otherStuffs;e.overlayIsHidden=!e.overlayIsHidden,a.setState(Object(s.a)({},e.otherStuffs,e))},a.updateCheckMark=function(e){var t=a.state.goals,r=a.mapFunc(t.dailyGoals,"id",e);t.dailyGoals[r].weeklyChecked[4]=!t.dailyGoals[r].weeklyChecked[4],t.dailyGoals[r].weeklyChecked[4]?t.dailyGoals[r].daysChecked++:t.dailyGoals[r].daysChecked--,a.setState(Object(s.a)({},t.goals,t))},a.stateAdd=function(e){var t=a.state,r=g();if("daily"===e.type)e={id:k.a.v4(),title:e.title,snippit:e.snippit,startDate:r,endDate:e.endDate+" 00:00",lastDayUpdated:r,daysChecked:0,weeklyChecked:[!1,!1,!1,!1,!1,!1,!1]},t.goals.dailyGoals.push(e);else{var l=e.category,n=e.newCategory;if(e={id:k.a.v4(),title:e.title,snippit:e.snippit,startDate:r,endDate:e.endDate+" 00:00",percentComplete:0},!0===n)e={category:l,id:k.a.v4(),render:!0,otherGoals:[e]},t.goals.otherGoalsCategories.push(e);else{var o=a.mapFunc(a.state.goals.otherGoalsCategories,"category",l);t.goals.otherGoalsCategories[o].otherGoals.push(e)}}t.otherStuffs.overlayIsHidden=!0,a.setState({state:t})},a.navSlideChange=function(){document.querySelector(".sidenav").classList.toggle("nav-active")},a.addPercentage=function(e,t){var r=a.state,l=a.mapFunc(a.state.goals.otherGoalsCategories,"category",t),n=a.mapFunc(a.state.goals.otherGoalsCategories[l].otherGoals,"id",e);r.goals.otherGoalsCategories[l].otherGoals[n].percentComplete+=2,r.goals.otherGoalsCategories[l].otherGoals[n].percentComplete>99?a.deleteGoal(e,t):a.setState({state:r})},a.subtractPercentage=function(e,t){var r=a.state,l=a.mapFunc(a.state.goals.otherGoalsCategories,"category",t),n=a.mapFunc(a.state.goals.otherGoalsCategories[l].otherGoals,"id",e);r.goals.otherGoalsCategories[l].otherGoals[n].percentComplete<=0||(r.goals.otherGoalsCategories[l].otherGoals[n].percentComplete+=-2,a.setState({state:r}))},a.mapFunc=function(e,t,a){for(var r=0;r<e.length;r++)if(e[r][t]===a)return r;return null},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=this.state,a=[];this.state.goals.dailyGoals.forEach(function(r){if(Date.parse(r.endDate)<=Date.parse(y()))t.goals.completed.dailyGoals.push(e.changeDailyToCompleted(r));else if(Date.parse(r.lastDayUpdated)<Date.parse(g())){var l=(Date.parse(r.lastDayUpdated)-Date.parse(g()))/864e5*-1;a.push(e.updateLastUpdated(r,l))}});var r=[];this.state.goals.otherGoalsCategories.forEach(function(a){var l=[];if(a.otherGoals.forEach(function(r){if(Date.parse(r.endDate)<=Date.parse(y())){var n=!1;e.state.goals.completed.otherGoalsCategories.forEach(function(e,l){e.category===a.category&&(t.goals.completed.otherGoalsCategories[l].otherGoals.push(r),n=!0)}),!1===n&&t.goals.completed.otherGoalsCategories.push({category:a.category,id:a.id,otherGoals:[r]})}else l.push(r)}),0!==l.length){var n=a;n.otherGoals=l,r.push(n)}}),t.goals.otherGoalsCategories=r,t.goals.dailyGoals=a,this.setState({state:t})}},{key:"changeDailyToCompleted",value:function(e){var t=new Date(e.endDate),a=Math.abs(new Date(e.startDate)-t)/864e5;return e={id:e.id,title:e.title,snippit:e.snippit,startDate:e.startDate,endDate:e.endDate,daysChecked:e.daysChecked,percentComplete:(e.daysChecked/a*100).toString().substr(0,2)}}},{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("div",{className:"sidenav"},l.a.createElement("div",{className:"user"},l.a.createElement("img",{src:"Images/profile.png",alt:""}),l.a.createElement("a",{href:"http://localhost:3000"},"Guest")),l.a.createElement("div",{className:"navlinks"},l.a.createElement("a",{href:"http://localhost:3000"},"Dashboard"),l.a.createElement("a",{href:"http://localhost:3000"},"Goals"),l.a.createElement("a",{href:"http://localhost:3000"},"Tasks"),l.a.createElement("a",{href:"http://localhost:3000"},"Portfolio Home"))),l.a.createElement("div",{className:"topnav"},l.a.createElement("div",{className:"navdropdown",onClick:this.navSlideChange},l.a.createElement("div",{className:"line1"}),l.a.createElement("div",{className:"line2"}),l.a.createElement("div",{className:"line3"})),l.a.createElement("h1",null,"Current Goals"),l.a.createElement("div",{className:"creategoalbutton"},l.a.createElement("button",{id:"button",onClick:this.displayGoalOverlay},"Create Goal"))),l.a.createElement("div",{className:"main"},l.a.createElement(C,{goals:this.state.goals,updateRenderIfs:this.updateRenderIfs,updateCategoryRender:this.updateCategoryRender}),l.a.createElement("div",{className:"goals"},this.state.otherStuffs.renderDaily&&0!==this.state.goals.dailyGoals.length&&this.state.otherStuffs.renderCurrent&&l.a.createElement(p,{updateCheckMark:this.updateCheckMark,dailyGoals:this.state.goals.dailyGoals,deleteGoal:this.deleteGoal}),this.state.otherStuffs.renderDaily&&0!==this.state.goals.completed.dailyGoals.length&&this.state.otherStuffs.renderCompleted&&l.a.createElement(b,{dailyGoals:this.state.goals.completed.dailyGoals}),this.state.otherStuffs.renderOther&&this.state.otherStuffs.renderCurrent&&0!==this.state.goals.otherGoalsCategories.length&&l.a.createElement(E,{otherGoalCategories:this.state.goals.otherGoalsCategories,deleteGoal:this.deleteGoal,addPercentage:this.addPercentage,subtractPercentage:this.subtractPercentage}),this.state.otherStuffs.renderOther&&0!==this.state.goals.completed.otherGoalsCategories.length&&this.state.otherStuffs.renderCompleted&&l.a.createElement(N,{otherGoalCategories:this.state.goals.completed.otherGoalsCategories})),!this.state.otherStuffs.overlayIsHidden&&l.a.createElement(D,{otherGoalCategories:this.state.goals.otherGoalsCategories,closeGoalOverlay:this.displayGoalOverlay,stateAdd:this.stateAdd})))}}]),t}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(l.a.createElement(O,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},9:function(e,t,a){}},[[13,1,2]]]);
//# sourceMappingURL=main.416b910d.chunk.js.map