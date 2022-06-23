import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectCompanyUsers } from '../../../../../../../selectors/companyAdmin/companyUsers';

import { TABLE_SORT_DIRECTIONS } from '../../../../../../../constants/shared/tables';
import { COMPANY_USER_ROLE_TYPES } from '../../../../../../../constants/companyAdmin/enums';

const { ASC } = TABLE_SORT_DIRECTIONS;

const useUsersFilter = () => {
    const [showFiltersPopup, setShowFiltersPopup] = useState(false);

    const [userFilter, setUserFilter] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [sortDirection, setSortDirection] = useState(ASC);

    const companyUsers = useSelector(selectCompanyUsers) || [];

    const userRoleOptions = [
        { value: '', label: 'All roles' },
        { value: COMPANY_USER_ROLE_TYPES.OWNER, label: 'Owner' },
        { value: COMPANY_USER_ROLE_TYPES.ADMIN, label: 'Admin' },
        { value: COMPANY_USER_ROLE_TYPES.OPERATIVE, label: 'Operative' },
    ];

    const handleSort = () => {
        if (sortDirection === ASC) {
            setSortDirection(TABLE_SORT_DIRECTIONS.DESC);
        } else {
            setSortDirection(TABLE_SORT_DIRECTIONS.ASC);
        }
    };

    const filteredUsers = useMemo(() => {
        const users = Object.values(companyUsers);

        users.sort((a, b) => {
            const aName = `${a.userFirstName} ${a.userLastName}`;
            const bName = `${b.userFirstName} ${b.userLastName}`;

            if (sortDirection === TABLE_SORT_DIRECTIONS.ASC) {
                return aName.localeCompare(bName);
            } else {
                return bName.localeCompare(aName);
            }
        });

        return users.filter(({ userFirstName, userLastName, type }) => {
            console.log(type);
            if (!!selectedRole && selectedRole !== type) {
                return false;
            }

            return `${userFirstName} ${userLastName}`
                .toLowerCase()
                .includes(userFilter.trim().toLowerCase());
        });
    }, [companyUsers, userFilter, sortDirection, selectedRole]);

    return {
        sortDirection,
        handleSort,
        showFiltersPopup,
        setShowFiltersPopup,
        filteredUsers,
        userFilter,
        setUserFilter,
        userRoleOptions,
        selectedRole,
        setSelectedRole,
    };
};

export default useUsersFilter;
