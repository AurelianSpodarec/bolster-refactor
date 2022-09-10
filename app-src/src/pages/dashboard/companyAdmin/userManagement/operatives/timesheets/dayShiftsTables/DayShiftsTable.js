import React from 'react';
import Table from 'components_DEPRECATED/shared/generic/tables/presentational/Table';
import DayShiftsItems from './DayShiftsItems';

const headers = [
    'Operative Name',
    'Total Hours Worked',
    'Wages',
    'Time in',
    'Time out',
    'Break Time',
    'Pin Histories',
    'Job References',
    '',
];

const DayShiftsTable = ({ shiftsForDay, onDaySelect }) => {
    return (
        <Table
            headers={headers}
            extraClasses="timesheet-user-table"
            noData={!shiftsForDay.length}
            noDataMessage="No shifts to show"
        >
            <DayShiftsItems shiftsForDay={shiftsForDay} onDaySelect={onDaySelect} />
        </Table>
    );
};

export default DayShiftsTable;
