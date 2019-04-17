import React, { Component } from 'react';
import PendingInvitesTable from '../presentational/PendingInvitesTable';

export default class PendingInvitesTableContainer extends Component {
    render() {
        const headers = ['Date', 'Site name/type', 'From', 'To', 'Actions'];
        return <PendingInvitesTable headers={headers} />;
    }
}
