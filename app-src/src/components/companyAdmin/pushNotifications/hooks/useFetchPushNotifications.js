import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchPushNotifications from 'actions/companyAdmin/pushNotifications/async/fetchPushNotifications';
import {
    selectPushNotifications,
    selectPushNotificationsIsFetching,
    selectPushNotificationsFetchError,
} from 'selectors/companyAdmin/pushNotifications';

const useFetchPushNotifications = () => {
    const dispatch = useDispatch();

    const pushNotifications = useSelector(selectPushNotifications);
    const isFetching = useSelector(selectPushNotificationsIsFetching);
    const error = useSelector(selectPushNotificationsFetchError);

    useEffect(() => {
        dispatch(fetchPushNotifications());
    }, [dispatch]);

    return { pushNotifications, isFetching, error };
};

export default useFetchPushNotifications;
