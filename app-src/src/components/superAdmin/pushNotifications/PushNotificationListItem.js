import React from 'react';
import moment from 'moment';

import { PUSH_NOTIFICATION_FREQUENCY_NAMES } from 'constants/shared/enums';
import { DATE, DATE_TIME } from 'constants/shared/dateFormats';

import ActionMenu from 'components/shared/actionMenu/ActionMenu';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';

const PushNotificationListItem = ({
    notification,
    notification: { title, message, frequency, date, lastSentOn },
    handleEditNotification,
    handleDeleteNotification,
}) => (
    <tr>
        <td>{title}</td>
        <td>{message}</td>
        <td>{PUSH_NOTIFICATION_FREQUENCY_NAMES[frequency]}</td>
        <td>{moment(date).format(DATE)}</td>
        <td>{lastSentOn ? moment(lastSentOn).format(DATE_TIME) : 'Not sent'}</td>
        <td>
            <ButtonWrapper alignment="right">
                <ActionMenu>
                    <ActionMenuActionButton text="Edit" onClick={handleEditNotification} />
                    <ActionMenuActionButton
                        text="Delete"
                        onClick={() => handleDeleteNotification(notification)}
                        isNegative
                    />
                </ActionMenu>
            </ButtonWrapper>
        </td>
    </tr>
);

export default PushNotificationListItem;
