import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import InvoiceDetails from '../presentational/InvoiceDetails';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { DELETE_INVOICE } from 'constants/shared/modalTypes';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

const InvoiceDetailsContainer = ({
    invoice,
    error,
    isFetching,
    showModal,
    hideModal,
    postSuccess,
    history
}) => {
    useEffect(() => {
        if (postSuccess) {
            history.push('/company/invoices');
            hideModal();
        }
    }, [postSuccess]);
    const showDeleteButton = !invoice.isPaid;
    return (
        <InvoiceDetails
            invoice={invoice}
            isFetching={isFetching}
            error={error}
            toggleConfirmDeleteModal={toggleConfirmDeleteModal}
            showDeleteButton={showDeleteButton}
        />
    );

    function toggleConfirmDeleteModal() {
        showModal(DELETE_INVOICE, { invoice, id: invoice.id });
    }
};

const mapStateToProps = (
    {
        companyAdmin: {
            invoicesReducer: { invoices, error, isFetching, postSuccess }
        }
    },
    ownProps
) => ({
    invoice: invoices[ownProps.match.params.id] || {},
    error,
    isFetching,
    postSuccess
});

const mapDispatchToProps = { showModal, hideModal };

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(InvoiceDetailsContainer)
);
