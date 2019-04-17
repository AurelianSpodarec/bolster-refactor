import React, { Component } from 'react';
import { connect } from 'react-redux';

import PendingInvitesTable from '../presentational/PendingInvitesTable';
import fetchPendingInvites from 'actions/companyAdmin/pendingInvites/fetchPendingInvites';
import fetchOutgoingInvites from 'actions/companyAdmin/pendingInvites/fetchOutgoingInvites';
import { ERROR_MODAL } from 'constants/shared/modalTypes';

class PendingInvitesTableContainer extends Component {
    render() {
        const {
            pendingInvites,
            outgoingInvites,
            error,
            isFetching
        } = this.props;
        const headers = ['Date', 'Site name', 'From', 'To', 'Actions'];
        return (
            <PendingInvitesTable
                headers={headers}
                pendingInvites={pendingInvites}
                outgoingInvites={outgoingInvites}
                isFetching={isFetching}
                error={error}
            />
        );
    }

    componentDidUpdate = prevProps => {
        const { fetchInvites, postSuccess, error, showModal } = this.props;

        if (postSuccess && !prevProps.postSuccess) fetchInvites();

        if (error && !prevProps) showModal(ERROR_MODAL);
    };
}

const mapStateToProps = ({
    companyAdmin: {
        pendingInvitesReducer: {
            pendingInvites,
            outgoingInvites,
            postSuccess,
            isFetching,
            error
        }
    }
}) => ({
    pendingInvites: Object.values(pendingInvites),
    outgoingInvites: Object.values(outgoingInvites),
    isFetching,
    error,
    postSuccess
});

const mapDispatchToProps = dispatch => ({
    fetchInvites: () => {
        dispatch(fetchPendingInvites());
        dispatch(fetchOutgoingInvites());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PendingInvitesTableContainer);
