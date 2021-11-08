import Table from 'components/shared/generic/tables/presentational/Table';
import React from 'react';
import UserTable from '../userTable/UserTable';
import { timesheetUserTableHeaders } from '../UserTablesInner';

const DayUserTable = ({ date, timesheet }) => {
    return (
        <Table headers={timesheetUserTableHeaders} extraClasses="timesheet-user-table">
            <UserTable date={date} />
        </Table>
    );
};

export default DayUserTable;
