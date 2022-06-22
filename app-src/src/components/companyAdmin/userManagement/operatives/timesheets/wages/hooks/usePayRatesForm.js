/* This hook needs to do the following
    - Be able to edit each pay rate name - Done
    - Be able to edit each pay rate item - done
    - Add a new pay rate item - Done
    - Not loose any information from each pay rate and their items when changing between payrates - Done
    - Be able to add a new pay rate - Done
    - Be able to delete each pay rate item
    - Be able to delete each pay rate
    - Be able to save the changes to all pay rates in one request

    Notes for submitting the form:
    - Remove the guid field of any newly created items
    - Reformat items days array to bitmask
    - Reformat items back to an array
*/
import { useSelector } from 'react-redux';
import { useForm } from 'helpers/hooks';
import { useMemo } from 'react';

import { selectPayRates } from 'selectors/companyAdmin/payRates';
import { convertArrToObj, getValuesFromBitMaskArray } from 'helpers/generic';
import { v1 as uuidv1 } from 'uuid';

const usePayRatesForm = () => {
    const payRates = useSelector(selectPayRates);

    const initialForm = useMemo(() => {
        const formattedPayRates = payRates.map(payRate => {
            //converts bitmask array to array of days
            const convertedBitmaskDays = payRate.items.map(item => {
                return { ...item, days: getValuesFromBitMaskArray(item.days) };
            });

            //convert pay rate items to object for easy changing
            return {
                ...payRate,
                items: convertArrToObj(convertedBitmaskDays),
            };
        });

        return convertArrToObj(formattedPayRates);
    }, [payRates]);

    const [form, handleChange] = useForm(initialForm);

    const handleAddNewPayRate = () => {
        const guid = uuidv1();
        const itemGuid = uuidv1();

        const newPayRate = {
            guid,
            name: 'New rate',
            items: {
                [itemGuid]: {
                    guid: itemGuid,
                    name: '',
                    rate: '',
                    startTime: '08:00',
                    endTime: '17:00',
                    days: [],
                },
            },
        };

        handleChange(guid, newPayRate);
    };

    const handleChangePayRateName = (id, value) => {
        handleChange(id, { ...form[id], name: value });
    };

    const handleItemsChange = (id, value) => {
        const { id: itemID, guid } = value;

        if (guid) {
            return handleChange(id, {
                ...form[id],
                items: {
                    ...form[id].items,
                    [guid]: value,
                },
            });
        } else if (itemID) {
            return handleChange(id, {
                ...form[id],
                items: {
                    ...form[id].items,
                    [itemID]: value,
                },
            });
        }
    };

    const handleAddNewItem = id => {
        const guid = uuidv1();

        handleItemsChange(id, {
            guid,
            name: '',
            rate: '',
            startTime: '08:00',
            endTime: '17:00',
            days: [],
        });
    };

    const handleDeleteItem = (id, itemID) => {
        const itemsObj = { ...form[id].items };
        delete itemsObj[itemID];

        handleChange(id, {
            ...form[id],
            items: {
                ...itemsObj,
            },
        });
    };

    return {
        form,
        handleAddNewPayRate,
        handleChangePayRateName,
        handleItemsChange,
        handleAddNewItem,
        handleDeleteItem,
    };
};

export default usePayRatesForm;
