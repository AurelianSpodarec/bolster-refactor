import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { sortBySortValue } from 'helpers/generic';

const useUpdateOptionValueSort = options => {
    const dispatch = useDispatch();
    const [isSorting, setIsSorting] = useState(false);

    const handleToggleSort = () => {
        if (isSorting) {
            setIsSorting(false);
        } else {
            setIsSorting(true);
        }
    };

    const handleUpdateSort = () => {
        // dispatch(updatePinOptionValueSort(options));
    };

    const moveItem = (overindex, fromIndex) => {
        const items = [...options].sort(sortBySortValue);
        const [item] = items.splice(fromIndex, 1);
        items.splice(overindex, 0, item);
        const sorted = items.map((x, i) => ({ ...x, sort: i + 1 }));
        // reorderPinOptionValues(sorted);
    };

    return { isSorting, handleToggleSort, handleUpdateSort, moveItem };
};

export default useUpdateOptionValueSort;
