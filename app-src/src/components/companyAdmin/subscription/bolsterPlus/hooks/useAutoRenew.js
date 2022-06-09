import moment from 'moment';

import editSubscriptionRenewalStatus from 'actions/companyAdmin/subscriptions/async/editSubscriptionRenewalStatus';
import { selectSubscriptions } from 'selectors/companyAdmin/companySubscription';
import { useDispatch, useSelector } from 'react-redux';

const useAutoRenew = () => {
    const dispatch = useDispatch();
    const subscriptions = useSelector(selectSubscriptions);
    const isAutoRenew = subscriptions.isAutoRenew;

    const handleAutoRenewChange = () => {
        dispatch(
            editSubscriptionRenewalStatus({
                renewalStatus: !isAutoRenew,
            }),
        );
    };

    return { handleAutoRenewChange, isAutoRenew };
};

export default useAutoRenew;
