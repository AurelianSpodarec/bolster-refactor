import React from 'react';

const BlockHeading = ({
    title,
    classes = '',
    leftIcon = false,
    subTitle = '',
    children,
    headerClasses = ''
}) => (
    <div
        className={`block-heading ${classes} size-lg-12 ${
            subTitle ? 'w-subtitle' : ''
        }`}
    >
        {leftIcon && children}
        <h3 className={`heading heading-3 ${headerClasses}`}>{title}</h3>
        {!leftIcon && children}
        {subTitle && <p className="sub-title size-lg-12">{subTitle}</p>}
    </div>
);

export default BlockHeading;
