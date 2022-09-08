import React from 'react';

const OurSystemDivider = ({ heading = '', description = '', extraClasses = '' }) => (
    <div className={`page-divider ${extraClasses}`}>
        <h2>{heading}</h2>
        <div className="divider"></div>
        <p>{description}</p>
    </div>
);

export default OurSystemDivider;
