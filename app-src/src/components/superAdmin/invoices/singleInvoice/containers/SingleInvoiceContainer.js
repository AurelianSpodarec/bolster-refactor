import React, { Component } from 'react';
import { connect } from 'react-redux';

import SingleInvoice from '../presentational/SingleInvoice';
import fetchSingleCompany from 'actions/superAdmin/companies/async/fetchSingleCompany';
import fetchCompanyInvoices from 'actions/superAdmin/invoices/async/fetchCompanyInvoices';
import fetchCompanyInvoiceItems from 'actions/superAdmin/invoices/async/fetchCompanyInvoiceItems';

class SingleInvoiceContainer extends Component {
    render() {
        return <SingleInvoice id={this.props.match.params.id} />;
    }
    componentDidMount = () => {
        const { fetchInvoiceData } = this.props;
        fetchInvoiceData();
    };
}

const mapDispatchToProps = (
    dispatch,
    {
        match: {
            params: { companyID }
        }
    }
) => ({
    fetchInvoiceData: () => {
        dispatch(fetchCompanyInvoices(companyID));
        dispatch(fetchCompanyInvoiceItems(companyID));
        dispatch(fetchSingleCompany(companyID));
    }
});

export default connect(
    null,
    mapDispatchToProps
)(SingleInvoiceContainer);
