import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchTemplates from 'actions/superAdmin/templateBuilder/async/fetchTemplates';
import fetchSingleCompany from 'actions/superAdmin/companies/async/fetchSingleCompany';
import SingleCompany from '../presentational/SingleCompany';
import fetchCompanyInvoices from 'actions/superAdmin/invoices/async/fetchCompanyInvoices';
import fetchCompanyUsers from 'actions/superAdmin/users/async/fetchCompanyUsers';

class SingleCompanyContainer extends Component {
    render() {
        return <SingleCompany />;
    }

    componentDidMount = () => {
        const { companyID, fetchPageData } = this.props;
        fetchPageData(companyID);
    };
}

const mapStateToProps = (_, { match }) => ({
    companyID: match.params.id
});

const mapDispatchToProps = dispatch => ({
    fetchPageData: id => {
        dispatch(fetchSingleCompany(id));
        dispatch(fetchTemplates());
        dispatch(fetchCompanyInvoices(id));
        dispatch(fetchCompanyUsers(id));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleCompanyContainer);
