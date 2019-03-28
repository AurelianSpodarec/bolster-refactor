import React from 'react';

import SuperAdminIcon from '_content/images/icons/super-admin.png';
import CompanyAdminIcon from '_content/images/icons/company-admin.png';

const Tabs = ({ tabs, selectedTab, selectTab }) => (
    <div className="tab-container">
        {tabs.map(tab => (
            <button
                key={tab}
                className={tab === selectedTab ? 'active' : ''}
                onClick={e => selectTab(e, tab)}
            >
                {tab === 'Super Admin' ? (
                    <img src={SuperAdminIcon} />
                ) : (
                    <img src={CompanyAdminIcon} />
                )}
                <span>{tab}</span>
            </button>
        ))}
    </div>
);

export default Tabs;
