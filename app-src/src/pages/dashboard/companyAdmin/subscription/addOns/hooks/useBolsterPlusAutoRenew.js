import { useDispatch, useSelector } from 'react-redux';

import editBolsterPlusRenewalStatus from 'actions/companyAdmin/addOns/async/editBolsterPlusRenewalStatus';
import { useForm, usePrevious } from 'helpers/hooks';
import { selectSubscriptions } from 'selectors/companyAdmin/companySubscription';
import { addOnsType } from 'constants/companyAdmin/enums';
import { useEffect } from 'react';
import fetchAllSubscriptions from 'actions/companyAdmin/subscriptions/async/fetchAllSubscriptions';
import { selectAddonPostSuccess } from 'selectors/companyAdmin/addOns';

const useBolsterPlusAutoRenew = () => {
    const dispatch = useDispatch();
    const postSuccess = useSelector(selectAddonPostSuccess);
    const prevProps = usePrevious({ postSuccess });
    const subscriptions = useSelector(selectSubscriptions);

    const isAutoRenewSubscription = subscriptions.isAutoRenew;
    const previousAutoRenewSubscription = usePrevious(isAutoRenewSubscription);

    const addOn = subscriptions.addons?.find(item => item.addonType === addOnsType.BOLSTER_PLUS);

    const initialFormData = () => ({
        renewalStatus: addOn?.isAutoRenew ?? true,
    });

    const [form, handleChange] = useForm(initialFormData);

    const previousToPreviousBolsterPlusRenewSubscription = usePrevious(
        usePrevious(form.renewalStatus),
    );

    const handlesAutoRenewChange = (name, value) => {
        handleChange(name, value);

        const postBody = {
            companySubscriptionAddonID: addOn?.id,
            renewalStatus: !form.renewalStatus,
        };

        dispatch(editBolsterPlusRenewalStatus(postBody));
    };

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            dispatch(fetchAllSubscriptions());
        }
    }, [dispatch, postSuccess, prevProps]);

    useEffect(() => {
        if (previousAutoRenewSubscription !== isAutoRenewSubscription) {
            if (isAutoRenewSubscription === false && addOn?.isAutoRenew === true) {
                handleChange('renewalStatus', false);
                dispatch(
                    editBolsterPlusRenewalStatus({
                        companySubscriptionAddonID: addOn?.id,
                        renewalStatus: false,
                    }),
                );
            }

            if (isAutoRenewSubscription === true) {
                handleChange('renewalStatus', previousToPreviousBolsterPlusRenewSubscription);
                dispatch(
                    editBolsterPlusRenewalStatus({
                        companySubscriptionAddonID: addOn?.id,
                        renewalStatus: previousToPreviousBolsterPlusRenewSubscription,
                    }),
                );
            }
        }
    }, [
        dispatch,
        previousAutoRenewSubscription,
        isAutoRenewSubscription,
        previousToPreviousBolsterPlusRenewSubscription,
    ]);

    return { form, handlesAutoRenewChange, isAutoRenewSubscription };
};

export default useBolsterPlusAutoRenew;
