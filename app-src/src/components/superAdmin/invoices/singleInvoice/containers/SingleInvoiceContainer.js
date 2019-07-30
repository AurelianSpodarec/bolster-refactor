import React, { Component } from 'react';
import { connect } from 'react-redux';

import SingleInvoice from '../presentational/SingleInvoice';
import fetchSingleCompany from 'actions/superAdmin/companies/async/fetchSingleCompany';
import fetchCompanyInvoices from 'actions/superAdmin/invoices/async/fetchCompanyInvoices';
import fetchCompanyInvoiceItems from 'actions/superAdmin/invoices/async/fetchCompanyInvoiceItems';
import fetchPaymentsByInvoice from 'actions/superAdmin/invoices/async/fetchPaymentsByInvoice';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { ADMIN_DELETE_INVOICE } from 'constants/shared/modalTypes';

class SingleInvoiceContainer extends Component {
    render() {
        return (
            <SingleInvoice
                id={this.props.match.params.id}
                toggleDeleteInvoiceModal={this.toggleDeleteInvoiceModal}
            />
        );
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

    toggleDeleteInvoiceModal = () => {
        const {
            showModal,
            match: {
                params: { id }
            }
        } = this.props;
        showModal(ADMIN_DELETE_INVOICE, { id });
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
    },
    showModal: (modalType, props) => dispatch(showModal(modalType, props)),
    hideModal: () => dispatch(hideModal())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleInvoiceContainer);
