import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { convertArrToObj } from '../../../../../helpers/generic';
import { useForm } from 'helpers/hooks';

import { selectPinOptionSetsArr } from '../../../../../selectors/companyAdmin/pinOptionSets';
import { selectPinOptionsIsPosting } from '../../../../../selectors/companyAdmin/pinOptions';

const useMergeOptionSets = set => {
    const dispatch = useDispatch();
    const optionSetsArr = useSelector(selectPinOptionSetsArr);
    const isPosting = useSelector(selectPinOptionsIsPosting);

    const [form, handleChange] = useForm({
        setID: null,
    });

    const setOptions = useMemo(() => {
        const filteredSets = optionSetsArr.filter(curSet => {
            if (curSet.pinOptionTypeID !== set.pinOptionTypeID) {
                return false;
            }

            if (!curSet.companyID) {
                return false;
            }

            if (curSet.id === set.id) {
                return false;
            }

            return true;
        });

        const formattedOpts = filteredSets.map(curSet => ({ text: curSet.name, value: curSet.id }));

        return convertArrToObj(formattedOpts, 'value');
    }, [optionSetsArr, set]);

    const handleSubmit = () => {
        // to submit
    };

    return { setOptions, form, handleChange, handleSubmit, isPosting };
};

export default useMergeOptionSets;
