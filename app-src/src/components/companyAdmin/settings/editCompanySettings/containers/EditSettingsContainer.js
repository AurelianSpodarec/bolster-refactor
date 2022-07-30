import React from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';

import fetchCompanySettings from 'actions/companyAdmin/companySettings/async/fetchCompanySettings';
import EditSettings from '../presentational/EditSettings';
import fetchTimezones from 'actions/shared/time/async/fetchTimezones';
import fetchDateFormats from 'actions/shared/time/async/fetchDateFormats';
import { componentDidMount } from 'helpers/generic';
import {
    selectCompanySettings,
    selectCompanySettingsFetchError,
    selectCompanySettingsIsFetching,
} from '../../../../../selectors/companyAdmin/companySettings';

const EditSettingsContainer = () => {
    const dispatch = useDispatch();
    const fetchData = () => {
        batch(() => {
            dispatch(fetchCompanySettings());
            dispatch(fetchTimezones());
            dispatch(fetchDateFormats());
        });
    };
    componentDidMount(fetchData);

    const companySettings = useSelector(selectCompanySettings);
    const isFetching = useSelector(selectCompanySettingsIsFetching);
    const error = useSelector(selectCompanySettingsFetchError);

    return <EditSettings companySettings={companySettings} isFetching={isFetching} error={error} />;
};

export default EditSettingsContainer;
