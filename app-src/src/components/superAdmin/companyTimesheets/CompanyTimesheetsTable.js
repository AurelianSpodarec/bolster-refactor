import React from 'react';

import useCompanyTimesheetsTable from './_hooks/useCompanyTimesheetsTable';

import { isEmpty } from 'helpers/generic';
import Table from 'components/shared/generic/tables/presentational/Table';

const headers = [
    'Company Name',
    'No. Clocked in Users',
    'Total Clocked hours',
    'No. Notes',
    'No. Note Images',
];

const CompanyTimesheetsTable = () => {
    const { timesheets, isFetching, error } = useCompanyTimesheetsTable();

    return (
        <Table
            withActions
            headers={headers}
            isFetching={isFetching}
            error={error}
            noData={isEmpty(timesheets)}
            noDataMessage="No bug timesheets to display"
        >
            {timesheets.map(
                (
                    {
                        companyName,
                        numberOfClockedInUsers,
                        numberOfHoursClockedIn,
                        numberOfImages,
                        numberOfNotes,
                    },
                    i,
                ) => {
                    return (
                        <tr key={i}>
                            <td className="center">{companyName}</td>
                            <td className="center">{numberOfClockedInUsers}</td>
                            <td className="center">{numberOfHoursClockedIn}</td>
                            <td className="center">{numberOfImages}</td>
                            <td className="center">{numberOfNotes}</td>
                        </tr>
                    );
                },
            )}
        </Table>
    );
};

export default CompanyTimesheetsTable;
