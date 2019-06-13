import React from 'react';

import SuperAdminIcon from '_content/images/icons/super-admin.png';
import CompanyAdminIcon from '_content/images/icons/company-admin.png';
import ClientAccessIcon from '_content/images/icons/client-access.png';

const Tabs = ({ tabs, selectedTab, selectTab }) => (
    <div className="tab-container">
        {tabs.map(tab => (
            <button
                key={tab}
                className={
                    tab === selectedTab ? 'active full' : 'inActive full'
                }
                onClick={e => selectTab(e, tab)}
            >
                {tab === 'Super Admin' && (
                    <img src={SuperAdminIcon} alt="Super admin icon" />
                )}
                {tab === 'Admin' && (
                    <img src={CompanyAdminIcon} alt="Admin icon" />
                )}
                {tab === 'Client Access' && (
                    <img src={ClientAccessIcon} alt="Client Invites icon" />
                )}
                <span>
                    {tab === 'Admin'
                        ? 'Super Admin'
                        : tab === 'Client Access'
                        ? 'Client Access'
                        : tab}
                </span>
            </button>
        ))}
    </div>
);

export default Tabs;
