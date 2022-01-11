import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';

import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import {
    ALERT_FREQUENCY_SUFFIX_VALUES,
    ALERT_METHOD_VALUES,
    HIERARCHY_IDS,
    HIERARCHY_TYPES,
} from 'constants/companyAdmin/enums';

const AlertItem = ({
    alert: {
        name,
        createdOn,
        frequencyAmount,
        frequencyType,
        hierarchyType,
        hierarchyID,
        method,
        lastSendOn,
        date,
    },
}) => {
    console.log(HIERARCHY_IDS);

    return (
        <tr>
            <td className="left-align">
                {' '}
                <Moment format={'DD/MM/YYYY'} date={date} />
            </td>
            <td className="left-align">
                <DateTimeContainer date={createdOn} />
            </td>
            <td>{lastSendOn ? <DateTimeContainer date={lastSendOn} /> : 'NA'}</td>
            <td>
                <Link to={`/company/${HIERARCHY_TYPES[hierarchyType]}s/${hierarchyID}`}>
                    {`/company/${HIERARCHY_TYPES[hierarchyType]}s/${hierarchyID}`}
                </Link>
            </td>
            <td>{ALERT_METHOD_VALUES[method]}</td>
            <td>
                {frequencyType === 1
                    ? 'Single'
                    : frequencyAmount + ' per ' + ALERT_FREQUENCY_SUFFIX_VALUES[frequencyType]}
            </td>
            <td className="left-align">{name}</td>
        </tr>
    );
};

export default AlertItem;
