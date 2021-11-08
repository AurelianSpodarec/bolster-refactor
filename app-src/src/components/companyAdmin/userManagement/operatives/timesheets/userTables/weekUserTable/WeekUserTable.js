import Table from 'components/shared/generic/tables/presentational/Table';
import { days } from 'constants/companyAdmin/timesheets';
import React from 'react';
import UserTable from '../userTable/UserTable';
import { timesheetUserTableHeaders } from '../UserTablesInner';

const WeekUserTable = ({ date, timesheet }) => {
    return (
        <Table headers={timesheetUserTableHeaders} extraClasses="timesheet-user-table">
            {new Array(7).fill(null).map((_, i) => (
                <UserTable key={i} day={days[i]} date={date} />
            ))}
        </Table>
    );
};

export default WeekUserTable;
