import React from 'react';

import useBugReportsTable from './hooks/useBugReportsTable';

import Table from 'components/shared/generic/tables/presentational/Table';
import DatePickerPresentational from 'components/shared/generic/form/presentational/DatePicker';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { isEmpty } from 'helpers/generic';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

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
    const { dates, setDates, bugReports } = useBugReportsTable();
    const today = new Date();

    return (
        <div className="bug-report-table-container">
            <div className="bug-report-table-filters">
                <div className="flex item ">
                    <p className="">Start Date:</p>
                    <div className="flex">
                        <DatePickerPresentational
                            selected={dates.dateFrom}
                            onChange={date =>
                                setDates({
                                    ...dates,
                                    dateFrom: date,
                                })
                            }
                            placeholderText="Start Date"
                            maxDate={today}
                        />
                    </div>
                </div>
                <div className="flex item ">
                    <p className="">End Date:</p>
                    <div className="flex">
                        <DatePickerPresentational
                            selected={dates.dateTo}
                            onChange={date =>
                                setDates({
                                    ...dates,
                                    dateTo: date,
                                })
                            }
                            placeholderText="End Date"
                            maxDate={today}
                        />
                    </div>
                </div>
            </div>
            <Table
                withActions
                headers={headers}
                // isFetching={isFetching}
                // error={error}
                noData={isEmpty(bugReports)}
                noDataMessage="No bug reports to display"
            >
                {bugReports.map((report, i) => {
                    return (
                        <tr key={i}>
                            <td className="center">{report.ticketRef}</td>
                            <td className="center">{report.companyName}</td>
                            <td className="center">{report.affectedUserCount}</td>
                            <td className="center">{report.deviceDetails}</td>
                            <td className="center">
                                <DateTimeContainer date={report.dateIssueOccured} />
                            </td>
                            <td className="center">{report.systemPage}</td>
                            <td className="center">{report.status}</td>
                            <td>
                                <BlockButtonWrapper>
                                    <button className="button yellow">
                                        <i className="far fa-pencil" /> Edit
                                    </button>
                                    <button className="button red">
                                        <i className="far fa-trash" />
                                        Delete
                                    </button>
                                </BlockButtonWrapper>
                            </td>
                        </tr>
                    );
                })}
            </Table>
        </div>
    );
};

export default BugReportsTable;
