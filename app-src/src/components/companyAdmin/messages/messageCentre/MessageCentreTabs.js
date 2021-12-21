import React from 'react';

const tabs = [
    { name: 'System Messages', value: 0 },
    { name: 'Company Alerts', value: 1 },
    { name: 'Operative Alerts', value: 2 },
    { name: 'Drawing Expiry', value: 3 },
];

const MessageCentreTabs = ({ selectedTab, setSelectedTab }) => {
    return (
        <div className="tab-wrapper size-lg-12">
            {tabs.map((tab, i) => (
                <button
                    key={i}
                    className={`tab-item ${selectedTab === tab.value ? 'active' : ''}`}
                    onClick={() => setSelectedTab(tab.value)}
                >
                    {tab.name}
                </button>
            ))}
        </div>
    );
};

export default MessageCentreTabs;
