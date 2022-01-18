import React, { useEffect, useState } from 'react';
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
import { dismissAlert } from 'actions/companyAdmin/alerts/sync/deleteAlert';
import DismissAlertModal from './DismissAlertModal';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import EditAlertModal from './EditAlertModal';
import { updateAlert } from 'actions/companyAdmin/alerts/sync/updateAlert';

const AlertItem = ({
    alert: {
        id,
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
        description,
    },
}) => {
    const [dismissAlertModal, setDismissAlertModal] = useState(false);
    const [editAlertModal, setEditAlertModal] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCompanyUsers());
    }, []);

    const user = useSelector(state => companyUser(state, createdByCompanyUserID));

    const handleDismissAlert = id => {
        setDismissAlertModal(false);
        dispatch(dismissAlert(id));
    };

    const handleEditAlert = id => {
        setEditAlertModal(false);
        dispatch(updateAlert(id));
    };

    return (
        <>
            <DismissAlertModal
                id={id}
                name={name}
                date={date}
                dismissAlertModal={dismissAlertModal}
                setDismissAlertModal={setDismissAlertModal}
                handleDismissAlert={handleDismissAlert}
                handleEditAlert={handleEditAlert}
            />

            <EditAlertModal
                id={id}
                name={name}
                date={date}
                description={description}
                method={method}
                frequencyAmount={frequencyAmount}
                frequencyType={frequencyType}
                editAlertModal={editAlertModal}
                setEditAlertModal={setEditAlertModal}
                handleEditAlert={handleEditAlert}
                hierarchyType={hierarchyType}
                hierarchyID={hierarchyID}
            />

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
                <td>{user && `${user.userFirstName} ${user.userLastName}/${user.companyName}`}</td>
                <td>
                    {frequencyType === 1
                        ? 'Single'
                        : frequencyAmount + ' per ' + ALERT_FREQUENCY_SUFFIX_VALUES[frequencyType]}
                </td>
                <td className="left-align">{name}</td>
                <td className="left-align">{description}</td>
                <td className="min-width-120">
                    <BlockButtonWrapper additionalClasses="stacked">
                        <button
                            className="button yellow"
                            onClick={() => {
                                setEditAlertModal(true);
                            }}
                        >
                            <i className="far fa-pencil" />
                            Edit
                        </button>

                        <button
                            className="button red"
                            onClick={() => {
                                setDismissAlertModal(true);
                            }}
                        >
                            <i className="fas fa-trash-alt" />
                            Delete
                        </button>
                    </BlockButtonWrapper>
                </td>
            </tr>
        </>
    );
};

export default AlertItem;
