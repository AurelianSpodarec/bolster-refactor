import React from 'react';

import SuperAdminIcon from '_content/images/icons/nav/SuperAdmin.svg';
import CompanyAdminIcon from '_content/images/icons/nav/CompanyAdmin.svg';
import ClientAccessIcon from '_content/images/icons/nav/ClientAccess.svg';

const Tabs = ({ tabs, selectedTab, selectTab, classes = '' }) => {
    return (
        <div className={`tab-container ${classes}`}>
            {tabs.map(tab => (
                <button
                    key={tab}
                    className={tab === selectedTab ? 'active full' : 'inActive full'}
                    onClick={e => selectTab(e, tab)}
                >
                    {tab === 'Super Admin' && <img src={SuperAdminIcon} alt="Super admin icon" />}
                    {tab === 'Admin' && <img src={CompanyAdminIcon} alt="Admin icon" />}
                    {tab === 'Client Access' && (
                        <img src={ClientAccessIcon} alt="Client Invites icon" />
                    )}
                    <span>
                        {tab === 'Admin'
                            ? 'Company Admin'
                            : tab === 'Client Access'
                            ? 'Client Access'
                            : tab}
                    </span>
                </button>
            ))}
        </div>
    );
};

export default Tabs;
