import React from 'react';
import { batch, useDispatch } from 'react-redux';

import fetchCompanySettings from 'actions/companyAdmin/companySettings/async/fetchCompanySettings';
import EditSettings from '../presentational/EditSettings';
import fetchTimezones from 'actions/shared/time/async/fetchTimezones';
import fetchDateFormats from 'actions/shared/time/async/fetchDateFormats';
import { componentDidMount } from 'helpers/generic';

const EditSettingsContainer = () => {
    const dispatch = useDispatch();
    const fetchData = () => {
        batch(() => {
            dispatch(fetchCompanySettings('EDIT SETTINGS'));
            dispatch(fetchTimezones());
            dispatch(fetchDateFormats());
        });
    };
    componentDidMount(fetchData);

    return <EditSettings />;
};

export default EditSettingsContainer;
