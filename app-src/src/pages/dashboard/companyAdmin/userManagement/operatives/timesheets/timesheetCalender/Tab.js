import React from 'react';

const Tab = ({ icon, children }) => {
    return (
        <div className="tab dark">
            {icon}
            <p>{children}</p>
        </div>
    );
};

export default Tab;
