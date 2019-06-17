import React, { useEffect, Component } from 'react';
import { connect } from 'react-redux';

import fetchApprovedCompanies from 'actions/companyAdmin/approvedCompanies/async/fetchApprovedCompanies';
import setTabs from 'actions/shared/generic/tabs/sync/setTabs';
import { APPROVED_COMPANIES_TABS } from 'constants/shared/tabNames';

import ApprovedCompanies from '../presentational/ApprovedCompanies';

class ApprovedCompaniesContainer extends Component {
    render() {
        return <ApprovedCompanies />;
    }
    componentDidMount = () => {
        const { setTabs, fetchApprovedCompanies } = this.props;
        setTabs(
            Object.values(APPROVED_COMPANIES_TABS),
            APPROVED_COMPANIES_TABS.LIST
        );
        fetchApprovedCompanies();
    };
}

const mapDispatchToProps = dispatch => ({
    fetchApprovedCompanies: () => {
        dispatch(fetchApprovedCompanies());
    },
    setTabs: (tabs, selectedTab) => dispatch(setTabs(tabs, selectedTab))
});

export default connect(
    null,
    mapDispatchToProps
)(ApprovedCompaniesContainer);
