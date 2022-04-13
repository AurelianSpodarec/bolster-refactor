import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { CREATE_PIN_OPTIONS_VALUE_MODAL, ERROR_MODAL } from 'constants/shared/modalTypes';
import { PIN_OPTION_TYPES } from 'constants/companyAdmin/enums';
import { useForm, usePrevious } from 'helpers/hooks';
import { formatCheckboxListOptions } from 'helpers/generic';

import createPinOptionSet from 'actions/companyAdmin/pinOptions/async/createPinOptionSet';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import {
    selectPinOptionSetsIsPosting,
    selectPinOptionSetsPostError,
} from 'selectors/companyAdmin/pinOptionSets';
import { selectServicesArr } from 'selectors/companyAdmin/services';

const useCreateOptionSet = pinOptionTypeID => {
    const [newSetID, setNewSetID] = useState(null);
    const link = PIN_OPTION_TYPES[pinOptionTypeID].link;

    const dispatch = useDispatch();
    const history = useHistory();
    const isPosting = useSelector(selectPinOptionSetsIsPosting);
    const postError = useSelector(selectPinOptionSetsPostError);

    const services = useSelector(selectServicesArr);
    const serviceOptions = formatCheckboxListOptions(services);

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
        if (newSetID && !prevProps.newSetID) {
            // go to new newly created set and open create option modal
            dispatch(
                showModal(CREATE_PIN_OPTIONS_VALUE_MODAL, {
                    pinOptionTypeID,
                    pinOptionSetID: newSetID,
                }),
            );
            history.push(`/company/pin-options/${link}/${newSetID}`);
        }
    }, [newSetID, prevProps.newSetID]);

    return { form, handleChange, handleSubmit, isPosting, serviceOptions };
};

export default useCreateOptionSet;
