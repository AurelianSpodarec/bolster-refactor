import React from 'react';

const BreakdownTabs = ({ tabs = [], selectedTab = 0, onTabChange = () => {} }) => {
    return (
        <div className="breakdown-tabs">
            {tabs.map((tab, i) => (
                <button
                    key={i}
                    className={`breakdown-tab ${selectedTab === i ? 'selected' : ''}`}
                    onClick={() => onTabChange(i)}
                >
                    {tab.title}
                </button>
            ))}
        </div>
    );
};

export default BreakdownTabs;
