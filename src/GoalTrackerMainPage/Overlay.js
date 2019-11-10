import React, { Component } from "react";
import PropTypes from "prop-types";
import { getYeseterday } from "../helpers/commonCommands";

class Overlay extends Component {
  static propTypes = {
    otherGoalCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
    stateAdd: PropTypes.func.isRequired,
    closeGoalOverlay: PropTypes.func.isRequired
  };

  state = {
    title: null,
    snippit: null,
    endDate: null,
    type: "daily",
    category: null,
    newCategory: true
  };

  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  categoryOnChange = e => {
    const tF = e.target.value === "newCategory";
    this.setState({
      [e.target.id]: e.target.value,
      newCategory: tF
    });
  };

  onSubmit = e => {
    const { state } = this;
    const { stateAdd } = this.props;
    e.preventDefault();
    if (state.title && state.endDate) {
      if (new Date(state.endDate) < new Date(getYeseterday())) {
        alert("Date cannot be before today.");
        return;
      }
      if (!(state.type === "daily")) {
        if (state.newCategory && state.category === null) {
          alert("Please add a category.");
          return;
        }
      }
      stateAdd(state);
    } else {
      alert("Plese fillout all fields.");
    }
  };

  render() {
    const { otherGoalCategories, closeGoalOverlay } = this.props;
    const { state } = this;
    const categories = otherGoalCategories.map((category, index) => (
      <option key={index} value={category.category}>
        {" "}
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
                <input
                  className="goalinput goal"
                  id="title"
                  type="text"
                  name="goal"
                  onChange={this.onChange}
                />
              </li>
              <li>
                Short Description:
                <br />{" "}
                <input
                  className="goalinput sDes"
                  id="snippit"
                  type="text"
                  name="sDes"
                  onChange={this.onChange}
                />
              </li>
              <li>
                Ends:
                <br />{" "}
                <input
                  type="date"
                  className="goalinput dDate"
                  id="endDate"
                  name="dDate"
                  onChange={this.onChange}
                />
              </li>
              <li>
                Type:
                <select
                  name="type"
                  id="type"
                  className="type"
                  onChange={this.onChange}
                >
                  <option value="daily"> Daily Goal</option>
                  <option value="default"> Default Goal</option>
                </select>
              </li>
              Category:
              <select
                name="type"
                className="type"
                id="category"
                onChange={this.categoryOnChange}
                disabled={state.type === "daily"}
              >
                <option value="newCategory"> New Category</option>
                {categories}
              </select>
              <li>
                New Category:
                <br />{" "}
                <input
                  className="goalinput category"
                  id="category"
                  type="text"
                  name="category"
                  onChange={this.onChange}
                  disabled={state.type === "daily" || !state.newCategory}
                />
              </li>
            </ul>
          </div>
          <div className="submitarea">
            <input
              id="cancelbutton"
              className="button"
              type="submit"
              value="Cancel"
              onClick={closeGoalOverlay}
            />
            <div className="submitbutton">
              <input
                className="button submit"
                type="submit"
                value="Submit"
                onClick={this.onSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Overlay;
