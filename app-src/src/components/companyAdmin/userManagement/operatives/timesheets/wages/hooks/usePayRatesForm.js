import { useDispatch, useSelector } from 'react-redux';
import { useForm, usePrevious } from 'helpers/hooks';
import { useEffect, useMemo } from 'react';

import {
    selectPayRates,
    selectPayRatesIsPosting,
    selectPayRatesPostSuccess,
} from 'selectors/companyAdmin/payRates';

import { convertArrToObj, getValuesFromBitMaskArray } from 'helpers/generic';
import { v1 as uuidv1 } from 'uuid';

import postCompanyPayRates from '../../../../../../../actions/companyAdmin/payRates/postCompanyPayRates';
import { DAYS_FLAGGED } from '../../../../../../../constants/companyAdmin/enums';
import { hideModal } from '../../../../../../../actions/shared/generic/modals/sync/hideModal';

const usePayRatesForm = () => {
    const dispatch = useDispatch();

    const payRates = useSelector(selectPayRates);
    const isPosting = useSelector(selectPayRatesIsPosting);
    const postSuccess = useSelector(selectPayRatesPostSuccess);
    const prevPostSuccess = usePrevious(postSuccess);

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

    useEffect(() => {
        if (postSuccess && !prevPostSuccess) {
            dispatch(hideModal());
        }
    }, [postSuccess, prevPostSuccess]);

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

        const formattedArray = formArray.map(payRate => {
            const { guid: rateGuid, ...rest } = payRate;

            const formattedItems = Object.values(payRate.items)
                .filter(item => !!item.rate)
                .map(item => {
                    const { guid: itemGuid, days, ...rest } = item;
                    const daysEnum = days.reduce((res, item) => res + DAYS_FLAGGED[item], 0);
                    return { days: daysEnum, ...rest };
                });

            return { ...rest, items: formattedItems };
        });

        return { payRates: formattedArray };
    };

    const handleSave = () => {
        const postBody = processPostBody();

        dispatch(postCompanyPayRates(postBody));
    };

    return {
        form,
        handleAddNewPayRate,
        handleChangePayRateName,
        handleDeletePayRate,
        handleItemsChange,
        handleAddNewItem,
        handleDeleteItem,
        handleChange,
        handleSave,
        isPosting,
    };
};

export default usePayRatesForm;
