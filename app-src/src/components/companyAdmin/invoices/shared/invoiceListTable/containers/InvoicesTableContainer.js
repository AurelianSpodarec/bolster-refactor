import React from 'react';
import { connect } from 'react-redux';
import InvoicesTable from '../presentational/InvoicesTable';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

const InvoicesTableContainer = ({ invoices, error, isFetching, showModal }) => (
    <InvoicesTable
        headers={['Date', 'Order ID', 'Total', 'Type', 'Status', '', 'Action']}
        error={error}
        isFetching={isFetching}
        invoices={invoices}
        showModal={showModal}
    />
);

const mapStateToProps = ({
    companyAdmin: {
        invoicesReducer: { error, isFetching }
    }
}) => ({
    error,
    isFetching
});

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => dispatch(showModal(type, props))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InvoicesTableContainer);
