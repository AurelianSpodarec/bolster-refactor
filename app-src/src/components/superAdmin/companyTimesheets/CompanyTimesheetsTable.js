import React from 'react';

import useCompanyTimesheetsTable from './_hooks/useCompanyTimesheetsTable';

import { isEmpty } from 'helpers/generic';
import Table from 'components/shared/generic/tables/presentational/Table';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import PageSelector from 'components/shared/pagination/presentational/pageSelector';
import Select from '../../shared/generic/form/presentational/Select';
import DateTimeContainer from '../../shared/dateTime/containers/DateTimeContainer';
import moment from 'moment';
import { DATE_TIME_IDS } from '../../../constants/companyAdmin/enums';
import ButtonContainer from '../../shared/generic/button/containers/ButtonContainer';

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
        startDate,
        onPrev,
        onNext,
        onToday,
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
            <div className="size-lg-12">
                <div className="size-lg-6">
                    <PageSelector setPage={setPage} page={page} maxPage={totalPages} />
                </div>

                <div className="date-selector size-lg-6">
                    <div className="nav-buttons">
                        <button onClick={onPrev}>
                            <i className="far fa-chevron-left" />
                        </button>
                        <button onClick={onNext}>
                            <i className="far fa-chevron-right" />
                        </button>
                    </div>
                    <div className="date-range">
                        <>
                            <DateTimeContainer
                                date={moment(startDate).toDate()}
                                datetime={DATE_TIME_IDS.DATE}
                            />
                            -
                            <DateTimeContainer
                                date={moment(startDate).add(1, 'week').format('YYYY-MM-DD')}
                                datetime={DATE_TIME_IDS.DATE}
                            />
                        </>
                    </div>

                    <ButtonContainer
                        className="today-button"
                        setColour="transparent"
                        handleClick={onToday}
                    >
                        <i className="far fa-calendar-week"></i> This week
                    </ButtonContainer>
                </div>
            </div>
            <Table
                withActions
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={isEmpty(timesheets)}
                noDataMessage="No timesheets to display"
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
