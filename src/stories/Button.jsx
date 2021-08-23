import React from 'react'
import PropTypes from 'prop-types';
import './button.css'


export const Button = ({label, primary, size, ...props}) => {
    const mode = primary ? 'button--primary' : 'button--secondary';
    return (
        <button 
            type="submit"
            className={[ 'button', `button--${size}`, `${mode}`].join(' ')}
            {...props}
        >
        {label}
        </button>
    )
}

Button.propTypes = {
    primary : PropTypes.bool,
    label: PropTypes.string.isRequired,
}

Button.defaultProps = {
    primary: false,
}
