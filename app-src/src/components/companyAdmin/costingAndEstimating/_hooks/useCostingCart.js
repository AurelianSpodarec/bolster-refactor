import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchSingleBuilding from 'actions/companyAdmin/buildings/async/fetchSingleBuilding';
import { selectBuilding } from 'selectors/companyAdmin/buildings';

const useCostingCart = buildingID => {
    const dispatch = useDispatch();
    const specificBuilding = useSelector(state => selectBuilding(state, buildingID));

    useEffect(() => {
        dispatch(fetchSingleBuilding(buildingID));
    }, []);

    return { specificBuilding };
};

export default useCostingCart;
