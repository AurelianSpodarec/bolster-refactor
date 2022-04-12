import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import updatePinOptionValueSort from 'actions/companyAdmin/pinOptions/async/updatePinOptionValueSort';

const useUpdateOptionValueSort = options => {
    const dispatch = useDispatch();
    const [isSorting, setIsSorting] = useState(false);

    const handleToggleSort = () => {
        if (isSorting) setIsSorting(false);
        else setIsSorting(true);
    };

    const handleUpdateSort = () => {
        dispatch(updatePinOptionValueSort(options));
    };

    return { isSorting, setIsSorting, handleToggleSort, handleUpdateSort };
};

export default useUpdateOptionValueSort;
