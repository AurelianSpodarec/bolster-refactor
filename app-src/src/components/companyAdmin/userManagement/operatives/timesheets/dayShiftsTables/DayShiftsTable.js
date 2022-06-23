import React from 'react';
import moment from 'moment';

import { days } from 'constants/companyAdmin/timesheets';

import Table from 'components/shared/generic/tables/presentational/Table';
import DayShiftsItems from './DayShiftsItems';

import { timesheetSort, timesheetFilter } from '../breakdown/dayBreakdown/hooks/useOverviewFilters';

const headers = [
    'Operative Name',
    'Total Hours Worked',
    'Wages',
    'Time in',
    'Time out',
    'Total Break Time',
    'Pin Histories',
    'Job References',
    '',
];

const DayShiftsTable = ({
    date,
    timesheets,
    shiftsForDay,
    filterDirection,
    filterType,
    filterByHasClockedIn,
}) => {
    return (
        <Table
            headers={headers}
            extraClasses="timesheet-user-table"
            noData={!shiftsForDay.length}
            noDataMessage="No shifts to show"
        >
            <DayShiftsItems
                // timesheets={timesheets
                //     .filter(timesheetFilter(filterByHasClockedIn, currentDate))
                //     .sort(timesheetSort(filterType, filterDirection, currentDate))}
                shiftsForDay={shiftsForDay}
            />
        </Table>
    );
};

export default DayShiftsTable;
