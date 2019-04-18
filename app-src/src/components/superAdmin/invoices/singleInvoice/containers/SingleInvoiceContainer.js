import React, { Component } from 'react';
import { connect } from 'react-redux';

import SingleInvoice from '../presentational/SingleInvoice';
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

const mapDispatchToProps = (dispatch, { match: { params } }) => ({
    fetchInvoiceData: () => {
        dispatch(fetchCompanyInvoices(params.companyID));
        dispatch(fetchCompanyInvoiceItems(params.companyID));
    }
});

export default connect(
    null,
    mapDispatchToProps
)(SingleInvoiceContainer);
