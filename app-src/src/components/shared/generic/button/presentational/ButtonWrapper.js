import React from 'react';

const ButtonWrapper = ({ children, alignment = 'left' }) => {
    const justifyPosition =
        alignment === 'right' ? 'end' : alignment === 'center' ? 'center' : 'start';

    return (
        <div className={`button-wrapper flex-row justify-${justifyPosition} ${alignment}`}>
            {children}
        </div>
    );
};

export default ButtonWrapper;
