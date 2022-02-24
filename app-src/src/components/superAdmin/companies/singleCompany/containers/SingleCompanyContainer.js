import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchCompanyTemplates from 'actions/superAdmin/companies/async/fetchCompanyTemplates';
import fetchSingleCompany from 'actions/superAdmin/companies/async/fetchSingleCompany';
import SingleCompany from '../presentational/SingleCompany';
import fetchCompanySubscription from 'actions/superAdmin/companies/async/fetchCompanySubscription';
import fetchCompanyUsers from 'actions/superAdmin/users/async/fetchCompanyUsers';
import fetchAllServices from 'actions/superAdmin/services/async/fetchAllServices';
import fetchAllCompanies from 'actions/superAdmin/companies/async/fetchAllCompanies';

class SingleCompanyContainer extends Component {
    render = () => <SingleCompany />;

    componentDidMount = () => {
        const { companyID, fetchPageData } = this.props;
        fetchPageData(companyID);
    };
}

const mapStateToProps = (
    {
        superAdmin: {
            companiesReducer: { isFetching, isPosting, postSuccess },
        },
    },
    { match },
) => ({
    companyID: match.params.id,
    isFetching,
    isPosting,
    postSuccess,
});

const mapDispatchToProps = dispatch => ({
    fetchPageData: id => {
        dispatch(fetchSingleCompany(id));
        dispatch(fetchAllCompanies());
        dispatch(fetchCompanyTemplates(id));
        dispatch(fetchCompanySubscription(id));
        dispatch(fetchCompanyUsers(id, 1));
        dispatch(fetchAllServices());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleCompanyContainer);
