import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { CREATE_PIN_OPTIONS_VALUE_MODAL, ERROR_MODAL } from 'constants/shared/modalTypes';
import { useForm, usePrevious } from 'helpers/hooks';
import { formatCheckboxListOptions } from 'helpers/generic';

import createPinOptionSet from 'actions/companyAdmin/pinOptions/async/createPinOptionSet';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import {
    selectPinOptionSetsIsPosting,
    selectPinOptionSetsPostError,
} from 'selectors/companyAdmin/pinOptionSets';
import { selectServicesArr } from 'selectors/companyAdmin/services';
import { selectPinOptionType } from 'selectors/companyAdmin/pinOptionTypes';
import { selectSubscriptions } from '../../../../../selectors/companyAdmin/companySubscription';

const useCreateOptionSet = pinOptionTypeID => {
    const [newSetID, setNewSetID] = useState(null);
    const [servicesError, setServicesError] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();
    const isPosting = useSelector(selectPinOptionSetsIsPosting);
    const postError = useSelector(selectPinOptionSetsPostError);

    const { serviceIDs } = useSelector(selectSubscriptions);
    const services = useSelector(selectServicesArr).filter(service =>
        serviceIDs.includes(service.id),
    );
    const serviceOptions = formatCheckboxListOptions(services);

    const pinOptionType = useSelector(state => selectPinOptionType(state, pinOptionTypeID));
    const slug = pinOptionType.slug;

    const prevProps = usePrevious({ postError, newSetID });

    const [form, handleChange] = useForm({
        name: '',
        serviceIDs: [],
    });

    const handleSubmit = () => {
        let postBody = {
            ...form,
            pinOptionTypeID,
        };

        if (serviceOptions.length === 1) {
            postBody = { ...postBody, serviceIDs: [serviceOptions[0].value] };
        } else if (serviceOptions.length > 1 && !form.serviceIDs.length) {
            return setServicesError(true);
        }

        dispatch(createPinOptionSet(postBody)).then(({ payload }) => {
            if (payload) setNewSetID(payload.id);
        });
    };

    const handleServicesChange = (name, value) => {
        if (servicesError) {
            setServicesError(false);
            handleChange(name, value);
        } else {
            handleChange(name, value);
        }
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
            history.push(`/company/pin-options/${slug}/${newSetID}`);
        }
    }, [newSetID, prevProps.newSetID]);

    return {
        form,
        handleChange,
        handleSubmit,
        isPosting,
        serviceOptions,
        servicesError,
        handleServicesChange,
    };
};

export default useCreateOptionSet;
