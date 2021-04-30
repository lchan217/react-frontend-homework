import React from 'react';

const Errors = (props) => {
    const { errors } = props
    return (
        <div>
            There was an error: {errors}
        </div>
    );
};

export default Errors;