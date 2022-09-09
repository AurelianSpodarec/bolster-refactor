import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import editSubscriptionRenewalStatus from 'actions/companyAdmin/subscriptions/async/editSubscriptionRenewalStatus';
import { selectSubscriptionsIsFetching } from 'selectors/companyAdmin/subscriptions';
import { selectSubscriptions } from 'selectors/companyAdmin/companySubscription';
import { selectCards } from '../../../../../../selectors/companyAdmin/cards';

const useSubscriptionAutoRenewal = () => {
    const dispatch = useDispatch();
    const isFetching = useSelector(selectSubscriptionsIsFetching);
    const subscriptions = useSelector(selectSubscriptions);
    const cards = useSelector(selectCards);

    const isAutoRenew = subscriptions.isAutoRenew;
    const renewalType = subscriptions.renewalType;
    const endOn = subscriptions.endOn;
    const noCards = !cards.length;

    const d = new Date();
    d.setDate(d.getDate() + 2);
    const expiresWithin2Days = d > new Date(endOn);

    const handleAutoRenewChange = () => {
        dispatch(
            editSubscriptionRenewalStatus({
                renewalStatus: !isAutoRenew,
                renewPaymentType: renewalType,
            }),
        );
    };

    const handleRadioChange = (name, value) => {
        // switch between pay using card, pay by invoice
        dispatch(
            editSubscriptionRenewalStatus({
                renewalStatus: isAutoRenew,
                renewPaymentType: value,
            }),
        );
    };

    const active =
        moment(subscriptions.startOn).isBefore(Date.now()) &&
        moment(subscriptions.endOn).isAfter(Date.now());

    return {
        isFetching,
        isAutoRenew,
        handleAutoRenewChange,
        handleRadioChange,
        renewalType,
        noCards,
        active,
        expiresWithin2Days,
    };
};

export default useSubscriptionAutoRenewal;
