import React from 'react';
import { connect } from 'react-redux';

import { USERS_ADMIN_TABS } from 'constants/shared/tabNames';

import AllCompanyAdminsTableContainer from '../containers/AllCompanyAdminsTableContainer';
import InvitedCompanyAdminsTable from '../../invitedCompanyAdmins/presentational/InvitedCompanyAdminsTable';
import DeletedCompanyAdminsTable from '../../deletedCompanyAdmins/presentational/DeletedCompanyAdminsTable';

const { ACTIVE, INVITED, DELETED } = USERS_ADMIN_TABS;

const routes = {
    [ACTIVE]: AllCompanyAdminsTableContainer,
    [INVITED]: InvitedCompanyAdminsTable,
    [DELETED]: DeletedCompanyAdminsTable,
};

const CompanyAdminsRoutes = ({ selectedTab }) => {
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

export default connect(mapStateToProps)(CompanyAdminsRoutes);
