import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';

class TypeSelector extends Component {
    // shouldComponentUpdate(nextProps){
    //     if(this.props.goals.otherGoalCategories != nextProps.goals.otherGoalCategories){
    //         return true;
    //     }
    //     if(this.props.goals.dailyGoals.length != nextProps.goals.dailyGoals.length){
    //         return true;
    //     }
    //     return false
    // }
    state = {
      dailyLength: 0,
      otherLength: 0,
      completedLength: 0,
    }

    static propTypes = {
      goals: PropTypes.objectOf(PropTypes.object).isRequired,
      updateCategoryRender: PropTypes.func.isRequired,
      updateRenderIfs: PropTypes.func.isRequired,
    };

    render() {
      const { goals, updateCategoryRender, updateRenderIfs } = this.props;

      const renderSelector = goals.otherGoalsCategories.map(categories => (
        <label key={categories.id} className="radiobtn" id="renderDaily">
          {categories.category}
            :
          {' '}
          {categories.otherGoals.length}
          <input type="checkbox" onClick={() => updateCategoryRender(categories.id)} name="category" defaultChecked />
          <span id="renderDaily" className="radiocheckmark" />
        </label>
      ));

      const getLengths = () => {
        const { state } = this;
        let length = 0;
        let lengthTemp = 0;
        // daily
        state.dailyLength = (goals.dailyGoals).length;

        // otherGoals
        goals.otherGoalsCategories.forEach((catagories) => {
          lengthTemp = catagories.otherGoals.length;
          state[catagories.catagory] = lengthTemp;
          length += lengthTemp;
          lengthTemp = 0;
          return true;
        });
        state.otherLength = length;
        length = 0;
        lengthTemp = 0;

        // completed
        // daily
        length = (goals.completed.dailyGoals).length;

        // otherGoals
        goals.completed.otherGoalsCategories.forEach((catagories) => {
          lengthTemp = catagories.otherGoals.length;
          state[catagories.catagory] = lengthTemp;
          length += lengthTemp;
          lengthTemp = 0;
          return true;
        });
        state.completedLength = length;
        return (
          <div className="goaltypeselector">
            <h2>Sort Goals</h2>
            <div className="sort">
              <ul>
                <label className="radiobtn">
                Current:
                  {' '}
                  {state.dailyLength + state.otherLength}
                  <input type="radio" onClick={() => updateRenderIfs('renderCurrent')} name="currentOrCompleted" defaultChecked />
                  <span id="renderCurrent" className="radiocheckmark" />
                </label>
                <label className="radiobtn">
                Completed:
                  {' '}
                  {state.completedLength}
                  <input type="radio" onClick={() => updateRenderIfs('renderCompleted')} name="currentOrCompleted" />
                  <span id="renderCompleted" className="radiocheckmark" />
                </label>
              </ul>
            </div>
            <div className="goaltype">
              <h3>Goal Type</h3>
              <ul>
                <label className="radiobtn">
                All Types:
                  {' '}
                  {state.dailyLength + state.otherLength}
                  <input type="radio" onClick={() => updateRenderIfs('allTypes')} name="goaltype" defaultChecked />
                  <span id="allTypes" className="radiocheckmark" />
                </label>
                <label className="radiobtn">
                Daily Goals:
                  {' '}
                  {state.dailyLength}
                  <input type="radio" onClick={() => updateRenderIfs('renderDaily')} name="goaltype" />
                  <span className="radiocheckmark" />
                </label>
                <label className="radiobtn">
                Other Goals:
                  {' '}
                  {state.otherLength}
                  <input type="radio" onClick={() => updateRenderIfs('renderOther')} name="goaltype" />
                  <span className="radiocheckmark" />
                </label>
              </ul>
            </div>
            <div className="catagories">
              <h3>Catagories</h3>
              <ul>
                {renderSelector}
              </ul>
            </div>
          </div>
        );
      };
      return (
        <React.Fragment>
          {getLengths()}
        </React.Fragment>
      );
    }
}
export default TypeSelector;
