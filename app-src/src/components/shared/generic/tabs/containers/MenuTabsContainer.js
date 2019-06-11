import React, { Component } from 'react';
import { connect } from 'react-redux';

import selectMenuTab from 'actions/shared/generic/tabs/sync/selectMenuTab';
import setMenuTab from 'actions/shared/generic/tabs/sync/setMenuTabs';

import Tabs from '../presentational/Tabs';

class MenuTabsContainer extends Component {
    render() {
        const {
            menuTabs,
            selectedMenuTab,
            isSuperAdmin,
            isCompanyAdmin,
            isClientAccess
        } = this.props;

        let filteredTabs = menuTabs;

        if (!isSuperAdmin)
            filteredTabs = menuTabs.filter(tab => tab !== 'Super Admin');
        if (!isCompanyAdmin)
            filteredTabs = menuTabs.filter(tab => tab !== 'Company Admin');
        if (!isClientAccess)
            filteredTabs = menuTabs.filter(tab => tab !== 'Client Access');

        return (
            <Tabs
                tabs={filteredTabs}
                selectedTab={selectedMenuTab}
                selectTab={(e, tab) => {
                    e.preventDefault();
                    this.props.selectMenuTab(tab);
                }}
                isSuperAdmin={isSuperAdmin}
                isCompanyAdmin={isCompanyAdmin}
                isClientAccess={isClientAccess}
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

const mapStateToProps = ({
    shared: {
        tabsReducer,
        decodeJWTReducer: { jwtData }
    }
}) => ({
    menuTabs: tabsReducer.menuTabs,
    selectedMenuTab: tabsReducer.selectedMenuTab,
    isSuperAdmin: jwtData.isSuperAdmin,
    isCompanyAdmin: !!jwtData.companyID,
    isClientAccess: jwtData.isClientAccess
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuTabsContainer);
