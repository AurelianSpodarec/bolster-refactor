import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { ERROR_MODAL } from 'constants/shared/modalTypes';
import { PIN_OPTION_TYPES } from 'constants/companyAdmin/enums';
import { useForm, usePrevious } from 'helpers/hooks';

import createPinOptionSet from 'actions/companyAdmin/pinOptions/async/createPinOptionSet';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import {
    selectPinOptionSetsIsPosting,
    selectPinOptionSetsPostError,
} from 'selectors/companyAdmin/pinOptionSets';

const useCreateOptionSet = pinOptionTypeID => {
    const [newSetID, setNewSetID] = useState(null);
    const link = PIN_OPTION_TYPES[pinOptionTypeID].link;

    const dispatch = useDispatch();
    const history = useHistory();
    const isPosting = useSelector(selectPinOptionSetsIsPosting);
    const postError = useSelector(selectPinOptionSetsPostError);

    const prevProps = usePrevious({ postError, newSetID });

    const [form, handleChange] = useForm({
        name: '',
    });

    const handleSubmit = () => {
        const postBody = {
            ...form,
            pinOptionTypeID,
        };

        dispatch(createPinOptionSet(postBody)).then(({ payload }) => {
            if (payload) setNewSetID(payload.id);
        });
    };

    useEffect(() => {
        if (postError && !prevProps.postError) dispatch(showModal(ERROR_MODAL));
    }, [postError, prevProps.postError]);

    useEffect(() => {
        if (newSetID && !prevProps.newSetID) {
            dispatch(hideModal());
            history.push(`/company/pin-options/${link}/${newSetID}`);
        }
    }, [newSetID, prevProps.newSetID]);

    return { form, handleChange, handleSubmit, isPosting };
};

export default useCreateOptionSet;
