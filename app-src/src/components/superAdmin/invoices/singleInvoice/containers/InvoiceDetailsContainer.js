import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import InvoiceDetails from '../presentational/InvoiceDetails';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { ADD_INVOICE_COMMENT, ERROR_MODAL } from 'constants/shared/modalTypes';

const InvoiceDetailsContainer = ({
    invoice,
    error,
    isFetching,
    company,
    showModal,
    postSuccess,
    hideModal,
    isCommenting,
    commentingError,
    commentingSuccess,
}) => {
    useEffect(() => {
        if (postSuccess) {
            hideModal();
        }
    }, [postSuccess]);

    return (
        <InvoiceDetails
            invoice={invoice}
            error={error}
            isFetching={isFetching}
            companyName={company.name || null}
            showModal={showModal}
            handleShowModal={handleShowModal}
        />
    );

    function handleShowModal(id, comment) {
        showModal(ADD_INVOICE_COMMENT, { id, comment });
    }
};

const mapStateToProps = (
    {
        superAdmin: {
            invoicesReducer: {
                invoices,
                error,
                isFetching,
                postSuccess,
                isCommenting,
                commentingError,
                commentingSuccess,
            },
            companiesReducer: { companies },
        },
    },
    { match: { params } },
) => {
    const invoice = invoices[params.id] || {};
    return {
        company: companies[invoice.companyID] || {},
        invoice: invoices[params.id] || {},
        error,
        isFetching,
        postSuccess,
        isCommenting,
        commentingError,
        commentingSuccess,
    };
};

const mapDispatchToProps = { showModal, hideModal };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InvoiceDetailsContainer));
