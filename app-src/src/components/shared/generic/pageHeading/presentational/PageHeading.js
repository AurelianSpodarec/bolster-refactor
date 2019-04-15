import React from 'react';

const PageHeading = ({ children, title, leftChildren = false }) => (
    <div
        className={`page-heading ${leftChildren && 'left-controls'} size-lg-12`}
    >
        <div className="content-container size-lg-12">
            {leftChildren && children}
            <h1 className="heading heading-1 size-lg-12">{title}</h1>
            {!leftChildren && children}
        </div>
    </div>
);

export default PageHeading;
