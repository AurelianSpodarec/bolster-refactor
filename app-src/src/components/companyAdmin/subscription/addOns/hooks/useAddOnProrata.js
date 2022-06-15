import fetchAddonProrataCost from 'actions/companyAdmin/addOns/async/fetchAddonProrataCost';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAddonProrataCost } from 'selectors/companyAdmin/addOns';

const useAddOnProrata = () => {
    const dispatch = useDispatch();
    const addonProrataCost = useSelector(selectAddonProrataCost);

    useEffect(() => {
        dispatch(fetchAddonProrataCost());
    }, []);

    return { addonProrataCost };
};

export default useAddOnProrata;
