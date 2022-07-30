import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchPushNotifications from 'actions/superAdmin/pushNotifications/async/fetchPushNotifications';
import {
    selectAdminPushNotifications,
    selectAdminPushNotificationsIsFetching,
    selectAdminPushNotificationsFetchError,
} from 'selectors/superAdmin/pushNotifications';
import useBolsterPlus from 'components/companyAdmin/subscription/addOns/hooks/useBolsterPlus';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import { BOLSTER_PLUS_UPGRADE_MODAL } from 'constants/shared/modalTypes';
import { selectSubscriptionsPostSuccess } from 'selectors/companyAdmin/subscriptions';
import { usePrevious } from 'helpers/hooks';
import fetchAllSubscriptions from 'actions/companyAdmin/subscriptions/async/fetchAllSubscriptions';

const useFetchPushNotifications = () => {
    const dispatch = useDispatch();

    const pushNotifications = useSelector(selectAdminPushNotifications);
    const isFetching = useSelector(selectAdminPushNotificationsIsFetching);
    const error = useSelector(selectAdminPushNotificationsFetchError);
    const { isBolsterPlusActivated } = useBolsterPlus();
    const subscriptionsPostSuccess = useSelector(selectSubscriptionsPostSuccess);
    const prevData = usePrevious({
        subscriptionsPostSuccess,
    });

    useEffect(() => {
        dispatch(fetchPushNotifications());
    }, [dispatch]);

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

    useEffect(() => {
        if (subscriptionsPostSuccess && !prevData.subscriptionsPostSuccess) {
            dispatch(fetchPushNotifications());
            dispatch(fetchAllSubscriptions());
        }
    }, [subscriptionsPostSuccess, prevData.subscriptionsPostSuccess]); // Re-fetch results data on buying subscriptions post success

    return { pushNotifications, isFetching, error, isBolsterPlusActivated };
};

export default useFetchPushNotifications;
