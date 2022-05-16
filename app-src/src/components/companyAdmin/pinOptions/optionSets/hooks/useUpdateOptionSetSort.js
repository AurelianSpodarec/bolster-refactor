import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { sortBySortValue } from 'helpers/generic';

import updatePinOptionSetSort from 'actions/companyAdmin/pinOptions/async/updatePinOptionSetSort';
import reorderPinOptionSets from 'actions/companyAdmin/pinOptions/sync/reorderPinOptionSets';

const useUpdateOptionSetSort = sets => {
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
        dispatch(updatePinOptionSetSort(sets));
    };

    const moveItem = (overindex, fromIndex) => {
        const items = [...sets].sort(sortBySortValue);
        const [item] = items.splice(fromIndex, 1);
        items.splice(overindex, 0, item);
        const sorted = items.map((x, i) => ({ ...x, sort: i + 1 }));
        dispatch(reorderPinOptionSets(sorted));
    };

    return { isSorting, handleToggleSort, handleUpdateSort, moveItem };
};

export default useUpdateOptionSetSort;
