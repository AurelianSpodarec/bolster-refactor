import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import { days } from 'constants/companyAdmin/timesheets';
import { isEmpty } from 'helpers/generic';
import WeekTableInner from './WeekTableInner';

const WeekTable = ({
    startDate,
    selectedDate,
    timePeriod,
    onDaySelect,
    onWeekSelect,

    isFetching,
    fetchError,
    timesheet,
}) => {
    return (
        <Table
            headers={[...days, 'Weekly']}
            isFetching={isFetching}
            error={fetchError}
            noData={isEmpty(timesheet)}
        >
            <tr>
                <WeekTableInner
                    startDate={startDate}
                    selectedDate={selectedDate}
                    timePeriod={timePeriod}
                    onDaySelect={onDaySelect}
                    onWeekSelect={onWeekSelect}
                    timesheet={timesheet}
                />
            </tr>
        </Table>
    );
};

export default WeekTable;
