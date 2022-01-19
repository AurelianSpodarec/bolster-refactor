import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'react-moment';
import 'moment-timezone';

import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import {
    ALERT_FREQUENCY_SUFFIX_VALUES,
    ALERT_FREQUENCY_TYPES,
    ALERT_METHOD_VALUES,
} from 'constants/companyAdmin/enums';
import { companyUser } from 'selectors/companyAdmin/companyUser';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import deleteAlert from 'actions/companyAdmin/alerts/async/deleteAlert';
import DeleteAlertModal from '../presentational/DeleteAlertModal';

const HierarchyAlertItem = ({
    alert: {
        id,
        name,
        createdOn,
        frequencyAmount,
        frequencyType,
        method,
        lastSendOn,
        date,
        createdByCompanyUserID,
        description,
    },
}) => {
    const [dismissAlertModal, setDismissAlertModal] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCompanyUsers());
    }, []);

    const user = useSelector(state => companyUser(state, createdByCompanyUserID));

    const handleClick = () => {
        setDismissAlertModal(true);
    };

    const handleDismissAlert = id => {
        setDismissAlertModal(false);
        dispatch(deleteAlert(id));
    };

    const isPlural = frequencyAmount > 1;
    return (
        <>
            <DeleteAlertModal
                id={id}
                name={name}
                date={date}
                dismissAlertModal={dismissAlertModal}
                setDismissAlertModal={setDismissAlertModal}
                handleDismissAlert={handleDismissAlert}
            />
            <tr>
                <td className="left-align">
                    <Moment format={'DD/MM/YYYY'} date={date} />
                </td>
                <td className="left-align">
                    <DateTimeContainer date={createdOn} />
                </td>
                <td>{lastSendOn ? <DateTimeContainer date={lastSendOn} /> : 'NA'}</td>
                <td>{ALERT_METHOD_VALUES[method]}</td>
                <td>{user && `${user.userFirstName} ${user.userLastName}/${user.companyName}`}</td>
                <td>
                    {frequencyType === ALERT_FREQUENCY_TYPES.ONCE
                        ? 'Once'
                        : 'Every ' +
                          frequencyAmount +
                          ' ' +
                          ALERT_FREQUENCY_SUFFIX_VALUES[frequencyType] +
                          (isPlural ? 's' : '')}
                </td>
                <td className="left-align">{name}</td>
                <td className="left-align">{description}</td>

                <td>
                    <button className="no-background-btn" onClick={handleClick}>
                        <i className="fas fa-times-circle close-icon" />
                    </button>
                </td>
            </tr>
        </>
    );
};

export default HierarchyAlertItem;
