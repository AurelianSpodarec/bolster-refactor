import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'react-moment';
import 'moment-timezone';

import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import {
    ALERT_FREQUENCY_SUFFIX_VALUES,
    ALERT_METHOD_VALUES,
    HIERARCHY_TYPES,
} from 'constants/companyAdmin/enums';
import { companyUser } from 'selectors/companyAdmin/companyUser';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';

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
        createdByCompanyUserID,
    },
}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCompanyUsers());
    }, []);

    const user = useSelector(state => companyUser(state, createdByCompanyUserID));

    return (
        <tr>
            <td className="left-align">
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
                {user.userFirstName} {user.userLastName}/{user.companyName}
            </td>
            <td>
                {frequencyType === 1
                    ? 'Single'
                    : frequencyAmount + ' per ' + ALERT_FREQUENCY_SUFFIX_VALUES[frequencyType]}
            </td>
            <td className="left-align">{name}</td>
            <td>
                <button className="no-background-btn" onClick={() => console.log('dismiss')}>
                    <i className="fas fa-times-circle close-icon" />
                </button>
            </td>
        </tr>
    );
};

export default AlertItem;
