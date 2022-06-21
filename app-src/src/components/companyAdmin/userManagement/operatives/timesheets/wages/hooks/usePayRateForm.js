import { useForm } from '../../../../../../../helpers/hooks';
import { useMemo } from 'react';

import { convertArrToObj, getValuesFromBitMaskArray } from '../../../../../../../helpers/generic';

import { v1 as uuidv1 } from 'uuid';

const usePayRateForm = payRate => {
    const initialForm = useMemo(() => {
        const formattedItems = payRate.items.map(item => {
            return { ...item, days: getValuesFromBitMaskArray(item.days) };
        });

        return convertArrToObj(formattedItems);
    }, []);

    const [nameForm, handleNameChange] = useForm({ name: payRate.name });

    const [itemsForm, handleItemsChange] = useForm(initialForm);

    const handleAddNewItem = () => {
        const guid = uuidv1();

        handleItemsChange(guid, {
            id: guid,
            name: '',
            rate: '',
            startTime: '08:00',
            endTime: '17:00',
            days: [],
        });
    };

    return { nameForm, handleNameChange, itemsForm, handleItemsChange, handleAddNewItem };
};

export default usePayRateForm;
