import { useDispatch, useSelector } from 'react-redux';

import {
    PUSH_NOTIFICATION_FREQUENCY_VALUES,
    PUSH_NOTIFICATION_TARGET_VALUES,
} from 'constants/shared/enums';

import editPushNotification from 'actions/companyAdmin/pushNotifications/async/editPushNotification';
import { selectPushNotificationsIsPosting } from 'selectors/companyAdmin/pushNotifications';

import { useForm } from 'helpers/hooks';
import { getDaysFromBitMask, handleDaysConversion } from 'helpers/generic';

const useEditPushNotification = notification => {
    const dispatch = useDispatch();

    const isPosting = useSelector(selectPushNotificationsIsPosting);

    const [form, handleChange] = useForm({
        title: notification.title,
        message: notification.message,
        target: notification.target,
        siteID: notification.siteID,
        userIDs: notification.userIDs ?? [],
        date: new Date(notification.date),
        frequency: notification.frequency,
        recurrenceDays: getDaysFromBitMask(notification.recurrenceDays),
    });

    const handleSubmit = () => {
        const { recurrenceDays, ...rest } = form;

        const postBody = {
            ...rest,
            target: PUSH_NOTIFICATION_TARGET_VALUES.ALL,
            recurrenceDays:
                +form.frequency === PUSH_NOTIFICATION_FREQUENCY_VALUES.WEEKLY
                    ? handleDaysConversion(recurrenceDays)
                    : null,
        };

        dispatch(editPushNotification(notification.id, postBody));
    };

    return { form, handleChange, handleSubmit, isPosting };
};

export default useEditPushNotification;
