import React from 'react';
import { useSelector } from 'react-redux';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { isEmpty } from 'helpers/generic';
import WeekUserTable from './weekUserTable/WeekUserTable';
import { selectFilterByHasClockedIn } from 'selectors/companyAdmin/timesheets';

const UserTables = ({
    selectedDate,
    isFetching,
    fetchError,
    timesheets,
    filterType,
    filterDirection,
}) => {
    const filterByHasClockedIn = useSelector(selectFilterByHasClockedIn);
    return (
        <BlockContainer isFetching={isFetching} error={fetchError} isEmpty={isEmpty(timesheets)}>
            <WeekUserTable
                date={selectedDate}
                timesheets={timesheets}
                filterType={filterType}
                filterDirection={filterDirection}
                filterByHasClockedIn={filterByHasClockedIn}
            />
        </BlockContainer>
    );
};

export default UserTables;
