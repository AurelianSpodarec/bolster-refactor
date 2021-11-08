import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { isEmpty } from 'helpers/generic';
import UserTablesInner from './UserTablesInner';
import React from 'react';

const UserTables = ({ selectedDate, timePeriod, isFetching, fetchError, timesheet }) => {
    return (
        <BlockContainer isFetching={isFetching} error={fetchError} isEmpty={isEmpty(timesheet)}>
            <UserTablesInner
                selectedDate={selectedDate}
                timePeriod={timePeriod}
                timesheet={timesheet}
            />
        </BlockContainer>
    );
};

export default UserTables;
