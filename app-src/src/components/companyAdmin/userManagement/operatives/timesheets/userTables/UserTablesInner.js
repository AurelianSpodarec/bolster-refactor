import { TIME_PERIOD } from 'constants/companyAdmin/enums';
import moment from 'moment';
import React from 'react';
import DayUserTable from './dayUserTable/DayUserTable';
import WeekUserTable from './weekUserTable/WeekUserTable';

export const timesheetUserTableHeaders = [
    'Operative Name',
    'Total Hours Worked',
    'Time in',
    'Time out',
    'Total Break Time',
    'Pin Histories Created',
    'Job References',
    '',
];

const generateRandomUser = () => ({
    id: Math.floor(Math.random() * 100),
    firstName: 'John',
    lastName: 'Doe',
    totalHoursWorked: '0001-01-01T07:15:05',
    timeIn: moment().subtract(6, 'hours').format(),
    timeOut: moment().subtract(4, 'hours').format(),
    totalBreakTime: '0001-01-01T00:20:45',
    pinHistoriesCreated: 6,
    jobReferences: ['Station', 'School', 'Airport'],
});

export const timesheetUserTableDummyData = [
    generateRandomUser(),
    generateRandomUser(),
    generateRandomUser(),
    generateRandomUser(),
    generateRandomUser(),
    generateRandomUser(),
    generateRandomUser(),
];

const UserTablesInner = ({ selectedDate, timePeriod, timesheet }) => {
    switch (timePeriod) {
        case TIME_PERIOD.WEEK:
            return <WeekUserTable date={selectedDate} timesheet={timesheet} />;
        case TIME_PERIOD.DAY:
            return <DayUserTable date={selectedDate} timesheet={timesheet} />;
        default:
            return null;
    }
};

export default UserTablesInner;
