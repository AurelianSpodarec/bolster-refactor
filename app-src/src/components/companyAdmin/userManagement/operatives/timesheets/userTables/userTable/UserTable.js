import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import { formatAsHrsMinsSecs } from 'helpers/generic';
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import useFormattedBreakTime from '../../breakdown/hooks/useFormattedBreakTime';
import useReferences from '../../hooks/useReferences';
import useTimeline from '../../hooks/useTimeline';

const UserTable = ({ date, day, initialRows = 3, timesheets }) => {
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

            {timesheets.map(
                (
                    {
                        companyUserID,
                        firstName,
                        lastName,
                        formattedHours,
                        clockerEntries,
                        totalPins,
                    },
                    i,
                ) => {
                    const formattedBreakHours = useFormattedBreakTime(clockerEntries);
                    const jobReferences = useReferences(clockerEntries);

                    const timeline = useTimeline(clockerEntries);

                    const clockIn = timeline.find(({ clockIn }) => clockIn)?.clockIn;
                    const clockOut = [...timeline].reverse().find(({ clockOut }) => clockOut)
                        ?.clockOut;

                    return (
                        <Fragment key={i}>
                            {i > initialRows - 1 && !expanded ? (
                                i === initialRows ? (
                                    <tr>
                                        <td className="view-more-row" colSpan={8}>
                                            <button
                                                className="button"
                                                onClick={() => setExpanded(true)}
                                            >
                                                <i className="far fa-eye" />
                                                View All
                                            </button>
                                        </td>
                                    </tr>
                                ) : null
                            ) : (
                                <tr key={companyUserID}>
                                    <td>
                                        {firstName} {lastName} - {companyUserID}
                                    </td>
                                    <td>{formatAsHrsMinsSecs(formattedHours)}</td>
                                    <td>
                                        {clockIn ? (
                                            <DateTimeContainer
                                                date={clockIn}
                                                datetime={DATE_TIME_IDS.DATE}
                                            />
                                        ) : (
                                            'N/A'
                                        )}
                                    </td>
                                    <td>
                                        {clockOut ? (
                                            <DateTimeContainer
                                                date={clockOut}
                                                datetime={DATE_TIME_IDS.DATE}
                                            />
                                        ) : (
                                            'N/A'
                                        )}
                                    </td>
                                    <td>{formatAsHrsMinsSecs(formattedBreakHours)}</td>
                                    <td>{totalPins}</td>
                                    <td>{jobReferences.length}</td>
                                    <td>
                                        <Link
                                            to={`/company/users-management/operatives/${companyUserID}/timesheet`}
                                            className="button green"
                                        >
                                            <i className="far fa-eye" />
                                            View Timesheet
                                        </Link>
                                    </td>
                                </tr>
                            )}
                        </Fragment>
                    );
                },
            )}
            {expanded && (
                <tr>
                    <td className="view-more-row" colSpan={8}>
                        <button className="button" onClick={() => setExpanded(false)}>
                            <i className="far fa-eye-slash" />
                            Hide
                        </button>
                    </td>
                </tr>
            )}
        </>
    );
};

export default UserTable;
