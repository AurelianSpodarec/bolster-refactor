import React, { Component } from 'react';
import { connect } from 'react-redux';

import { MENU_TABS } from 'constants/shared/tabNames';
import selectMenuTab from 'actions/shared/generic/tabs/sync/selectMenuTab';
import AdminApp from '../presentational/AdminApp';

class AdminAppContainer extends Component {
    render() {
        return <AdminApp />;
    }

    componentDidMount() {
        const { selectAdminMenuTab } = this.props;
        selectAdminMenuTab();
    }
}

const mapDispatchToProps = dispatch => ({
    selectAdminMenuTab: () => {
        dispatch(selectMenuTab(MENU_TABS.SUPER_ADMIN));
    }
});

export default connect(
    null,
    mapDispatchToProps
)(AdminAppContainer);
