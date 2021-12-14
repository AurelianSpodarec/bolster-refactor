import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import { formatAsHrsMinsSecs } from 'helpers/generic';
import moment from 'moment';
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import useDayOverview from '../../hooks/useDayOverview';

const UserTable = ({ date, day, initialRows = 7, timesheets }) => {
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

            {timesheets.map((timesheet, i) => {
                const {
                    companyUserID,
                    firstName,
                    lastName,
                    formattedHours,
                    formattedBreakHours,
                    jobReferences,
                    totalPins,
                    clockIn,
                    clockOut,
                } = useDayOverview(timesheet, date);

                const [initialDate] = date.split('T');

                return (
                    <Fragment key={companyUserID}>
                        {i > initialRows - 1 && !expanded ? (
                            i === initialRows ? (
                                <tr>
                                    <td className="view-more-row" colSpan={8}>
                                        <button
                                            className="button"
                                            onClick={() => setExpanded(true)}
                                        >
                                            <i className="far fa-eye" />
                                            Show More
                                        </button>
                                    </td>
                                </tr>
                            ) : null
                        ) : (
                            <tr key={companyUserID}>
                                <td>
                                    {firstName} {lastName}
                                </td>
                                <td>{formatAsHrsMinsSecs(formattedHours)}</td>
                                <td>
                                    {clockIn ? (
                                        <DateTimeContainer
                                            date={clockIn}
                                            datetime={DATE_TIME_IDS.TIME}
                                        />
                                    ) : (
                                        'N/A'
                                    )}
                                </td>
                                <td>
                                    {clockOut ? (
                                        <DateTimeContainer
                                            date={clockOut}
                                            datetime={DATE_TIME_IDS.TIME}
                                        />
                                    ) : (
                                        'N/A'
                                    )}
                                </td>
                                <td>{formatAsHrsMinsSecs(formattedBreakHours)}</td>
                                <td>{totalPins}</td>
                                <td>{jobReferences.filter(reference => reference).length}</td>
                                <td>
                                    <Link
                                        to={{
                                            pathname: `/company/users-management/operatives/${companyUserID}/timesheet`,
                                            search: `?date=${initialDate}`,
                                        }}
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
            })}
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
