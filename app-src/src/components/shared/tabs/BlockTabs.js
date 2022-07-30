import React from 'react';

const BlockTabs = ({ tabs, selectedTabID, setSelectedTabID }) => (
    <div className="tab-wrapper size-lg-12">
        {tabs.map(tab => (
            <button
                key={tab.id}
                className={`tab-item ${selectedTabID === tab.id ? 'active' : ''}`}
                onClick={() => setSelectedTabID(tab.id)}
            >
                {tab.name}
            </button>
        ))}
    </div>
);

export default BlockTabs;
