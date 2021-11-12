import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';
import { USERS_OPERATIVES_TABS } from 'constants/shared/tabNames';
import { nameSort } from 'helpers/generic';

import AllOperativesTableContainer from '../containers/AllOperativesTableContainer';
import InactiveOperativesTable from '../../inactiveOperatives/presentational/InactiveOperativesTable';
import InvitedOperativesTable from '../../invitedOperatives/presentational/InvitedOperativesTable';
import DeletedOperativesTable from '../../deletedOperatives/presentational/DeletedOperativesTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import Search from 'components/shared/generic/form/presentational/Search';

const { ACTIVE, INACTIVE, INVITED, DELETED } = USERS_OPERATIVES_TABS;

const routes = {
    [ACTIVE]: AllOperativesTableContainer,
    [INACTIVE]: InactiveOperativesTable,
    [INVITED]: InvitedOperativesTable,
    [DELETED]: DeletedOperativesTable,
};

const OperativesRoutes = () => {
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
            <SpecificTable filteredUsers={filteredUsers} />
        </>
    );

    function filteredUsers(arr) {
        const searchTermLower = searchTerm.toLowerCase();

        const ret = arr.filter(user => {
            const name = `${user.userFirstName} ${user.userLastName}`.toLowerCase();
            return (
                user.type === COMPANY_USER_ROLE_TYPES.OPERATIVE &&
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

export default OperativesRoutes;
