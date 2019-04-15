import React, { Component } from 'react';
import { connect } from 'react-redux';
import TransferRequestsTable from '../presentational/TransferRequestsTable';

class TransferRequestsTableContainer extends Component {
    render() {
        const {
            incomingTransferRequests,
            outgoingTransferRequests,
            isFetching,
            error
        } = this.props;
        const headers = ['Date', 'Site name/type', 'From', 'To', 'Actions'];
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
}

const mapStateToProps = ({
    companyAdmin: {
        transferRequestsReducer: {
            incomingTransferRequests,
            outgoingTransferRequests,
            isFetching,
            error
        }
    }
}) => ({
    incomingTransferRequests: Object.values(incomingTransferRequests),
    outgoingTransferRequests: Object.values(outgoingTransferRequests),
    isFetching,
    error
});

export default connect(mapStateToProps)(TransferRequestsTableContainer);
