import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { convertArrToObj } from '../../../../../helpers/generic';
import { useForm, usePrevious } from 'helpers/hooks';

import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import mergePinOptionSets from 'actions/companyAdmin/pinOptions/async/mergePinOptionSets';
import { selectPinOptionSetsArr } from '../../../../../selectors/companyAdmin/pinOptionSets';
import {
    selectPinOptionSetsIsPosting,
    selectPinOptionSetsPostSuccess,
} from 'selectors/companyAdmin/pinOptionSets';

const useMergeOptionSets = set => {
    const dispatch = useDispatch();
    const optionSetsArr = useSelector(selectPinOptionSetsArr);
    const isPosting = useSelector(selectPinOptionSetsIsPosting);
    const postSuccess = useSelector(selectPinOptionSetsPostSuccess);

    const prevProps = usePrevious({ postSuccess });

    const [form, handleChange] = useForm({
        selectedID: null,
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
        const postBody = {
            selectedID: form.selectedID,
            mergeID: set.id,
        };

        dispatch(mergePinOptionSets(set.id, postBody));
    };

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) dispatch(hideModal());
    }, [postSuccess, prevProps.postSuccess]);

    return { setOptions, form, handleChange, handleSubmit, isPosting };
};

export default useMergeOptionSets;
