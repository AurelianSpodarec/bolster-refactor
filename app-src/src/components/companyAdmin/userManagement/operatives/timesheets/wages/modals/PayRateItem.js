import React from 'react';

const PayRateItem = ({ payRate, expandedID, setExpandedID }) => {
    const isExpanded = payRate.id === expandedID;

    return (
        <div
            className={`pay-rate-item flex-row justify-between align-center ${
                isExpanded ? 'expanded' : ''
            }`}
            onClick={() => setExpandedID(payRate.id)}
        >
            <p className="pay-rate-item__name">{payRate.name}</p>
            <i className="fa fa-chevron-right" />
        </div>
    );
};

export default PayRateItem;
