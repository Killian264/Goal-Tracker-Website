import React, { Component } from "react";
import PropTypes from "prop-types";
import { getYeseterday, getToday } from "../helpers/commonCommands";
import '../css/overlay.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    newCategory: true,
  };
//   handleChange(e) {
//     const { name, value } = e.target;
//     this.setState({ [name]: value });
// }
  onChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  categoryOnChange = e => {
    const tF = e.target.value === "newCategory";
    this.setState({
      [e.target.id]: e.target.value,
      newCategory: tF
    });
  };
  dateChange = date =>{
    try{
      this.setState({
        endDate: date.toString()
      })
    }
    catch{
      this.setState({
        endDate: null
      })
    }
  }

  onSubmit = e => {
    console.log("hello")
    e.preventDefault();
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
      console.log("hello2")
      stateAdd(state);
    } else {
      alert("Plese fillout all fields.");
    }
  };

  render() {
    const { otherGoalCategories, closeGoalOverlay } = this.props;
    const {type, title, snippit} = this.state;
    const categories = otherGoalCategories.map((category, index) => (
      <option key={index} value={category.category}>
        {" "}
        {category.category}
      </option>
    ));

    return (
      <div className="goaloverlay">
        <button onClick={closeGoalOverlay} class="close"></button>
        <form name="form" onSubmit={this.handleSubmit}>
          <div className="input-wrap">
            <input className="titleinput" type="text" name="title" value={this.props.title}
                    onChange={this.onChange} placeholder="Add title"/>
          </div>
          <div className="input-wrap input-wrap-snippit">
            <input className="snippitinput" type="text" name="snippit" value={this.props.title}
              onChange={this.onChange} placeholder="Add snippit"/>
          </div>
          <div className="button-wrap">
            <button className={type === "daily" ? "button-clicked" : "button-not-clicked"}onClick={this.onChange} name="type" value="daily">
              Daily Goal
            </button>
            
            <button className={type === "daily" ? "button-not-clicked" : "button-clicked"} onClick={this.onChange} name="type" value="default">
              Other Goal
            </button>
          </div>
          <span className="span-date">End Date:</span>
           <div className="date-picker-wrapper">
            <div className="date-picker">
              <DatePicker
                selected={this.state.endDate ? new Date(this.state.endDate) : null}
                onChange={date => this.dateChange(date)}
                placeholderText="Click to select a date"
              />
            </div>
          </div>
          {this.state.type !== "daily" &&
          <div className="category">
          <span className="span-date">Category:</span>
              <select name="category"
                id="category"
                onChange={this.categoryOnChange}
              >
                <option value="newCategory"> New Category</option>
                {categories}
              </select>
          </div>}
          {(this.state.type !== "daily" && this.state.newCategory) && 
          <div className="new-category">
          <span className="span-date">New Category:</span>
          <br/>
                <input
                  className="input-wrap-nopadding"
                  name="category"
                  placeholder={"Category"}
                  onChange={this.onChange}
                />
          </div>}
              <button className="overlay-button" onClick={this.onSubmit}>Save</button>
        </form>
      </div>
    );
  }
}

export default Overlay;
