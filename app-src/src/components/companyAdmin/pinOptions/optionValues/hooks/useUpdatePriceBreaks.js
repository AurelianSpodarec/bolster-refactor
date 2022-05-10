import {
    getFormArrayAfterObjAdd,
    getFormArrayAfterObjRemove,
    getFormArrayObjChange,
} from 'helpers/generic';

const useUpdatePriceBreaks = (form, handleChange, disableAdd = false) => {
    const handlePriceBreakChange = (index, field, value) => {
        const arrayToUpdate = getFormArrayObjChange(
            index,
            field,
            value,
            form.measurementPriceBreaks,
        );

        handleChange('measurementPriceBreaks', arrayToUpdate);
    };

    const handleAddPriceBreak = () => {
        if (disableAdd) return;

        const arrayToUpdate = getFormArrayAfterObjAdd(form.measurementPriceBreaks, {
            value: '',
            cost: '',
        });

        handleChange('measurementPriceBreaks', arrayToUpdate);
    };

    const handleRemovePriceBreak = index => {
        const arrayToUpdate = getFormArrayAfterObjRemove(form.measurementPriceBreaks, index);

        handleChange('measurementPriceBreaks', arrayToUpdate);
    };

    return { handlePriceBreakChange, handleAddPriceBreak, handleRemovePriceBreak };
};

export default useUpdatePriceBreaks;
