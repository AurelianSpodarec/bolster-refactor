import React from 'react';

const Tabs = ({ tabs, selectedTab, selectTab }) => (
    <nav className="nav-extended nav-wrapper">
        <div className="nav-content">
            <ul className="tabs tabs-transparent center">
                {tabs.map(tab => (
                    <li key={tab} className="tab">
                        <a
                            href="#/"
                            className={`${tab === selectedTab ? 'active' : ''}`}
                            onClick={e => selectTab(e, tab)}
                        >
                            {tab}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    </nav>
);

export default Tabs;
