import React from 'react';

const BreakdownTabs = ({ tabs = [], selectedTab = 0, onTabChange = () => {} }) => {
    if (tabs.length > 0 && !tabs.find((_, i) => selectedTab === i)) onTabChange(0);

    return (
        <div className="breakdown-tabs">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    className={`breakdown-tab ${selectedTab === tab.id ? 'selected' : ''}`}
                    onClick={() => onTabChange(tab.id)}
                    disabled={tab.disabled}
                >
                    {tab.title}
                </button>
            ))}
        </div>
    );
};

export default BreakdownTabs;
