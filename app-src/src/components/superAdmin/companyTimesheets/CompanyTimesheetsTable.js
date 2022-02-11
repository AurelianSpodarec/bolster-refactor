import React from 'react';

import useCompanyTimesheetsTable from './_hooks/useCompanyTimesheetsTable';

import { isEmpty } from 'helpers/generic';
import Table from 'components/shared/generic/tables/presentational/Table';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import PageSelector from 'components/shared/pagination/presentational/pageSelector';
import Select from '../../shared/generic/form/presentational/Select';

const CompanyTimesheetsTable = () => {
    const {
        timesheets,
        isFetching,
        error,
        page,
        totalPages,
        setPage,
        order,
        setOrder,
        sortOptions,
    } = useCompanyTimesheetsTable();

    const renderSelectHeader = () => {
        return (
            <div className="clocked-hours-wrapper">
                Total Clocked hours
                <Select
                    omitPlaceholder
                    options={sortOptions}
                    value={order}
                    onChange={() => setOrder(order === 'desc' ? 'asc' : 'desc')}
                />
            </div>
        );
    };

    const headers = [
        'Company Name',
        'No. Clocked in Users',
        renderSelectHeader,
        'No. Notes',
        'No. Note Images',
    ];

    return (
        <>
            <BlockHeading title="Users">
                <div className="size-lg-6">
                    <PageSelector setPage={setPage} page={page} maxPage={totalPages} />
                </div>
            </BlockHeading>
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
        </>
    );
};

export default CompanyTimesheetsTable;
