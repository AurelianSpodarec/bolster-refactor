import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { isEmpty } from 'helpers/generic';
import React from 'react';
import WeekUserTable from './weekUserTable/WeekUserTable';

const UserTables = ({ selectedDate, isFetching, fetchError, timesheets }) => {
    return (
        <BlockContainer isFetching={isFetching} error={fetchError} isEmpty={isEmpty(timesheets)}>
            <WeekUserTable date={selectedDate} timesheets={timesheets} />
        </BlockContainer>
    );
};

export default UserTables;
