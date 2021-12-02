import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { isEmpty } from 'helpers/generic';
import WeekUserTable from './weekUserTable/WeekUserTable';

const UserTables = ({
    selectedDate,
    isFetching,
    fetchError,
    timesheets,
    filterType,
    filterDirection,
    filterByHasClockedIn,
}) => {
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
