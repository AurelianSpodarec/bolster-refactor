import { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { convertArrToObj } from '../../../../../helpers/generic';

import { selectPinOptionSets } from '../../../../../selectors/companyAdmin/pinOptionSets';

import fetchPinOptionSets from '../../../../../actions/companyAdmin/pinOptions/async/fetchPinOptionSets';
import movePinOption from '../../../../../actions/companyAdmin/pinOptions/async/movePinOption';
import { selectPinOptionsIsPosting } from '../../../../../selectors/companyAdmin/pinOptions';

const useMoveOptionValue = option => {
    const dispatch = useDispatch();
    const optionSetsObj = useSelector(selectPinOptionSets);
    const isPosting = useSelector(selectPinOptionsIsPosting);

    const [setID, setSetID] = useState(null);

    useEffect(() => {
        dispatch(fetchPinOptionSets());
    }, []);

    const optionSetOptionsObj = useMemo(() => {
        const optionSetsArr = Object.values(optionSetsObj);
        const { pinOptionTypeID, companyID, pinOptionSetID } = option;

        const options = [];

        optionSetsArr.forEach(optionSet => {
            const {
                pinOptionTypeID: optionSetPinOptionTypeID,
                companyID: optionSetCompanyID,
                id: optionSetID,
            } = optionSet;

            if (
                pinOptionSetID !== optionSetID &&
                optionSetPinOptionTypeID === pinOptionTypeID &&
                optionSetCompanyID === companyID
            ) {
                options.push({ text: optionSet.name, value: optionSet.id });
            }
        });

        return convertArrToObj(options, 'value');
    }, [optionSetsObj, option]);

    const handleSubmit = () => {
        dispatch(movePinOption(option.id, setID));
    };

    return { optionSetOptionsObj, setID, setSetID, handleSubmit, isPosting };
};

export default useMoveOptionValue;
