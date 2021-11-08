import Table from 'components/shared/generic/tables/presentational/Table';
import moment from 'moment';
import React from 'react';
import UserTable from '../userTable/UserTable';
import { timesheetUserTableHeaders } from '../UserTablesInner';
import { useSelector } from 'react-redux';
import { selectCompanySettings } from 'selectors/companyAdmin/companySettings';

const DayUserTable = ({ date, timesheet }) => {
    const { timeZone } = useSelector(selectCompanySettings);

    return (
        <Table headers={timesheetUserTableHeaders} extraClasses="timesheet-user-table">
            <UserTable
                date={date}
                day={moment(date).tz(timeZone.id).format('dddd')}
                initialRows={10}
            />
        </Table>
    );
};

export default DayUserTable;
