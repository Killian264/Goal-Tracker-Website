import React from 'react'
import PropTypes from "prop-types";

function InputElement(props) {
    const {name, value, onChange, symbol, type, load} = props;
    if(load){
        return (
            <div className="wrap-input100">
                <input className="input100" type={type} name={name} value={value}
                    onChange={onChange} placeholder={name.charAt(0).toUpperCase() + name.slice(1)} />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                    <i className={symbol} aria-hidden="true"></i>
                </span>
            </div>
        )
    }
    return(<React.Fragment></React.Fragment>)
}

export default InputElement

InputElement.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    symbol: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    load: PropTypes.bool.isRequired,
  };