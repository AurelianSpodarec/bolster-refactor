import fetchAddonProrataCost from 'actions/companyAdmin/bolsterPlus/async/fetchAddonProrataCost';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAddonProrataCost } from 'selectors/companyAdmin/bolsterPlus';

const useAddOnProrata = () => {
    const dispatch = useDispatch();
    const addonProrataCost = useSelector(selectAddonProrataCost);

    useEffect(() => {
        dispatch(fetchAddonProrataCost());
    }, []);

    return { addonProrataCost };
};

export default useAddOnProrata;
