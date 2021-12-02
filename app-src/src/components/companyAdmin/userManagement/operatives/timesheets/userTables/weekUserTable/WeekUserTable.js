import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import { days } from 'constants/companyAdmin/timesheets';
import moment from 'moment';
import UserTable from '../userTable/UserTable';
import {
    timesheetSort,
    timesheetFilter,
} from '../../breakdown/dayBreakdown/hooks/useOverviewFilters';

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

const WeekUserTable = ({ date, timesheets, filterDirection, filterType, filterByHasClockedIn }) => {
    return (
        <Table headers={headers} extraClasses="timesheet-user-table">
            {days.map((_, i) => {
                const currentDate = moment(date).add(i, 'days').format();

                return (
                    <UserTable
                        key={i}
                        day={days[i]}
                        date={currentDate}
                        timesheets={timesheets
                            .filter(timesheetFilter(filterByHasClockedIn, currentDate))
                            .sort(timesheetSort(filterType, filterDirection, currentDate))}
                    />
                );
            })}
        </Table>
    );
};

export default WeekUserTable;
