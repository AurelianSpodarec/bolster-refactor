import React, { Component } from 'react';
import { connect } from 'react-redux';

import withShowLayout from 'components/layout/misc/hocs/withShowLayout';
import MenusWrapper from '../presentational/MenusWrapper';

class MenuContianer extends Component {
    state = {
        showSuperAdminMenu: false
    };

    render() {
        const { showLoggedInLayout, messageCount } = this.props;
        if (!showLoggedInLayout) return null;
        return <MenusWrapper />;
    }
}
const mapStateToProps = ({ messagesReducer }) => ({
    messageCount: Object.values(messagesReducer.messages).length
});

export default withShowLayout(
    connect(
        mapStateToProps,
        null
    )(MenuContianer)
);
