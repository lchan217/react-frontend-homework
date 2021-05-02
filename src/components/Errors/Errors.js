import React from 'react';

const Errors = (props) => {
    const { errors } = props
    return (
        <div>
            There was an issue: {errors}. Please try again.
        </div>
    );
};

export default Errors;