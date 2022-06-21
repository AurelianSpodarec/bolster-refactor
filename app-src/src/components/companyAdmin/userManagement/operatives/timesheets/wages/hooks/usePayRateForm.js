/* This hook needs to do the following
    1. Be able to edit each pay rate name - Done
    3. Be able to edit each pay rate item
    5. Be able to delete each pay rate item
    4. Add a new pay rate item
    6. Not loose any information from each pay rate and their items when changing between payrates
    2. Be able to add a new pay rate
    7. Be able to delete each pay rate
    8. Be able to save the changes to all pay rates in one request

    Notes for submitting the form:
    1. Remove the guid field of any newly created items
    2. Reformat items days array to bitmask
    3. Reformat items back to an array
*/
import { useSelector } from 'react-redux';
import { useForm } from 'helpers/hooks';
import { useMemo } from 'react';

import { selectPayRates } from 'selectors/companyAdmin/payRates';
import { convertArrToObj, getValuesFromBitMaskArray } from 'helpers/generic';
import { v1 as uuidv1 } from 'uuid';

const usePayRateForm = () => {
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
    console.log(form);
    const handleChangePayRateName = (id, value) => {
        handleChange(id, { ...form[id], name: value });
    };

    const handleItemsChange = (id, value) => {
        const { id: itemID, guid } = value;

        if (itemID) {
            return handleChange(id, {
                ...form[id],
                items: {
                    ...form[id].items,
                    [itemID]: value,
                },
            });
        } else if (guid) {
            return handleChange(id, {
                ...form[id],
                items: {
                    ...form[id].items,
                    [guid]: value,
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

    return { form, handleChangePayRateName, handleItemsChange, handleAddNewItem };
};

export default usePayRateForm;
