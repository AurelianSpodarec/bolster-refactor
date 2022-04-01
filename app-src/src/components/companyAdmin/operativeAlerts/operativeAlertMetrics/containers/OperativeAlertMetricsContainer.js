import React from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';

import OperativeAlertMetrics from '../presentational/OperativeAlertMetrics';
import fetchOperativeAlertDeliveries from 'actions/companyAdmin/operativeAlerts/async/fetchOperativeAlertDeliveries';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import fetchAllOperativeAlerts from 'actions/companyAdmin/operativeAlerts/async/fetchAllOperativeAlerts';
import { componentDidMount } from '../../../../../helpers/generic';
import { useParams } from 'react-router-dom';

const OperativeAlertMetricsContainer = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { operativeAlertMetrics, isFetching, error, operativeAlerts, users } =
        useSelector(mapStateToProps);
    const alert = operativeAlerts[params.id];
    const alertMetrics = Object.values(operativeAlertMetrics).filter(
        ({ operativeAlertID }) => +operativeAlertID === +params.id,
    );
    componentDidMount(() => {
        batch(() => {
            dispatch(fetchAllOperativeAlerts());
            dispatch(fetchCompanyUsers());
            dispatch(fetchOperativeAlertDeliveries(params.id));
        });
    });

    return (
        <OperativeAlertMetrics
            alert={alert}
            alertMetrics={alertMetrics}
            isFetching={isFetching}
            error={error}
            users={users}
        />
    );
};

const mapStateToProps = ({
    companyAdmin: {
        operativeAlertsReducer: { operativeAlertMetrics, operativeAlerts, isFetching, error },
        companyUsersReducer: { users },
    },
}) => ({
    operativeAlertMetrics,
    isFetching,
    error,
    users,
    operativeAlerts,
});

export default OperativeAlertMetricsContainer;
