import fetchAddonProrataCost from 'actions/companyAdmin/addOns/async/fetchAddonProrataCost';
import { addOnsType } from 'constants/companyAdmin/enums';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAddonProrataCost } from 'selectors/companyAdmin/addOns';

const useAddOnProrata = () => {
    const dispatch = useDispatch();
    const addonProrataCost = useSelector(selectAddonProrataCost);

    const currentAnnualCost = addonProrataCost.currentAnnualCost;
    const newAnnualCost = addonProrataCost.newAnnualCost;
    const proRataCost = addonProrataCost.proRataCost;

    useEffect(() => {
        dispatch(fetchAddonProrataCost(addOnsType.BOLSTER_PLUS));
    }, []);

    return { addonProrataCost, proRataCost, currentAnnualCost, newAnnualCost };
};

export default useAddOnProrata;
