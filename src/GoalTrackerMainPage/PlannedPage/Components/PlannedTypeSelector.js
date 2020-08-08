import React, { Component } from "react";
import PropTypes from "prop-types";

import { shapes } from "../../../helpers/shapes";

class PlannedTypeSelector extends Component {
    static propTypes = {
        otherGoalsCategories: PropTypes.arrayOf(shapes.otherGoalsCategoryShape)
            .isRequired,
        updateCategoryRender: PropTypes.func.isRequired,
    };

    shouldComponentUpdate(nextProps) {
        const { otherGoalsCategories } = this.props;
        if (otherGoalsCategories !== nextProps.otherGoalsCategories) {
            return true;
        }
        return false;
    }

    sortCheckbox(data, index) {
        const { id, category, unCompleted, render } = data;
        const { updateCategoryRender } = this.props;

        if (unCompleted === 0) return null;
        return (
            <div className="form-check form-check-inline py-2" style={{fontFamily: "Poppins-Medium", fontSize: "15px"}} key={id}>
                <input
                    className="form-check-input"
                    style={style.minWidth}
                    type="checkbox"
                    id={id}
                    defaultChecked={render}
                    onClick={() => updateCategoryRender(index)}
                />
                <label className="form-check-label no-select" htmlFor={id}>
                    {category} : {unCompleted}
                </label>
            </div>
        );
    }

    render() {
        const { otherGoalsCategories } = this.props;

        const categoryLabels = otherGoalsCategories.map((category, index) => {
            return this.sortCheckbox(category, index);
        });

        return (
            <div className="type-selector d-flex flex-column px-3 pt-2 no-select pb-3">
                <h2>Category</h2>
                <hr style={style.divider} />
                <div className="d-flex flex-column pl-2">{categoryLabels}</div>
            </div>
        );
    }
}

const style = {
    divider: {
        margin: "0",
        marginBottom: "2px",
        marginTop: "-4px",
        border: "0",
        borderTop: "1px solid rgba(0, 0, 0, 0.1)",
    },
    minWidth: {
        minWidth: "23px",
        minHeight: "23px",
    },
};
export default PlannedTypeSelector;
