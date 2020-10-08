import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchActivityLogSettings from 'actions/companyAdmin/activityLog/async/fetchActivityLogSettings';
import { COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';
import { isEmpty } from 'helpers/generic';
import { usePrevious } from 'helpers/hooks';

import EditActivityLog from '../presentational/EditActivityLog';

const EditActivityLogContainer = ({
    fetchActivityLogSettings,
    settings,
    jwtData,
    isFetching,
    error,
    history,
}) => {
    const prevProps = usePrevious({ jwtData });

    useEffect(() => {
        fetchActivityLogSettings();

        if (!isEmpty(jwtData) && jwtData.companyUserType !== COMPANY_USER_ROLE_TYPES.OWNER) {
            history.push('/company/activity-log');
        }
    }, []);

    useEffect(() => {
        if (
            isEmpty(prevProps.jwtData) &&
            !isEmpty(jwtData) &&
            jwtData.companyUserType !== COMPANY_USER_ROLE_TYPES.OWNER
        ) {
            history.push('/company/activity-log');
        }
    }, [jwtData, prevProps.jwtData]);

    return <EditActivityLog settings={settings} isFetching={isFetching} error={error} />;
};

const mapStateToProps = ({
    companyAdmin: {
        activityLogReducer: { settings, isFetching, error },
    },
    shared: {
        decodeJWTReducer: { jwtData },
    },
}) => ({
    settings,
    jwtData,
    isFetching,
    error,
});

const mapDispatchToProps = {
    fetchActivityLogSettings,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditActivityLogContainer));
