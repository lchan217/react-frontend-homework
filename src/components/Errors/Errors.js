import React from 'react';
import './Errors.style.scss'
const Errors = (props) => {
    const { errors } = props
    return (
        <div className="error-card">
            There was an issue: {errors}. Please reload the page.
        </div>
    );
};

export default Errors;