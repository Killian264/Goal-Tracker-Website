import React, { Component } from 'react'

class Checks extends Component {
    render() {
        const displayChecks = () =>{
            for(let i = 0; i < 8; i++){
                return(
                            <li>
                                <label className="checkbox">
                                    <input type="checkbox" />
                                    <span class="checkmark"></span>
                                </label>
                            </li>
                )
            }
        }
        return (
            <React.Fragment>
                {displayChecks}
            </React.Fragment>
        )
    }
}

export default Checks
