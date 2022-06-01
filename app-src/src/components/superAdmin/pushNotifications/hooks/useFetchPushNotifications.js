import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchPushNotifications from 'actions/superAdmin/pushNotifications/async/fetchPushNotifications';
import {
    selectAdminPushNotifications,
    selectAdminPushNotificationsIsFetching,
    selectAdminPushNotificationsFetchError,
} from 'selectors/superAdmin/pushNotifications';

const useFetchPushNotifications = () => {
    const dispatch = useDispatch();

    const pushNotifications = useSelector(selectAdminPushNotifications);
    const isFetching = useSelector(selectAdminPushNotificationsIsFetching);
    const error = useSelector(selectAdminPushNotificationsFetchError);

    useEffect(() => {
        dispatch(fetchPushNotifications());
    }, [dispatch]);

    return { pushNotifications, isFetching, error };
};

export default useFetchPushNotifications;
