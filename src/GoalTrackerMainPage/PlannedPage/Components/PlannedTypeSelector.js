import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {shapes} from "../../../helpers/shapes";

class PlannedTypeSelector extends Component {
  static propTypes = {
    otherGoalsCategories: shapes.otherGoalsCategoryShape.isRequired,
    updateCategoryRender: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    const { otherGoalsCategories } = this.props;
    if (otherGoalsCategories !== nextProps.otherGoalsCategories) {
      return true;
    }
    return false;
  }

  render() {
    const { otherGoalsCategories, updateCategoryRender } = this.props;

    const renderSelector = otherGoalsCategories.map((categories, index) => {
      if(categories.unCompleted === 0) return;
      return (
        <label key={categories.id} className="radiobtn" id="renderDaily">
          <span>{categories.category}</span>
            :
          {' '}
          {categories.unCompleted}
          <input type="checkbox" onClick={() => updateCategoryRender(index)} name="category" defaultChecked />
          <span id="renderDaily" className="radiocheckmark" />
        </label>
      )
    });

    return (
        <div className="goaltypeselector">
          <h3>Catagories</h3>
          {renderSelector}
        </div>
    );
  }
}
export default PlannedTypeSelector;
