import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from 'helpers/hooks';
import { formatCheckboxListOptions } from 'helpers/generic';
import editPinOptionSet from 'actions/companyAdmin/pinOptions/async/editPinOptionSet';
import { selectPinOptionSetsIsPosting } from 'selectors/companyAdmin/pinOptionSets';
import { selectServicesArr } from 'selectors/companyAdmin/services';

const useEditOptionSet = set => {
    const dispatch = useDispatch();
    const isPosting = useSelector(selectPinOptionSetsIsPosting);
    const services = useSelector(selectServicesArr);
    const serviceOptions = formatCheckboxListOptions(services);

    const [form, handleChange] = useForm({
        name: set.name,
        serviceIDs: set.serviceIDs || [],
    });

    const handleSubmit = () => {
        dispatch(editPinOptionSet(set.id, form));
    };

    return { form, handleChange, handleSubmit, isPosting, serviceOptions };
};

export default useEditOptionSet;
