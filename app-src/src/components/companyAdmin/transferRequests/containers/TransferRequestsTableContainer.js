import React, { Component } from 'react';
import { connect } from 'react-redux';
import TransferRequestsTable from '../presentational/TransferRequestsTable';
import fetchIncomingTransferRequests from 'actions/companyAdmin/transferRequests/async/fetchIncomingTransferRequests';
import fetchOutgoingTransferRequests from 'actions/companyAdmin/transferRequests/async/fetchOutgoingTransferRequests';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { ERROR_MODAL } from 'constants/shared/modalTypes';

class TransferRequestsTableContainer extends Component {
    render() {
        const {
            incomingTransferRequests,
            outgoingTransferRequests,
            isFetching,
            error
        } = this.props;
        const headers = ['Date', 'Site name', 'From', 'To', 'Action(s)'];
        return (
            <TransferRequestsTable
                headers={headers}
                incomingTransferRequests={incomingTransferRequests}
                outgoingTransferRequests={outgoingTransferRequests}
                isFetching={isFetching}
                error={error}
            />
        );
    }

    componentDidUpdate = prevProps => {
        const {
            fetchTransferRequests,
            postSuccess,
            error,
            showModal
        } = this.props;
        if (postSuccess && !prevProps.postSuccess) {
            fetchTransferRequests();
        }
        if (error && !prevProps.error) {
            showModal(ERROR_MODAL);
        }
    };
}

const mapStateToProps = ({
    companyAdmin: {
        transferRequestsReducer: {
            incomingTransferRequests,
            outgoingTransferRequests,
            isFetching,
            error,
            postSuccess
        }
    }
}) => ({
    incomingTransferRequests: Object.values(incomingTransferRequests),
    outgoingTransferRequests: Object.values(outgoingTransferRequests),
    isFetching,
    error,
    postSuccess
});

const mapDispatchToProps = dispatch => ({
    fetchTransferRequests: () => {
        dispatch(fetchIncomingTransferRequests());
        dispatch(fetchOutgoingTransferRequests());
    },
    showModal: (type, props) => dispatch(showModal(type, props))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TransferRequestsTableContainer);
