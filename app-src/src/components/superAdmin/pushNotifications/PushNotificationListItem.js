import React from 'react';
import moment from 'moment';

import {
    PUSH_NOTIFICATION_FREQUENCY_NAMES,
    PUSH_NOTIFICATION_FREQUENCY_VALUES,
    RECURRENCE_DAYS_NAMES,
} from 'constants/shared/enums';
import { DATE, DATE_TIME } from 'constants/shared/dateFormats';
import { getDaysFromBitMask } from 'helpers/generic';

import ActionMenu from 'components/shared/actionMenu/ActionMenu';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';

const PushNotificationListItem = ({
    notification,
    notification: { title, message, frequency, recurrenceDays, date, lastSentOn },
    handleEditNotification,
    handleDeleteNotification,
}) => (
    <tr>
        <td>{title}</td>
        <td>{message}</td>
        <td>{PUSH_NOTIFICATION_FREQUENCY_NAMES[frequency]}</td>
        <td>
            {frequency === PUSH_NOTIFICATION_FREQUENCY_VALUES.WEEKLY
                ? getDaysFromBitMask(recurrenceDays)
                      .map(day => RECURRENCE_DAYS_NAMES[day])
                      .join(', ')
                : 'N/A'}
        </td>
        <td>{moment(date).format(DATE)}</td>
        <td>{lastSentOn ? moment(lastSentOn).format(DATE_TIME) : 'Not sent'}</td>
        <td>
            <ButtonWrapper alignment="right">
                <ActionMenu>
                    <ActionMenuActionButton
                        text="Edit"
                        onClick={() => handleEditNotification(notification)}
                    />
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
