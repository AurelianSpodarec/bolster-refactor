import React from 'react';

const FrontEndFormHeading = ({ title, subtitle, classes = '' }) => {
    return (
        <div className={`auth-form-heading ${classes}`}>
            <h2>{title}</h2>
            <p>{subtitle}</p>
        </div>
    );
};

export default FrontEndFormHeading;
