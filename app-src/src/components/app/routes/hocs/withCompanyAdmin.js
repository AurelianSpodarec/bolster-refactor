import React from 'react';
import { connect } from 'react-redux';

// import { MENU_TABS } from 'constants/tabNames';
import setMenuTabs from 'actions/generic/tabs/sync/setMenuTabs';

function withCompanyAdmin(WrappedComponent) {
    class Wrapper extends React.Component {
        render() {
            return <WrappedComponent {...this.props} />;
        }

        // componentDidMount = () => {
        //     const { setMenuTabs } = this.props;

        //     setMenuTabs(Object.values(MENU_TABS), MENU_TABS.COMPANY_ADMIN);
        // };
    }

    const mapDispatchToProps = dispatch => ({
        setMenuTabs: (tabs, selectedTab) => {
            dispatch(setMenuTabs(tabs, selectedTab));
        }
    });

    return connect(
        null,
        mapDispatchToProps
    )(Wrapper);
}

export default withCompanyAdmin;
