import React from 'react';

const Tabs = ({ tabs, selectedTab, selectTab }) => (
    <div className="tab-container">
        {tabs.map(tab => (
            <button
                key={tab}
                className={tab === selectedTab ? 'active' : ''}
                onClick={e => selectTab(e, tab)}
            >
                {tab}
            </button>
        ))}
    </div>
);

export default Tabs;
