import { useDispatch, useSelector } from 'react-redux';

import editBolsterPlusRenewalStatus from 'actions/companyAdmin/addOns/async/editBolsterPlusRenewalStatus';
import { useForm, usePrevious } from 'helpers/hooks';
import { selectSubscriptions } from 'selectors/companyAdmin/companySubscription';
import { addOnsType } from 'constants/companyAdmin/enums';
import { useEffect } from 'react';

const useBolsterPlusAutoRenew = () => {
    const dispatch = useDispatch();
    const subscriptions = useSelector(selectSubscriptions);

    const isAutoRenewSubscription = subscriptions.isAutoRenew;
    const previousAutoRenewSubscription = usePrevious(isAutoRenewSubscription);

    const addOn = subscriptions.addons?.find(item => item.addonType === addOnsType.BOLSTER_PLUS);

    const initialFormData = () => ({
        renewalStatus: addOn?.isAutoRenew ?? true,
    });

    const [form, handleChange] = useForm(initialFormData);

    const handlesAutoRenewChange = (name, value) => {
        handleChange(name, value);

        const postBody = {
            companySubscriptionAddonID: addOn?.id,
            renewalStatus: !form.renewalStatus,
        };

        dispatch(editBolsterPlusRenewalStatus(postBody));
    };

    useEffect(() => {
        if (previousAutoRenewSubscription !== isAutoRenewSubscription) {
            if (isAutoRenewSubscription === false && addOn?.isAutoRenew === true) {
                form.renewalStatus = false;
                dispatch(
                    editBolsterPlusRenewalStatus({
                        companySubscriptionAddonID: addOn?.id,
                        renewalStatus: false,
                    }),
                );
            }

            if (isAutoRenewSubscription === true && addOn?.isAutoRenew === false) {
                form.renewalStatus = true;
                dispatch(
                    editBolsterPlusRenewalStatus({
                        companySubscriptionAddonID: addOn?.id,
                        renewalStatus: true,
                    }),
                );
            }
        }
    }, [dispatch, previousAutoRenewSubscription, isAutoRenewSubscription]);

    return { form, handlesAutoRenewChange, isAutoRenewSubscription };
};

export default useBolsterPlusAutoRenew;
