import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { USERS_ADMIN_TABS } from 'constants/shared/tabNames';

import AllCompanyAdminsTableContainer from '../containers/AllCompanyAdminsTableContainer';
import InvitedCompanyAdminsTable from '../../invitedCompanyAdmins/presentational/InvitedCompanyAdminsTable';
import DeletedCompanyAdminsTable from '../../deletedCompanyAdmins/presentational/DeletedCompanyAdminsTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import Search from 'components/shared/generic/form/presentational/Search';
import { COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';
import { nameSort } from 'helpers/generic';

const { ACTIVE, INVITED, DELETED } = USERS_ADMIN_TABS;

const routes = {
    [ACTIVE]: AllCompanyAdminsTableContainer,
    [INVITED]: InvitedCompanyAdminsTable,
    [DELETED]: DeletedCompanyAdminsTable,
};

const CompanyAdminsRoutes = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { selectedTab } = useSelector(mapStateToProps);

    const SpecificTable = routes[selectedTab] || routes[ACTIVE];

    return (
        <>
            <BlockContainer>
                <Search
                    value={searchTerm}
                    placeholder="Search by name/email"
                    handleChange={handleChange}
                    name="searchTerm"
                />
            </BlockContainer>
            <SpecificTable searchTerm={searchTerm} filteredUsers={filteredUsers} />
        </>
    );

    function filteredUsers(arr) {
        const searchTermLower = searchTerm.toLowerCase();

        const ret = arr.filter(user => {
            const name = `${user.userFirstName} ${user.userLastName}`.toLowerCase();
            return (
                user.type >= COMPANY_USER_ROLE_TYPES.ADMIN &&
                (!searchTermLower ||
                    name.includes(searchTermLower) ||
                    user.userEmail.includes(searchTermLower))
            );
        });

        return ret.sort(nameSort);
    }

    function handleChange(_, value) {
        setSearchTerm(value);
    }
};

const mapStateToProps = ({
    shared: {
        tabsReducer: { selectedTab },
    },
}) => ({
    selectedTab,
});

export default CompanyAdminsRoutes;
