import React, { Component } from 'react';
import { connect } from 'react-redux';

import SingleInvoice from '../presentational/SingleInvoice';
import fetchSingleCompany from 'actions/superAdmin/companies/async/fetchSingleCompany';
import fetchCompanyInvoices from 'actions/superAdmin/invoices/async/fetchCompanyInvoices';
import fetchCompanyInvoiceItems from 'actions/superAdmin/invoices/async/fetchCompanyInvoiceItems';
import fetchPaymentsByInvoice from 'actions/superAdmin/invoices/async/fetchPaymentsByInvoice';

class SingleInvoiceContainer extends Component {
    render() {
        return <SingleInvoice id={this.props.match.params.id} />;
    }
    componentDidMount = () => {
        const { fetchInvoiceData } = this.props;
        fetchInvoiceData();
    };

    componentDidUpdate = prevProps => {
        const { postSuccess, fetchInvoiceData } = this.props;
        if (!prevProps.postSuccess && postSuccess) {
            fetchInvoiceData();
        }
    };
}

const mapStateToProps = ({
    superAdmin: {
        invoicePaymentsReducer: { postSuccess: paymentsPostSuccess },
        invoicesReducer: { postSuccess }
    }
}) => ({
    postSuccess: postSuccess || paymentsPostSuccess
});

const mapDispatchToProps = (
    dispatch,
    {
        match: {
            params: { companyID, id }
        }
    }
) => ({
    fetchInvoiceData: () => {
        return dispatch(fetchSingleCompany(companyID)).then(() => {
            dispatch(fetchCompanyInvoices(companyID));
            dispatch(fetchCompanyInvoiceItems(companyID));
            dispatch(fetchPaymentsByInvoice(id));
        });
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleInvoiceContainer);
