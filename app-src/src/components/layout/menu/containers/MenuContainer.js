import React, { Component } from 'react';
import { connect } from 'react-redux';

import withShowLayout from 'components/layout/misc/hocs/withShowLayout';
import Menu from '../presentational/Menu';

class MenuContianer extends Component {
    render() {
        const { showLoggedInLayout, messageCount } = this.props;
        if (!showLoggedInLayout) return null;
        return <Menu messageCount={messageCount} />;
    }
}

export default withShowLayout(
    connect(({ messagesReducers }) => ({
        messageCount: messagesReducers.messages.messages.length
    }))(MenuContianer)
);
