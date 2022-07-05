import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchPushNotifications from 'actions/companyAdmin/pushNotifications/async/fetchPushNotifications';
import {
    selectPushNotifications,
    selectPushNotificationsIsFetching,
    selectPushNotificationsFetchError,
} from 'selectors/companyAdmin/pushNotifications';
import useBolsterPlus from 'components/companyAdmin/subscription/addOns/hooks/useBolsterPlus';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import { BOLSTER_PLUS_UPGRADE_MODAL } from 'constants/shared/modalTypes';

const useFetchPushNotifications = () => {
    const dispatch = useDispatch();

    const pushNotifications = useSelector(selectPushNotifications);
    const isFetching = useSelector(selectPushNotificationsIsFetching);
    const error = useSelector(selectPushNotificationsFetchError);
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
