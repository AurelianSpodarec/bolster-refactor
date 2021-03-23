import React from 'react';
import { connect } from 'react-redux';

import { USERS_OPERATIVES_TABS } from 'constants/shared/tabNames';

import AllOperativesTableContainer from '../containers/AllOperativesTableContainer';

const { ACTIVE, INACTIVE, INVITED, DELETED } = USERS_OPERATIVES_TABS;

const routes = {
    [ACTIVE]: AllOperativesTableContainer,
    [INACTIVE]: null,
    [INVITED]: null,
    [DELETED]: null,
};

const OperativesRoutes = ({ selectedTab }) => {
    const SpecificTable = routes[selectedTab] || routes[ACTIVE];

    return <SpecificTable />;
};

const mapStateToProps = ({
    shared: {
        tabsReducer: { selectedTab },
    },
}) => ({
    selectedTab,
});

export default connect(mapStateToProps)(OperativesRoutes);
