import Table from 'components/shared/generic/tables/presentational/Table';
import { days } from 'constants/companyAdmin/timesheets';
import React from 'react';
import UserTable from '../userTable/UserTable';

const headers = [
    'Operative Name',
    'Total Hours Worked',
    'Time in',
    'Time out',
    'Total Break Time',
    'Pin Histories Created',
    'Job References',
    '',
];

const WeekUserTable = ({ date, timesheets }) => {
    return (
        <Table headers={headers} extraClasses="timesheet-user-table">
            {days.map((_, i) => (
                <UserTable key={i} day={days[i]} date={date} timesheets={timesheets} />
            ))}
        </Table>
    );
};

export default WeekUserTable;
