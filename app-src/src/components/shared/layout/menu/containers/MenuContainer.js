import React, { Component } from 'react';
import { connect } from 'react-redux';

import withShowLayout from 'components/layout/misc/hocs/withShowLayout';
import MenusWrapper from '../presentational/MenusWrapper';

class MenuContainer extends Component {
    state = {
        showSuperAdminMenu: false
    };

    render() {
        const { showLoggedInLayout, showSuperAdmin } = this.props;

        if (!showLoggedInLayout) return null;

        return <MenusWrapper showSuperAdmin={showSuperAdmin} />;
    }
}
const mapStateToProps = ({ messagesReducer, decodeJWTReducer }) => ({
    messageCount: Object.values(messagesReducer.messages).length,
    showSuperAdmin: decodeJWTReducer.jwtData.IsSuperAdmin
});

export default withShowLayout(
    connect(
        mapStateToProps,
        null
    )(MenuContainer)
);
