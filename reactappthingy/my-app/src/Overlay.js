import React, { Component } from 'react'

class Overlay extends Component {
    render() {
        // const displayChecks = () =>{
            
        // }
        return (
            <div className="creategoaloverlay" id="creategoaloverlay">
              <div className="creategoal">
                  <h1>Create Goal</h1>
                  <div className="goalallinput">
                      <ul>
                          <div className="test">
                              <li id="goal">Goal:<br/><input className="goalinput goal" type="text" name="goal"/></li>
                              <li>Due date:<br/> <input className="goalinput dDate" type="text" name="dDate"/></li>
                          </div>
                          <li>Short Description:<br/> <input className="goalinput sDes" type="text" name="sDes"/></li>
                          <li>Category:<br/> <input className="goalinput category" type="text" name="category"/></li>
                          <li>Type:<br/> <input className="goalinput type"type="text" name="type"/></li>
                      </ul>
                  </div>
                    <div className="submitarea">
                        <input id="cancelbutton" className="button" type="submit" value="Cancel" />
                        <div className="submitbutton">
                            <input className="button submit" type="submit" value="Submit"/>
                        </div>
                    </div>
              </div>
          </div>
        )
    }
}

export default Overlay