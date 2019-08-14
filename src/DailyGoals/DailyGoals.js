import React, { Component } from 'react';

class DailyGoals extends Component {
    state = {
      renderAmount: 0,
    }

    heading = React.createRef();

    componentDidMount() {
      const len = this.heading.current.offsetWidth;
      this.updateState(len);
    }

    updateState = (len) => {
      // size of header is 200px checkmark is 80 px
      len = Math.floor((len - 200) / 80);
      if (len > 8) { len = 8; }
      const { state } = this;
      state.renderAmount = len;
      this.setState({
        state,
      });
    }

    listElement = (goal, i) => (
      <li key={i}>
        <label className="checkbox">
          <input type="checkbox" checked={goal.weeklyChecked[i]} readOnly />
          <span className="checkmark" />
        </label>
      </li>
    )

    positivedateRenders = (goal, len) => {
      const list = [
      ];
      for (let i = 1; i <= len; i++) {
        list.push(this.listElement(goal, (i + 4)));
      }
      return (
        [list]
      );
    }

    negativedateRenders = (goal, len) => {
      const list = [
      ];
      if (this.state.renderAmount === 2) {
        return;
      }
      len /= 2;
      len < 2 ? len = Math.floor(len) : len = Math.ceil(len);
      for (let i = (4 - len); i <= 3; i++) {
        list.push(this.listElement(goal, (i)));
      }
      return (
        [list]
      );
    }

    onClick = (e) => {
      this.props.deleteGoal(e.target.title, 'daily');
    }

    updateCheckMark = (e) => {
      this.props.updateCheckMark(e.target.id);
    }

    render() {
      const { dailyGoals, deleteGoal, updateCheckMark } = this.props;
      const displayCheckBoxes = goal => (
        <ul key={goal.id}>
          {this.negativedateRenders(goal, this.state.renderAmount)}
          <li key={4}>
            <label className="checkbox checkboxmain">
              <input type="checkbox" checked={goal.weeklyChecked[4]} readOnly onClick={() => { updateCheckMark(goal.id); }} />
              <span className="checkmark" />
            </label>
          </li>
          {this.positivedateRenders(goal, Math.floor((this.state.renderAmount / 2)) - 2) }
          <li key={8} className="close-container" onClick={() => { deleteGoal(goal.id, 'daily'); }}>
            <div className="leftright" />
            <div className="rightleft" />
            <label className="close">close</label>
          </li>
        </ul>
      );
      const displayDailyGoals = dailyGoals.map(goal => (
        <div className="onedailygoal" key={goal.id} ref={this.heading}>
          <div className="onedailygoalheading">
            <h4>{goal.title}</h4>
            {goal.snippit}
          </div>
          {displayCheckBoxes(goal)}
        </div>
      ));

      return (
        <div className="onedailygoalcheckmark">
          { displayDailyGoals }
        </div>
      );
    }
}
export default DailyGoals;
