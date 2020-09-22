import React from 'react';

const FrontEndFormHeading = ({ title, subtitle }) => {
    return (
        <div className="auth-form-heading">
            <h2>{title}</h2>
            <p>{subtitle}</p>
        </div>
    );
};

export default FrontEndFormHeading;
