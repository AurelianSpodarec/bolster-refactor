import React from 'react';
import { connect } from 'react-redux';

import { MENU_TABS } from 'constants/tabNames';
import setTabs from 'actions/generic/tabs/sync/setTabs';

function withCompanyAdmin(WrappedComponent) {
    class Wrapper extends React.Component {
        render() {
            return <WrappedComponent />;
        }

        componentDidMount = () => {
            const { setTabs } = this.props;
            console.log('hi hi');
            setTabs(Object.values(MENU_TABS), MENU_TABS.COMPANY_ADMIN);
        };
    }

    const mapDispatchToProps = dispatch => ({
        setTabs: (tabs, selectedMenuTab) => {
            dispatch(setTabs(tabs, selectedMenuTab));
        }
    });

    return connect(
        null,
        mapDispatchToProps
    )(Wrapper);
}

export default withCompanyAdmin;
