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

const useFetchPushNotifications = () => {
    const dispatch = useDispatch();

    const pushNotifications = useSelector(selectAdminPushNotifications);
    const isFetching = useSelector(selectAdminPushNotificationsIsFetching);
    const error = useSelector(selectAdminPushNotificationsFetchError);
    const { isBolsterPlusActivated } = useBolsterPlus();

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

    return { pushNotifications, isFetching, error, isBolsterPlusActivated };
};

export default useFetchPushNotifications;
