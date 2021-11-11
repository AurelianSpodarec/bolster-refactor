import React from 'react';

import useBugReportsTable from './hooks/useBugReportsTable';

import Table from 'components/shared/generic/tables/presentational/Table';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { isEmpty } from 'helpers/generic';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import useDeleteBugReport from './hooks/useDeleteBugReport';

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
    const { bugReports, isFetching, error, handleViewBugReport } = useBugReportsTable();
    const [handleDeleteBugReport] = useDeleteBugReport();

    return (
        <div className="bug-report-table-container">
            <Table
                withActions
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={isEmpty(bugReports)}
                noDataMessage="No bug reports to display"
            >
                {bugReports.map((report, i) => {
                    return (
                        <tr key={i}>
                            <td className="center">{report.ticketReference}</td>
                            <td className="center">{report.companyName}</td>
                            <td className="center">{report.affectedUserCount}</td>
                            <td className="center">{report.deviceDetails}</td>
                            <td className="center">
                                <DateTimeContainer date={report.dateIssueOccurred} />
                            </td>
                            <td className="center">{report.systemPage}</td>
                            <td>
                                <BlockButtonWrapper>
                                    <button
                                        className="button green"
                                        onClick={() => handleViewBugReport(report.id)}
                                    >
                                        <i className="far fa-eye" /> View
                                    </button>
                                    <button
                                        className="button red"
                                        onClick={() => handleDeleteBugReport(report.id)}
                                    >
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
