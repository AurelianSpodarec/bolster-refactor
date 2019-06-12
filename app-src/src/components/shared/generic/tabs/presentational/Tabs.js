import React from 'react';

import SuperAdminIcon from '_content/images/icons/super-admin.png';
import CompanyAdminIcon from '_content/images/icons/company-admin.png';
import ClientAccessIcon from '_content/images/icons/client-access.png';

const Tabs = ({ tabs, selectedTab, selectTab }) => {
    let isButtonFull = false;
    let extraClass = '';

    if (tabs.length > 2) isButtonFull = true;
    if (isButtonFull) extraClass = 'full';

    return (
        <div className="tab-container">
            {tabs.map(tab => (
                <button
                    key={tab}
                    className={
                        tab === selectedTab
                            ? `active ${extraClass}`
                            : `inActive ${extraClass}`
                    }
                    onClick={e => selectTab(e, tab)}
                >
                    {tab === 'Super Admin' && (
                        <img src={SuperAdminIcon} alt="Super admin icon" />
                    )}
                    {tab === 'Company Admin' && (
                        <img src={CompanyAdminIcon} alt="Company admin icon" />
                    )}
                    {tab === 'Client Access' && (
                        <img src={ClientAccessIcon} alt="Client Invites icon" />
                    )}
                    <span>{tab}</span>
                </button>
            ))}
        </div>
    );
};

export default Tabs;
