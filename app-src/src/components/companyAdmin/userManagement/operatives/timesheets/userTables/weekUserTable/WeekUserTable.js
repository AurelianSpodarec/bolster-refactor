import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import { days } from 'constants/companyAdmin/timesheets';
import moment from 'moment';
import UserTable from '../userTable/UserTable';
import { timesheetSort } from '../../breakdown/dayBreakdown/hooks/useOverviewFilters';

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

const WeekUserTable = ({ date, timesheets, filterDirection, filterType, selectedDate }) => {
    return (
        <Table headers={headers} extraClasses="timesheet-user-table">
            {days.map((_, i) => (
                <UserTable
                    key={i}
                    day={days[i]}
                    date={moment(date).add(i, 'days').format()}
                    timesheets={timesheets.sort(
                        timesheetSort(filterType, filterDirection, selectedDate),
                    )}
                />
            ))}
        </Table>
    );
};

export default WeekUserTable;
