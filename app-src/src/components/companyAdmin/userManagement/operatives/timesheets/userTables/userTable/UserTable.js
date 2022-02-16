import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { getDateTime } from 'components/shared/dateTime/hooks/useDateTime';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import { formatAsHrsMinsSecs } from 'helpers/generic';
import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    selectCompanyTimeZone,
    selectCompanyDateFormat,
} from 'selectors/companyAdmin/companySettings';
import useDayOverview from '../../hooks/useDayOverview';

const UserTable = ({ date, day, initialRows = 7, timesheets }) => {
    const [expanded, setExpanded] = useState(false);

    const timeZone = useSelector(selectCompanyTimeZone);
    const dateFormat = useSelector(selectCompanyDateFormat);

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

            {timesheets.map((timesheet, i) => {
                const {
                    companyUserID,
                    firstName,
                    lastName,
                    formattedHours,
                    formattedBreakHours,
                    jobReferenceIDs,
                    totalPins,
                    clockIn,
                    clockOut,
                } = useDayOverview(timesheet, date);
                const { moment: clockInMoment } = getDateTime(clockIn, timeZone, dateFormat);
                const { moment: clockOutMoment } = getDateTime(clockOut, timeZone, dateFormat);
                const clockInDay = clockInMoment.startOf('day');
                const clockOutDay = clockOutMoment.startOf('day');
                const dayDifference = clockOutDay.diff(clockInDay, 'days');

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
                                        <>
                                            <DateTimeContainer
                                                date={clockOut}
                                                datetime={DATE_TIME_IDS.TIME}
                                            />
                                            {dayDifference > 0 && '(+' + dayDifference + 'd)'}
                                        </>
                                    ) : (
                                        'N/A'
                                    )}
                                </td>
                                <td>{formatAsHrsMinsSecs(formattedBreakHours)}</td>
                                <td>{totalPins}</td>
                                <td>{jobReferenceIDs.filter(reference => reference).length}</td>
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
        </>
    );
};

export default UserTable;
