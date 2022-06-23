import { useMemo, useState } from 'react';

import { TABLE_SORT_DIRECTIONS } from '../../../../../../../constants/shared/tables';

const { ASC } = TABLE_SORT_DIRECTIONS;

const useUsersFilter = users => {
    const [sortDirection, setSortDirection] = useState(ASC);

    const handleSort = () => {
        if (sortDirection === ASC) {
            setSortDirection(TABLE_SORT_DIRECTIONS.DESC);
        } else {
            setSortDirection(TABLE_SORT_DIRECTIONS.ASC);
        }
    };

    const sortedUsers = useMemo(() => {
        const usersCopy = [...users];

        usersCopy.sort((a, b) => {
            const aName = `${a.userFirstName} ${a.userLastName}`;
            const bName = `${b.userFirstName} ${b.userLastName}`;

            if (sortDirection === TABLE_SORT_DIRECTIONS.ASC) {
                return aName.localeCompare(bName);
            } else {
                return bName.localeCompare(aName);
            }
        });

        return usersCopy;
    }, [users, sortDirection]);

    return { sortDirection, handleSort, sortedUsers };
};

export default useUsersFilter;
