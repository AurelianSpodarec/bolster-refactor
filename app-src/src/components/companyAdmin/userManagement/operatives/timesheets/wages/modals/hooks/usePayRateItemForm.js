import { useForm } from '../../../../../../../../helpers/hooks';
import { useMemo } from 'react';

import {
    convertArrToObj,
    getValuesFromBitMaskArray,
} from '../../../../../../../../helpers/generic';

const usePayRateItemForm = items => {
    const initialForm = useMemo(() => {
        const formattedItems = items.map(item => {
            return { ...item, days: getValuesFromBitMaskArray(item.days) };
        });

        return convertArrToObj(formattedItems);
    }, [items]);

    const [itemsForm, handleChange] = useForm(initialForm);

    return { itemsForm, handleChange };
};

export default usePayRateItemForm;
