import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, usePrevious } from '../../../../../helpers/hooks';
import { ERROR_MODAL } from '../../../../../constants/shared/modalTypes';
import {
    selectPinOptionsIsPosting,
    selectPinOptionsPostError,
    selectPinOptionsPostSuccess,
} from '../../../../../selectors/superAdmin/pinOptions';
import { selectLatestVersionForPinOption } from '../../../../../selectors/superAdmin/pinOptionVersions';
import { showModal } from '../../../../../actions/shared/generic/modals/sync/showModal';
import { hideModal } from '../../../../../actions/shared/generic/modals/sync/hideModal';
import editPinOption from '../../../../../actions/superAdmin/pinOptions/async/editPinOption';

const useEditOptionValue = option => {
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const isPosting = useSelector(selectPinOptionsIsPosting);
    const postError = useSelector(selectPinOptionsPostError);
    const postSuccess = useSelector(selectPinOptionsPostSuccess);
    const latestPinOptionVersion = useSelector(state =>
        selectLatestVersionForPinOption(state, option.id),
    );

    const prevProps = usePrevious({ postError, postSuccess });

    const [form, handleChange] = useForm({
        name: latestPinOptionVersion.name || '',
        shortName: latestPinOptionVersion.shortName || '',
        serviceIDs: option.serviceIDs || [],
    });

    const handleSubmit = () => {
        const { name, shortName, serviceIDs } = form;

        const postBody = {
            name,
            shortName,
            serviceIDs,
        };

        dispatch(editPinOption(option.id, postBody));
    };

    // only one measurement entry needed for fixed price

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
export default useEditOptionValue;
