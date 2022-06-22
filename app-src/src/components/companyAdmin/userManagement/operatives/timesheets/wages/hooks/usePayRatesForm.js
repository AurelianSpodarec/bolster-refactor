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
        const { [id]: deletedRate, ...rest } = form;

        setFormData(rest);
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
        const { [itemID]: deletedItem, ...rest } = form[id].items;

        handleChange(id, {
            ...form[id],
            items: {
                ...rest,
            },
        });
    };

    const processPostBody = () => {
        const formArray = Object.values(form);

        return formArray.map(payRate => {
            const { guid: rateGuid, ...rest } = payRate;

            const removedGuids = Object.values(payRate.items).map(item => {
                const { guid: itemGuid, ...rest } = item;
                return { ...rest };
            });

            return { ...rest, items: removedGuids };
        });
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
