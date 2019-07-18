import React, { Component } from 'react';
import OtherGoalList from './OtherGoalList';

class OtherGoals extends Component {
    render() {
        const{otherGoalCategories, deleteGoal} = this.props;
        const displayOtherGoals = otherGoalCategories.map(category => {

            return(
                <div className="othergoals" key={category.id}>
                    <div className="otherheading">
                        <div className="otherheadingheading">
                            <h1>{category.category}</h1>
                        </div>
                        <div className="otherheadingheading otherheadingheadingtimeframe">
                            <h1>TimeFrame</h1>
                        </div>
                        <div className="otherheadingheading otherheadingheadingyourprogress">
                            <h1>Final Progress</h1>
                        </div>
                    </div>
                    <OtherGoalList othergoals={category}/>
                </div>
            )
        })

        return(
        <div>
            {displayOtherGoals}
        </div>
        )
    }
}
export default OtherGoals