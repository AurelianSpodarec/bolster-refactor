import React from 'react';
import { connect } from 'react-redux';
import { APPROVED_COMPANIES_TABS } from 'constants/shared/tabNames';

import ApprovedCompaniesMapContainer from '../containers/ApprovedCompaniesMapContainer';
import ApprovedCompaniesList from '../presentational/ApprovedCompaniesList';

const ApprovedCompaniesRouteContainer = ({ selectedTab }) => {
    const contentOptions = {
        [APPROVED_COMPANIES_TABS.LIST]: ApprovedCompaniesList,
        [APPROVED_COMPANIES_TABS.MAP]: ApprovedCompaniesMapContainer
    };
    const SpecificContent =
        contentOptions[selectedTab] ||
        contentOptions[APPROVED_COMPANIES_TABS.LIST];

    return <SpecificContent />;
};

const mapStateToProps = ({
    shared: {
        tabsReducer: { selectedTab }
    }
}) => ({
    selectedTab
});

export default connect(mapStateToProps)(ApprovedCompaniesRouteContainer);
