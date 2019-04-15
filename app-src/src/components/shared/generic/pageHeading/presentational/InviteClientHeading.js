import React from 'react';

const InviteCompanyAccessHeadering = ({ children, title }) => (
    <div className="page-heading left-controls size-lg-12">
        <div className="content-container size-lg-12">
            {children}
            <h1 className="heading heading-1 size-lg-12">{title}</h1>
        </div>
    </div>
);

export default InviteCompanyAccessHeadering;
