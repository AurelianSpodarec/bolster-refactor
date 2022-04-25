import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { CREATE_ADMIN_PIN_OPTIONS_VALUE_MODAL, ERROR_MODAL } from 'constants/shared/modalTypes';
import { useForm, usePrevious } from 'helpers/hooks';
import { formatCheckboxListOptions } from 'helpers/generic';

import createPinOptionSet from 'actions/superAdmin/pinOptions/async/createPinOptionSet';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import {
    selectPinOptionSetsIsPosting,
    selectPinOptionSetsPostError,
} from 'selectors/superAdmin/pinOptionSets';
import { selectServicesArr } from 'selectors/superAdmin/services';
import { selectPinOptionType } from 'selectors/superAdmin/pinOptionTypes';

const useCreateOptionSet = pinOptionTypeID => {
    const [newSetID, setNewSetID] = useState(null);

    const dispatch = useDispatch();
    const history = useHistory();
    const isPosting = useSelector(selectPinOptionSetsIsPosting);
    const postError = useSelector(selectPinOptionSetsPostError);

    const services = useSelector(selectServicesArr);
    const serviceOptions = formatCheckboxListOptions(services);

    const pinOptionType = useSelector(state => selectPinOptionType(state, pinOptionTypeID));
    const slug = pinOptionType.slug;

    const prevProps = usePrevious({ postError, newSetID });

    const [form, handleChange] = useForm({
        name: '',
        serviceIDs: [],
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
        // if (newSetID && !prevProps.newSetID) {
        //     dispatch(
        //         showModal(CREATE_PIN_OPTIONS_VALUE_MODAL, {
        //             pinOptionTypeID,
        //             pinOptionSetID: newSetID,
        //         }),
        //     );
        //     history.push(`/admin/pin-options/${slug}/${newSetID}`);
        // }
    }, [newSetID, prevProps.newSetID]);

    return { form, handleChange, handleSubmit, isPosting, serviceOptions };
};

export default useCreateOptionSet;
