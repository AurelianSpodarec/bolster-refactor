import React from 'react';
import { useSelector } from 'react-redux';

import { selectSubscriptions } from 'selectors/companyAdmin/companySubscription';
import { addOnsType } from 'constants/companyAdmin/enums';

const useBolsterPlus = () => {
    const subscriptions = useSelector(selectSubscriptions);
    const isBolsterPlusActivated = subscriptions.addons?.some(
        item => item.addonType === addOnsType.BOLSTER_PLUS,
    );
    const isSubscriptionsActivated = !subscriptions.isAccessDisabled && !!subscriptions.startOn;

    return { isBolsterPlusActivated, isSubscriptionsActivated };
};

export default useBolsterPlus;
