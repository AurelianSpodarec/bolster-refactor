import React from 'react';
import { connect } from 'react-redux';
import { APPROVED_COMPANIES_TABS } from 'constants/shared/tabNames';

import ApprovedCompaniesMapContainer from '../containers/ApprovedCompaniesMapContainer';
import ApprovedCompaniesList from '../presentational/ApprovedCompaniesList';

const ApprovedCompaniesRouteContainer = ({ selectedTab, companies }) => {
    const contentOptions = {
        [APPROVED_COMPANIES_TABS.MAP]: ApprovedCompaniesMapContainer,
        [APPROVED_COMPANIES_TABS.LIST]: ApprovedCompaniesList
    };
    const SpecificContent =
        contentOptions[selectedTab] ||
        contentOptions[APPROVED_COMPANIES_TABS.LIST];

    return <SpecificContent companies={companies} />;
};

const mapStateToProps = ({
    shared: {
        tabsReducer: { selectedTab }
    }
}) => ({
    selectedTab
});

export default connect(mapStateToProps)(ApprovedCompaniesRouteContainer);
