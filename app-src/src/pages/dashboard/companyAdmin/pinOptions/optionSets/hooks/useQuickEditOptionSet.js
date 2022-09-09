import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useForm, usePrevious } from 'helpers/hooks';

import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import quickEditPinOptionSet from 'actions/companyAdmin/pinOptions/async/quickEditPinOptionSet';
import {
    selectPinOptionSetsIsPosting,
    selectPinOptionSetsPostSuccess,
} from 'selectors/companyAdmin/pinOptionSets';

const useQuickEditOptionSet = set => {
    const dispatch = useDispatch();
    const isPosting = useSelector(selectPinOptionSetsIsPosting);
    const postSuccess = useSelector(selectPinOptionSetsPostSuccess);

    const prevProps = usePrevious({ postSuccess });

    const [form, handleChange] = useForm({
        percentageIncrease: 0,
    });

    const handleSubmit = () => {
        const postBody = {
            percentageIncrease: form.percentageIncrease,
        };

        dispatch(quickEditPinOptionSet(set.id, postBody));
    };

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) dispatch(hideModal());
    }, [postSuccess, prevProps.postSuccess]);

    return { form, handleChange, handleSubmit, isPosting };
};

export default useQuickEditOptionSet;
