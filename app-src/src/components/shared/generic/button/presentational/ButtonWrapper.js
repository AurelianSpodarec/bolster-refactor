import React from 'react';

const ButtonWrapper = ({ children, alignment = 'left', extraClasses = '' }) => {
    const justifyPosition =
        alignment === 'right' ? 'end' : alignment === 'center' ? 'center' : 'start';

    return (
        <div
            className={`button-wrapper flex-row align-center justify-${justifyPosition} ${alignment} ${extraClasses}`}
        >
            {children}
        </div>
    );
};

export default ButtonWrapper;
