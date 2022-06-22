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

    const [form, handleChange, setFormData] = useForm(initialForm);

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

    const handleDeletePayRate = id => {
        const newForm = { ...form };

        delete newForm[id];

        setFormData(newForm);
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

    /* This hook needs to do the following
        Notes for submitting the form:
        - Remove the guid field of any newly created items
        - Reformat items days array to bitmask
        - Reformat items back to an array
    */

    const processPostBody = () => {
        const formArray = Object.values(form);

        for (let i = 0; i < formArray.length; i++) {
            formArray[i].items = Object.values(formArray[i].items);
            formArray[i].items.forEach(item => {
                if (item.guid) {
                    delete item.guid;
                }
            });

            if (formArray[i].guid) {
                delete formArray[i].guid;
            }
        }

        return formArray;
    };

    const handleSave = () => {
        console.log(processPostBody());
    };

    return {
        form,
        handleAddNewPayRate,
        handleChangePayRateName,
        handleDeletePayRate,
        handleItemsChange,
        handleAddNewItem,
        handleDeleteItem,
        handleSave,
    };
};

export default usePayRatesForm;
