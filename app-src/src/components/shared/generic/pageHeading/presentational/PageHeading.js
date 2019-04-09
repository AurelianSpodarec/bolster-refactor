import React from 'react';

const PageHeading = ({ children, title }) => (
    <div className="size-lg-12">
        <div className="content-container size-lg-12">
            <h1 className="heading heading-1 size-lg-6">{title}</h1>
            {children}
        </div>
    </div>
);

export default PageHeading;
