import React from 'react';

import {
    PUSH_NOTIFICATION_FREQUENCY_NAMES,
    PUSH_NOTIFICATION_FREQUENCY_VALUES,
    RECURRENCE_DAYS_NAMES,
} from 'constants/shared/enums';
import { getDaysFromBitMask } from 'helpers/generic';

import ActionMenu from 'components/shared/actionMenu/ActionMenu';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

//Diff
import TooltipContainer from '../../../../components/shared/generic/tooltip/containers/TooltipContainer';
// End Diff

const PushNotificationListItem = ({
    notification,
    notification: { title, message, frequency, recurrenceDays, date, lastSentOn },
    handleEditNotification,
    handleDeleteNotification,
    isAdminPlus,
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
        <td>
            <DateTimeContainer date={date} />
        </td>
        <td>{lastSentOn ? <DateTimeContainer date={lastSentOn} /> : 'Not sent'}</td>
        <td>
            <ButtonWrapper alignment="right">
                <ActionMenu>
                    <TooltipContainer
                        shouldOutput={!isAdminPlus}
                        text="Push Notifications are only available to Admin Plus users"
                        side="left"
                    >
                        <ActionMenuActionButton
                            text="Edit"
                            onClick={() => handleEditNotification(notification)}
                            disabled={!isAdminPlus}
                        />
                        <ActionMenuActionButton
                            text="Delete"
                            onClick={() => handleDeleteNotification(notification)}
                            disabled={!isAdminPlus}
                            isNegative
                        />
                    </TooltipContainer>
                </ActionMenu>
            </ButtonWrapper>
        </td>
    </tr>
);

export default PushNotificationListItem;
