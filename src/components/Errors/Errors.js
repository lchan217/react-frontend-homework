import React from 'react';
import './Errors.style.scss'
const Errors = (props) => {
    const { errors } = props
    return (
        <div className="error-card">
            {errors} - Please reload the page.
        </div>
    );
};

export default Errors;