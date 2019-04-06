import React, { Component } from 'react';
import { connect } from 'react-redux';

import { MENU_TABS } from 'constants/shared/tabNames';
import selectMenuTab from 'actions/shared/generic/tabs/sync/selectMenuTab';
import AdminApp from '../presentational/AdminApp';
import decodeJWT from 'actions/shared/jwt/async/decodeJWT';

class AdminAppContainer extends Component {
    render() {
        return <AdminApp />;
    }

    componentDidMount() {
        const { selectAdminMenuTab, decodeJWT } = this.props;
        selectAdminMenuTab();
        decodeJWT();
    }
}

const mapDispatchToProps = dispatch => ({
    selectAdminMenuTab: () => {
        dispatch(selectMenuTab(MENU_TABS.SUPER_ADMIN));
    },
    decodeJWT: () => {
        dispatch(decodeJWT());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(AdminAppContainer);
