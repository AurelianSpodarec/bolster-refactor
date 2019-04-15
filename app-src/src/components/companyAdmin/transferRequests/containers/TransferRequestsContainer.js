import React, { Component } from 'react';
import { connect } from 'react-redux';

import TransferRequests from '../presentational/TransferRequests';

class TransferRequestsContainer extends Component {
    render() {
        return <TransferRequests />;
    }
}

export default connect()(TransferRequestsContainer);
