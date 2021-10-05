import React from 'react';

const BreakdownTextBox = ({ title, children }) => {
    return (
        <div className="breakdown-textbox">
            {title && <p className="title">{title}</p>}
            <p className="content">{children}</p>
        </div>
    );
};

export default BreakdownTextBox;
