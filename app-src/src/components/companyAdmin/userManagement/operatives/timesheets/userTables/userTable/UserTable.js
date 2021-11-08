import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import { formatAsHrsMinsSecs } from 'helpers/generic';
import React from 'react';
import { timesheetUserTableDummyData } from '../UserTablesInner';
import { Link } from 'react-router-dom';

const UserTable = ({ date, day }) => {
    return (
        <>
            <tr>
                <td colSpan={8}>
                    <BlockHeading
                        title={
                            <>
                                {day} -{' '}
                                <DateTimeContainer
                                    date={new Date(date)}
                                    datetime={DATE_TIME_IDS.DATE}
                                />
                            </>
                        }
                    />
                </td>
            </tr>

            {timesheetUserTableDummyData.map(
                ({
                    id,
                    firstName,
                    lastName,
                    totalHoursWorked,
                    timeIn,
                    timeOut,
                    totalBreakTime,
                    pinHistoriesCreated,
                    jobReferences,
                }) => (
                    <tr key={id}>
                        <td>
                            {firstName} {lastName} - {id}
                        </td>
                        <td>{formatAsHrsMinsSecs(totalHoursWorked)}</td>
                        <td>
                            <DateTimeContainer date={timeIn} datetime={DATE_TIME_IDS.DATE} />
                        </td>
                        <td>
                            <DateTimeContainer date={timeOut} datetime={DATE_TIME_IDS.DATE} />
                        </td>
                        <td>{formatAsHrsMinsSecs(totalBreakTime)}</td>
                        <td>{pinHistoriesCreated}</td>
                        <td>{jobReferences.length}</td>
                        <td>
                            <Link
                                to={`/company/users-management/operatives/${id}/timesheet`}
                                className="button green"
                            >
                                <i class="far fa-eye" />
                                View Timesheet
                            </Link>
                        </td>
                    </tr>
                ),
            )}
        </>
    );
};

export default UserTable;
