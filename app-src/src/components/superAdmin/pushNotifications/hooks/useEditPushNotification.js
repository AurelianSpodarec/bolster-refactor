import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import {
    PUSH_NOTIFICATION_FREQUENCY_VALUES,
    PUSH_NOTIFICATION_TARGET_VALUES,
} from 'constants/shared/enums';

import editPushNotification from 'actions/superAdmin/pushNotifications/async/editPushNotification';
import { selectAdminPushNotificationsIsPosting } from 'selectors/superAdmin/pushNotifications';

import { useForm } from 'helpers/hooks';
import { getDaysFromBitMask, handleDaysConversion } from 'helpers/generic';

const useEditPushNotification = notification => {
    const dispatch = useDispatch();

    const isPosting = useSelector(selectAdminPushNotificationsIsPosting);

    const [form, handleChange] = useForm({
        title: notification.title,
        message: notification.message,
        date: new Date(notification.date),
        frequency: notification.frequency,
        recurrenceDays: getDaysFromBitMask(notification.recurrenceDays),
    });

    const handleSubmit = () => {
        const { recurrenceDays, date, ...rest } = form;

        const postBody = {
            ...rest,
            target: PUSH_NOTIFICATION_TARGET_VALUES.ALL,
            date: moment(date).format(),
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
