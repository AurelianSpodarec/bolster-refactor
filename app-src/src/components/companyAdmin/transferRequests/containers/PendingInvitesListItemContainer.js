import React, { Component } from 'react';
import { connect } from 'react-redux';

import PendingInvitesListItem from '../presentational/PendingInvitesListItem';

class PendingInvitesListItemContainer extends Component {
    render() {
        return (
            <PendingInvitesListItem
                invite={this.props.invite}
                companyID={this.props.companyID}
            />
        );
    }
}

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: {
            companySettings: { id }
        }
    }
}) => ({
    companyID: id
});

export default connect(mapStateToProps)(PendingInvitesListItemContainer);
