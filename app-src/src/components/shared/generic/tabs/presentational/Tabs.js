import React from 'react';

import SuperAdminIcon from '_content/images/icons/nav/SuperAdmin.svg';
import CompanyAdminIcon from '_content/images/icons/nav/CompanyAdmin.svg';
import ClientAccessIcon from '_content/images/icons/nav/ClientAccess.svg';
import TooltipContainer from '../../tooltip/containers/TooltipContainer';

const Tabs = ({ tabs, selectedTab, selectTab, classes = '', isAdminPlus, isBolsterPlus }) => {
    return (
        <div className={`tab-container ${classes}`}>
            {tabs.map(tab => {
                const restrictedTabs = ['costing', 'estimating', 'wages'];
                const shouldRestrict =
                    isBolsterPlus && !isAdminPlus && restrictedTabs.includes(tab.toLowerCase());
                return (
                    <button
                        key={tab}
                        className={tab === selectedTab ? 'active full' : 'inActive full'}
                        onClick={e => selectTab(e, tab)}
                        disabled={shouldRestrict}
                    >
                        <TooltipContainer
                            key={tab}
                            shouldOutput={shouldRestrict}
                            side="right"
                            cl
                            text={`${tab} is available to Admin Plus users only`}
                            extraContainerClasses="no-margin"
                        >
                            {tab === 'Super Admin' && (
                                <img src={SuperAdminIcon} alt="Super admin icon" />
                            )}
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
                        </TooltipContainer>
                    </button>
                );
            })}
        </div>
    );
};

export default Tabs;
