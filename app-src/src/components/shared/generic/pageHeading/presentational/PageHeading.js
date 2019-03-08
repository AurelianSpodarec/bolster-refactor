import React from 'react';

const PageHeading = ({ children, title }) => (
    <div className="content-container">
        <h1 className="heading heading-1">{title}</h1>
        {children}
    </div>
);

export default PageHeading;
