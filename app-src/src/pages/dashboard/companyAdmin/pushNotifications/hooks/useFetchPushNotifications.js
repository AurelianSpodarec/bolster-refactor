import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchPushNotifications from 'actions/companyAdmin/pushNotifications/async/fetchPushNotifications';
import {
    selectPushNotifications,
    selectPushNotificationsIsFetching,
    selectPushNotificationsFetchError,
} from 'selectors/companyAdmin/pushNotifications';
import useBolsterPlus from 'pages/dashboard/companyAdmin/subscription/addOns/hooks/useBolsterPlus';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import { BOLSTER_PLUS_UPGRADE_MODAL } from 'constants/shared/modalTypes';
import { selectSubscriptionsPostSuccess } from 'selectors/companyAdmin/subscriptions';
import { usePrevious } from 'helpers/hooks';
import fetchAllSubscriptions from 'actions/companyAdmin/subscriptions/async/fetchAllSubscriptions';

const useFetchPushNotifications = () => {
    const dispatch = useDispatch();

    const pushNotifications = useSelector(selectPushNotifications);
    const isFetching = useSelector(selectPushNotificationsIsFetching);
    const error = useSelector(selectPushNotificationsFetchError);
    const { isBolsterPlusActivated } = useBolsterPlus();
    const subscriptionsPostSuccess = useSelector(selectSubscriptionsPostSuccess);
    const prevData = usePrevious({
        subscriptionsPostSuccess,
    });

    useEffect(() => {
        dispatch(fetchPushNotifications());
    }, [dispatch]);

    useEffect(() => {
        if (subscriptionsPostSuccess && !prevData.subscriptionsPostSuccess) {
            dispatch(fetchPushNotifications());
            dispatch(fetchAllSubscriptions());
        }
    }, [subscriptionsPostSuccess, prevData.subscriptionsPostSuccess]); // Re-fetch results data on buying subscriptions post success

    useEffect(() => {
        if (!isBolsterPlusActivated) {
            dispatch(
                showModal(BOLSTER_PLUS_UPGRADE_MODAL, {
                    handleClose: () =>
                        dispatch(showModal(BOLSTER_PLUS_UPGRADE_MODAL, { shouldGoBack: true })),
                    shouldGoBack: true,
                }),
            );
        }
    }, [dispatch, isBolsterPlusActivated]);

    return { pushNotifications, isFetching, error, isBolsterPlusActivated };
};

export default useFetchPushNotifications;
