import React, { Component } from 'react';
import { connect } from 'react-redux';

import selectMenuTab from 'actions/shared/generic/tabs/sync/selectMenuTab';
import setMenuTab from 'actions/shared/generic/tabs/sync/setMenuTabs';

import Tabs from '../presentational/Tabs';

class MenuTabsContainer extends Component {
    render() {
        const { dispatch, menuTabs, selectedMenuTab } = this.props;
        return (
            <Tabs
                tabs={menuTabs}
                selectedTab={selectedMenuTab}
                selectTab={(e, tab) => {
                    e.preventDefault();
                    dispatch(selectMenuTab(tab));
                }}
            />
        );
    }

    // componentDidMount = () => {
    //     const { isSuperadmin, setMenuTab } = this.props;

    //     if (isSuperadmin) {
    //         setMenuTab('Super Admin');
    //     } else {
    //         setMenuTab('Company Admin');
    //     }
    // };
}

const mapDispatchToProps = dispatch => ({
    selectMenuTab: tab => {
        dispatch(selectMenuTab(tab));
    },
    setMenuTab: tab => {
        dispatch(setMenuTab(tab));
    }
});

const mapStateToProps = ({ shared: { tabsReducer, decodeJWTReducer } }) => ({
    menuTabs: tabsReducer.menuTabs,
    selectedMenuTab: tabsReducer.selectedMenuTab,
    isSuperadmin: decodeJWTReducer.jwtData.IsSuperAdmin
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuTabsContainer);
