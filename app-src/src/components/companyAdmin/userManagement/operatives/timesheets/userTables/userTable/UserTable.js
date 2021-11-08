import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import { formatAsHrsMinsSecs } from 'helpers/generic';
import React, { useState } from 'react';
import { timesheetUserTableDummyData } from '../UserTablesInner';
import { Link } from 'react-router-dom';

const UserTable = ({ date, day, initialRows = 3 }) => {
    const [expanded, setExpanded] = useState(false);

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
                (
                    {
                        id,
                        firstName,
                        lastName,
                        totalHoursWorked,
                        timeIn,
                        timeOut,
                        totalBreakTime,
                        pinHistoriesCreated,
                        jobReferences,
                    },
                    i,
                ) => (
                    <>
                        {i > initialRows - 1 && !expanded ? (
                            i === initialRows ? (
                                <tr>
                                    <td className="view-more-row" colSpan={8}>
                                        <button
                                            className="button"
                                            onClick={() => setExpanded(true)}
                                        >
                                            <i class="far fa-eye" />
                                            View All
                                        </button>
                                    </td>
                                </tr>
                            ) : null
                        ) : (
                            <tr key={id}>
                                <td>
                                    {firstName} {lastName} - {id}
                                </td>
                                <td>{formatAsHrsMinsSecs(totalHoursWorked)}</td>
                                <td>
                                    <DateTimeContainer
                                        date={timeIn}
                                        datetime={DATE_TIME_IDS.DATE}
                                    />
                                </td>
                                <td>
                                    <DateTimeContainer
                                        date={timeOut}
                                        datetime={DATE_TIME_IDS.DATE}
                                    />
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
                        )}
                    </>
                ),
            )}
            {expanded && (
                <tr>
                    <td className="view-more-row" colSpan={8}>
                        <button className="button" onClick={() => setExpanded(false)}>
                            <i class="far fa-eye-slash" />
                            Hide
                        </button>
                    </td>
                </tr>
            )}
        </>
    );
};

export default UserTable;
