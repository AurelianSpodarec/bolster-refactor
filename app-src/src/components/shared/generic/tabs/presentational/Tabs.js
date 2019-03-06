import React from 'react';
import { Link } from 'react-router-dom';

const Tabs = ({ tabs, selectedTab, selectTab }) => (
    <div className="button-container">
        {tabs.map(tab => (
            <Link
                key=""
                to=""
                className={`button ${tab === selectedTab ? 'active' : ''}`}
                onClick={e => selectTab(e, tab)}
            >
                {tab}
            </Link>
        ))}
    </div>
);

export default Tabs;
