import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useForm, usePrevious } from '../../../../../../helpers/hooks';
import { ERROR_MODAL } from '../../../../../../constants/shared/modalTypes';
import { showModal } from '../../../../../../actions/shared/generic/modals/sync/showModal';
import { hideModal } from '../../../../../../actions/shared/generic/modals/sync/hideModal';
import {
    selectPinOptionsIsPosting,
    selectPinOptionsPostError,
    selectPinOptionsPostSuccess,
} from '../../../../../../selectors/superAdmin/pinOptions';
import createPinOption from '../../../../../../actions/superAdmin/pinOptions/async/createPinOption';

const useCreateOptionValue = (pinOptionTypeID, pinOptionSetID) => {
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const isPosting = useSelector(selectPinOptionsIsPosting);
    const postError = useSelector(selectPinOptionsPostError);
    const postSuccess = useSelector(selectPinOptionsPostSuccess);

    const prevProps = usePrevious({ postError, postSuccess });

    const [form, handleChange] = useForm({
        name: '',
        shortName: '',
        serviceIDs: [],
    });

    const handleSubmit = () => {
        const { name, shortName, serviceIDs } = form;

        const postBody = {
            name,
            shortName,
            serviceIDs,
            pinOptionTypeID,
            pinOptionSetID,
        };

        dispatch(createPinOption(postBody));
    };

    useEffect(() => {
        if (postError && !prevProps.postError) dispatch(showModal(ERROR_MODAL));
    }, [postError, prevProps.postError]);

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) dispatch(hideModal());
    }, [postSuccess, prevProps.postSuccess]);

    return {
        form,
        handleChange,
        handleSubmit,
        isPosting,
        error,
        setError,
    };
};

export default useCreateOptionValue;
