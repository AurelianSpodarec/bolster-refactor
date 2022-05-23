import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useForm, usePrevious } from 'helpers/hooks';
import { ERROR_MODAL } from 'constants/shared/modalTypes';

import duplicatePinOptionValue from 'actions/superAdmin/pinOptions/async/duplicatePinOptionValue';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import {
    selectPinOptionsIsPosting,
    selectPinOptionsPostError,
    selectPinOptionsPostSuccess,
} from 'selectors/superAdmin/pinOptions';
import { selectLatestVersionForPinOption } from 'selectors/superAdmin/pinOptionVersions';

const useDuplicateOptionValue = option => {
    const dispatch = useDispatch();
    const isPosting = useSelector(selectPinOptionsIsPosting);
    const postError = useSelector(selectPinOptionsPostError);
    const postSuccess = useSelector(selectPinOptionsPostSuccess);
    const latestPinOptionVersion = useSelector(state =>
        selectLatestVersionForPinOption(state, option.id),
    );

    const prevProps = usePrevious({ postError, postSuccess });

    const [form, handleChange] = useForm({
        name: latestPinOptionVersion.name ? latestPinOptionVersion.name + ' (Copy)' : '',
        shortName: latestPinOptionVersion.shortName || '',
    });

    const handleSubmit = () => {
        const { name, shortName } = form;

        const postBody = {
            name,
            shortName,
        };

        dispatch(duplicatePinOptionValue(option.id, postBody));
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
    };
};

export default useDuplicateOptionValue;
