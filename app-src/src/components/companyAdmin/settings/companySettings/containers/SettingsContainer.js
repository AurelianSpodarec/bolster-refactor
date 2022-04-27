import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchCompanySettings from 'actions/companyAdmin/companySettings/async/fetchCompanySettings';
import Settings from '../presentational/Settings';
import { componentDidMount } from '../../../../../helpers/generic';
import { selectIsMobile } from '../../../../../selectors/shared/mobile';
import {
    selectCompanySettings,
    selectCompanySettingsFetchError,
    selectCompanySettingsIsFetching,
} from '../../../../../selectors/companyAdmin/companySettings';

const SettingsContainer = () => {
    const dispatch = useDispatch();
    const onMobile = useSelector(selectIsMobile);
    const companySettings = useSelector(selectCompanySettings);
    const isFetching = useSelector(selectCompanySettingsIsFetching);
    const error = useSelector(selectCompanySettingsFetchError);
    componentDidMount(() => dispatch(fetchCompanySettings()));

    return (
        <Settings
            onMobile={onMobile}
            companySettings={companySettings}
            isFetching={isFetching}
            error={error}
        />
    );
};

export default SettingsContainer;
