import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectCompanyUsers } from '../../../../../../../selectors/companyAdmin/companyUsers';

import { TABLE_SORT_DIRECTIONS } from '../../../../../../../constants/shared/tables';

const { ASC } = TABLE_SORT_DIRECTIONS;

const useUsersFilter = () => {
    const [userFilter, setUserFilter] = useState('');
    const [sortDirection, setSortDirection] = useState(ASC);

    const companyUsers = useSelector(selectCompanyUsers) || [];

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

        return users.filter(({ userFirstName, userLastName }) =>
            `${userFirstName} ${userLastName}`
                .toLowerCase()
                .includes(userFilter.trim().toLowerCase()),
        );
    }, [companyUsers, userFilter, sortDirection]);

    return {
        sortDirection,
        handleSort,
        filteredUsers,
        userFilter,
        setUserFilter,
    };
};

export default useUsersFilter;
