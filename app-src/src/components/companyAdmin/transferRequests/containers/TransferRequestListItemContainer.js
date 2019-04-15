import React, { Component } from 'react';
import { connect } from 'react-redux';

import TransferRequestListItem from '../presentational/TransferRequestListItem';

class TransferRequestListItemContainer extends Component {
    render() {
        return <TransferRequestListItem request={this.props.request} />;
    }
}

const mapStateToProps = ({
    companyAdmin: {
        transferRequestsReducer,
        companySettingsReducer: {
            companySettings: { id }
        }
    }
}) => ({
    id
});

export default connect(mapStateToProps)(TransferRequestListItemContainer);
