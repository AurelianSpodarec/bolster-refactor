import React from 'react';
import { useSelector } from 'react-redux';

import { selectSubscriptions } from 'selectors/companyAdmin/companySubscription';
import { addOnsType } from 'constants/companyAdmin/enums';

const useBolsterPlus = () => {
    const subscriptions = useSelector(selectSubscriptions);
    const isBolsterPlusActivated = subscriptions.addons?.includes(addOnsType.BOLSTER_PLUS);
    console.log(subscriptions);
    console.log(isBolsterPlusActivated);

    return { isBolsterPlusActivated };
};

export default useBolsterPlus;
