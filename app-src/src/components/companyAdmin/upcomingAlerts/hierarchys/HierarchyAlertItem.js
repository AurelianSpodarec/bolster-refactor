import React, { useEffect } from 'react';
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
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { DELETE_ALERT_MODAL, EDIT_ALERT_MODAL } from 'constants/shared/modalTypes';

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
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCompanyUsers());
    }, []);

    const user = useSelector(state => companyUser(state, createdByCompanyUserID));

    const isPlural = frequencyAmount > 1;
    return (
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

            <td className="min-width-120">
                <BlockButtonWrapper additionalClasses="stacked">
                    <button
                        className="button yellow"
                        onClick={() => dispatch(showModal(EDIT_ALERT_MODAL, { id }))}
                    >
                        <i className="far fa-pencil" />
                        Edit
                    </button>

                    <button
                        className="button red"
                        onClick={() => dispatch(showModal(DELETE_ALERT_MODAL, { id }))}
                    >
                        <i className="fas fa-trash-alt" />
                        Delete
                    </button>
                </BlockButtonWrapper>
            </td>
        </tr>
    );
};

export default HierarchyAlertItem;
