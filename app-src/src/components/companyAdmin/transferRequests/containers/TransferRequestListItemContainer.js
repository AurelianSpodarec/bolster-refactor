import React, { Component } from 'react';
import { connect } from 'react-redux';

import TransferRequestListItem from '../presentational/TransferRequestListItem';

class TransferRequestListItemContainer extends Component {
    render() {
        const { id, request } = this.props;
        return <TransferRequestListItem request={request} companyID={id} />;
    }

    handleAccept = () => {
        const { id, request } = this.props;
        if (id === request.inviteToCompanyID) {
            // respond to request with { isAccepting: true }
        }
    };

    handleDecline = () => {
        const { id, request } = this.props;
        if (id === request.inviteToCompanyID) {
            // respond to request with { isAccepting: false }
        } else {
            // delete / cancel request
        }
    };
}

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: {
            companySettings: { id }
        }
    }
}) => ({
    id
});

export default connect(mapStateToProps)(TransferRequestListItemContainer);
