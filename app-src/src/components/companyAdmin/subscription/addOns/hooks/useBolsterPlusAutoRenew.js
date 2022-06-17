import { useDispatch, useSelector } from 'react-redux';

import editBolsterPlusRenewalStatus from 'actions/companyAdmin/addOns/async/editBolsterPlusRenewalStatus';
import { useForm } from 'helpers/hooks';
import { selectSubscriptions } from 'selectors/companyAdmin/companySubscription';
import { addOnsType } from 'constants/companyAdmin/enums';

const useBolsterPlusAutoRenew = () => {
    const dispatch = useDispatch();
    const subscriptions = useSelector(selectSubscriptions);

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

    return { form, handlesAutoRenewChange };
};

export default useBolsterPlusAutoRenew;
