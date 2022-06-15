import fetchAddonProrataCost from 'actions/companyAdmin/addOns/async/fetchAddonProrataCost';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAddonProrataCost } from 'selectors/companyAdmin/addOns';

const useAddOnProrata = () => {
    const dispatch = useDispatch();
    const addonProrataCost = useSelector(selectAddonProrataCost);

    const currentAnnualCostWithVAT = addonProrataCost.currentAnnualCostWithVAT;
    const newAnnualCostWithVAT = addonProrataCost.newAnnualCostWithVAT;
    const proRataCost = addonProrataCost.proRataCost;

    useEffect(() => {
        dispatch(fetchAddonProrataCost());
    }, []);

    return { addonProrataCost, proRataCost, currentAnnualCostWithVAT, newAnnualCostWithVAT };
};

export default useAddOnProrata;
