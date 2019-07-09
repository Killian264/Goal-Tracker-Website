import React, { Component } from 'react';
import './App.css';

class OtherGoals extends Component {
    render() {
        const{otherGoalCategories} = this.props;
        // const displayOtherGoals = otherGoalCategories.map(category => {
        //     console.log(category)

        //     return(
        //         <div className="otherheadingheading">
        //           <h1>Goal Type</h1>
        //         </div>
        //     )
        // })

        return(
        <div>
            {console.log(otherGoalCategories)}
            {console.log('23')}
            {/* {displayOtherGoals} */}
        </div>
        )
    }
}
{/* <div className="othergoals">
          <div className="otherheading">
              <div className="otherheadingheading">
                  <h1>Goal Type</h1>
              </div>
              <div className="otherheadingheading otherheadingheadingtimeframe">
                  <h1>TimeFrame</h1>
              </div>
              <div className="otherheadingheading otherheadingheadingyourprogress">
                  <h1>Your Progress</h1>
              </div>
          </div>
          <div className="othergoalslist">
              <div className="otherdailygoal">
                  <div className="otherdailygoalheading otherdailygoalheadingheading">
                      <ul><h4>Programming Some dope ass stuff</h4>Write Code and watch some youtube videos</ul>
                  </div>
                  <div className="otherdailygoalheading extendeddailygoaltimeframe">
                      <h4>2 Months/30 Days Left</h4>
                  </div>
                  <div className="otherdailygoalheading extendeddailygoalyourprogress">
                      <h4>40%</h4>
                  </div>
              </div>
              
          </div>
      </div> */}
export default OtherGoals