import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import DatePickerPresentational from 'components/shared/generic/form/presentational/DatePicker';

const headers = [
    'Ticket Reference',
    'Company Name',
    'Affected User Count',
    'Device Details',
    'Date Issue Occured',
    'System Page',
    'Staus',
];

const BugReportsTable = () => {
    return (
        <div className="bug-report-table-container">
            <div className="bug-report-table-filters">
                <div className="flex item ">
                    <p className="">Start Date:</p>
                    <div className="flex">
                        <DatePickerPresentational
                        // selected={dates.dateFrom}
                        // onChange={date =>
                        //     setDates({
                        //         ...dates,
                        //         dateFrom: date,
                        //     })
                        // }
                        // placeholderText="Start Date"
                        // maxDate={today}
                        />
                    </div>
                </div>
                <div className="flex item ">
                    <p className="">End Date:</p>
                    <div className="flex">
                        <DatePickerPresentational
                        // selected={dates.dateTo}
                        // onChange={date =>
                        //     setDates({
                        //         ...dates,
                        //         dateTo: date,
                        //     })
                        // }
                        // placeholderText="End Date"
                        // maxDate={today}
                        />
                    </div>
                </div>
            </div>
            <Table
                withActions
                headers={headers}
                // isFetching={isFetching}
                // error={error}
                // noData={isEmpty(bugReports)}
                noDataMessage="No bug reports to display"
            ></Table>
        </div>
    );
};

export default BugReportsTable;
