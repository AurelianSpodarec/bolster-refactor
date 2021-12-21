import React from 'react';

const BreakdownColumns = ({ left, right, className = '' }) => {
    return (
        <div className={`breakdown-columns ${className}`}>
            <div className="breakdown-column left">{left}</div>
            <div className="breakdown-column right">{right}</div>
        </div>
    );
};

export default BreakdownColumns;
