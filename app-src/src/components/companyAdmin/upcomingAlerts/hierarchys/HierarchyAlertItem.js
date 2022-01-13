import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'react-moment';
import 'moment-timezone';

import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { ALERT_FREQUENCY_SUFFIX_VALUES, ALERT_METHOD_VALUES } from 'constants/companyAdmin/enums';
import { companyUser } from 'selectors/companyAdmin/companyUser';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import { dismissAlert } from 'actions/companyAdmin/alerts/sync/deleteAlert';
import DismissAlertModal from '../presentational/DismissAlertModal';

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
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCompanyUsers());
    }, []);

    const user = useSelector(state => companyUser(state, createdByCompanyUserID));

    const handelClick = () => {
        setShowModal(true);
    };

    const handelDismissAlert = id => {
        setShowModal(false);
        dispatch(dismissAlert(id));
    };

    return (
        <>
            <DismissAlertModal
                id={id}
                name={name}
                date={date}
                showModal={showModal}
                setShowModal={setShowModal}
                handelDismissAlert={handelDismissAlert}
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
                    {frequencyType === 1
                        ? 'Single'
                        : frequencyAmount + ' per ' + ALERT_FREQUENCY_SUFFIX_VALUES[frequencyType]}
                </td>
                <td className="left-align">{name}</td>
                <td className="left-align">{description}</td>

                <td>
                    <button
                        className="no-background-btn"
                        onClick={() => {
                            handelClick();
                        }}
                    >
                        <i className="fas fa-times-circle close-icon" />
                    </button>
                </td>
            </tr>
        </>
    );
};

export default HierarchyAlertItem;
