import React, { Component } from 'react';
import { getYeseterday } from './commonCommands';

class Overlay extends Component {
    state = {
      title: null,
      snippit: null,
      endDate: null,
      type: 'daily',
      category: '',
      newCategory: true,
    }

    onChange = (e) => {
      this.setState({
        [e.target.id]: e.target.value,
      });
    }

    categoryOnChange = (e) => {
      // let tF;
      const tF = e.target.value === 'newCategory';
      this.setState({
        [e.target.id]: e.target.value,
        newCategory: tF,
      });
    }

    onSubmit = (e) => {
      const { state } = this;
      const { stateAdd } = this.props;
      e.preventDefault();
      if ((state.title && state.endDate) && (!(state.newCategory) || !(state.category === 'newCategory'))) {
        if (new Date(state.endDate) < new Date(getYeseterday())) {
          window.confirm('Please choose an End Date');
          return;
        }
        stateAdd(state);
      } else {
        window.confirm('please confirm');
      }
    }

    render() {
      const { otherGoalCategories, closeGoalOverlay } = this.props;
      const { state } = this;
      const categories = otherGoalCategories.map(category => (
        <option key={category.key} value={category.category}>
          {' '}
          {category.category}
        </option>
      ));
      return (
        <div className="creategoaloverlay" id="creategoaloverlay">
          <div className="creategoal">
            <h1>Create Goal</h1>
            <div className="goalallinput">
              <ul>
                <li>
Goal:
                  <br />
                  <input className="goalinput goal" id="title" type="text" name="goal" onChange={this.onChange} />
                </li>
                <li>
Short Description:
                  <br />
                  {' '}
                  <input className="goalinput sDes" id="snippit" type="text" name="sDes" onChange={this.onChange} />
                </li>
                <li>
Ends:
                  <br />
                  {' '}
                  <input type="date" className="goalinput dDate" id="endDate" name="dDate" onChange={this.onChange} />
                </li>
                <li>
Type:
                  <select name="type" id="type" className="type" onChange={this.onChange}>
                    <option value="daily"> Daily Goal</option>
                    <option value="default"> Default Goal</option>
                  </select>
                </li>
                            Category:
                <select name="type" className="type" id="category" onChange={this.categoryOnChange} disabled={this.state.type === 'daily'}>
                  <option value="newCategory"> New Category</option>
                  {categories}
                </select>
                <li>
New Category:
                  <br />
                  {' '}
                  <input className="goalinput category" id="category" type="text" name="category" onChange={this.onChange} disabled={this.state.type === 'daily' || !(this.state.newCategory)} />
                </li>
              </ul>
            </div>
            <div className="submitarea">
              <input id="cancelbutton" className="button" type="submit" value="Cancel" onClick={closeGoalOverlay} />
              <div className="submitbutton">
                <input className="button submit" type="submit" value="Submit" onClick={this.onSubmit} />
              </div>
            </div>
          </div>
        </div>
      );
    }
}

export default Overlay;
