import React from 'react';
import { connect } from 'react-redux';

import selectTab from 'actions/shared/generic/tabs/sync/selectTab';

import Tabs from '../presentational/Tabs';
import { COMPANY_USER_ROLE_TYPES } from '../../../../../constants/companyAdmin/enums';

const TabsContainer = ({ dispatch, tabs, selectedTab, classes, companyUserType }) => {
    const isAdminPlus = companyUserType > COMPANY_USER_ROLE_TYPES.ADMIN;
    const filteredTabs = tabs.filter(tab =>
        !isAdminPlus
            ? !tab.toLowerCase().includes('costing') && !tab.toLowerCase().includes('estimating')
            : true,
    );

    return (
        <Tabs
            tabs={filteredTabs}
            selectedTab={selectedTab}
            selectTab={(e, tab) => {
                e.preventDefault();
                dispatch(selectTab(tab));
            }}
            classes={classes}
        />
    );
};

const mapStateToProps = ({
    shared: {
        tabsReducer: { selectedTab, tabs },
        decodeJWTReducer: {
            jwtData: { companyUserType },
        },
    },
}) => ({ tabs, selectedTab, companyUserType });

export default connect(mapStateToProps)(TabsContainer);
