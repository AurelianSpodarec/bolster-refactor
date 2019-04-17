import React, { Component } from 'react';
import { connect } from 'react-redux';

import PendingInvitesTable from '../presentational/PendingInvitesTable';
import fetchPendingInvites from 'actions/companyAdmin/pendingInvites/fetchPendingInvites';
import fetchOutgoingInvites from 'actions/companyAdmin/pendingInvites/fetchOutgoingInvites';

class PendingInvitesTableContainer extends Component {
    render() {
        const headers = ['Date', 'Site name/type', 'From', 'To', 'Actions'];
        return <PendingInvitesTable headers={headers} />;
    }
}

const mapStateToProps = ({
    companyAdmin: {
        pendingInvitesReducer: {
            pendingInvites,
            outgoingInvites,
            isFetching,
            error
        }
    }
}) => ({
    pendingInvites,
    outgoingInvites,
    isFetching,
    error
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
