import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import { selectAddOn } from 'selectors/companyAdmin/addOns';
import editBolsterPlusRenewalStatus from 'actions/companyAdmin/addOns/async/editBolsterPlusRenewalStatus';
import { useForm } from 'helpers/hooks';

const useAutoRenew = () => {
    const dispatch = useDispatch();
    const addOn = useSelector(selectAddOn);
    const isAutoRenew = addOn.isAutoRenew;

    const [form, handleChange] = useForm({
        isAutoRenew: true,
    });

    const handleAutoRenewChange = () => {
        dispatch(
            editBolsterPlusRenewalStatus({
                // renewalStatus: !isAutoRenew,
            }),
        );
    };

    return { handleAutoRenewChange, form };
};

export default useAutoRenew;
