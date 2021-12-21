import React from 'react';

const options = [
    { name: 'System Messages', value: 0 },
    { name: 'Company Alerts', value: 1 },
    { name: 'Operative Alerts', value: 2 },
    { name: 'Drawing Expiry', value: 3 },
];

const MessageCentreTabs = ({ selectedTab, setSelectedTab }) => {
    return (
        <div className="tab-wrapper size-lg-12">
            {options.map((option, i) => (
                <button
                    key={i}
                    className={`tab-item ${selectedTab === option.value ? 'active' : ''}`}
                    onClick={() => setSelectedTab(option.value)}
                >
                    {option.name}
                </button>
            ))}
        </div>
    );
};

export default MessageCentreTabs;
