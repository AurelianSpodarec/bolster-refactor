import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import {
    DATE_TIME_IDS,
    PIN_TASK_RECURRING_NAMES,
    PIN_TASK_STATUS_NAMES,
} from 'constants/companyAdmin/enums';
import React, { Fragment } from 'react';
import TaskPill from '../../TaskPill';

const SeriesListRow = ({
    type,
    status,
    date,
    endDate,
    recurring,
    days,
    operatives,
    site,
    building,
    floor,
    drawing,
    pins,
}) => {
    return (
        <tr>
            <td>
                {operatives.map((operative, i) => (
                    <Fragment key={i}>
                        {operative}
                        <br />
                    </Fragment>
                ))}
            </td>
            <td>{drawing}</td>
            <td>
                {pins.map((pin, i) => (
                    <Fragment key={i}>
                        {pin}
                        <br />
                    </Fragment>
                ))}
            </td>
            <td>
                <DateTimeContainer datetime={DATE_TIME_IDS.DATE} date={new Date(date)} />
            </td>
            <td>
                <DateTimeContainer datetime={DATE_TIME_IDS.DATE} date={new Date(endDate)} />
            </td>
            <td>N/A</td>
            <td></td>
        </tr>
    );
};

export default SeriesListRow;
