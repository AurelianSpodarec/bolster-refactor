import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchMessages from 'actions/companyAdmin/messages/async/fetchMessages';
import fetchAllSubscriptions from 'actions/companyAdmin/subscriptions/async/fetchAllSubscriptions';

import AllMessages from '../presentational/AllMessages';

class AllMessagesContainer extends Component {
    render() {
        return <AllMessages />;
    }
}

const mapDispatchToProps = dispatch => ({
    fetchPageData: () => {
        dispatch(fetchMessages());
        dispatch(fetchAllSubscriptions());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(AllMessagesContainer);
