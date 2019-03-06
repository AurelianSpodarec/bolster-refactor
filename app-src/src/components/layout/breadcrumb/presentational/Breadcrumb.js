import React from 'react';

const Breadcrumb = ({ classNames = 'size-lg-12', children }) => (
    <div className="content-container size-lg-12">
        <div className="content-area size-lg-12">
            <div className={`breadcrumb ${classNames}`}>
                <h3 className="heading heading-3">
                    Breadcrumb item 1 - item 2
                </h3>
            </div>
            {children}
        </div>
    </div>
);

export default Breadcrumb;
