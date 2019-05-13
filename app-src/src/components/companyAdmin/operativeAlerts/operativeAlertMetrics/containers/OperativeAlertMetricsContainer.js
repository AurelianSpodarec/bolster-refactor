import React, { Component } from 'react';
import { connect } from 'react-redux';

import OperativeAlertMetrics from '../presentational/OperativeAlertMetrics';
import fetchOperativeAlertDeliveries from 'actions/companyAdmin/operativeAlerts/async/fetchOperativeAlertDeliveries';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import fetchAllOperativeAlerts from 'actions/companyAdmin/operativeAlerts/async/fetchAllOperativeAlerts';

class OperativeAlertMetricsContainer extends Component {
    render = () => {
        const { alertMetrics, isFetching, error, users, alert } = this.props;
        return (
            <OperativeAlertMetrics
                alert={alert}
                alerts={alertMetrics}
                isFetching={isFetching}
                error={error}
                users={users}
            />
        );
    };

    componentDidMount = () => this.props.fetchMetricData();
}

const mapStateToProps = (
    {
        companyAdmin: {
            operativeAlertsReducer: {
                operativeAlertMetrics,
                operativeAlerts,
                isFetching,
                error
            },
            companyUsersReducer: { users }
        }
    },
    { match: { params } }
) => ({
    alertMetrics:
        Object.values(operativeAlertMetrics).filter(
            ({ operativeAlertID }) => +operativeAlertID === +params.id
        ) || {},
    isFetching,
    error,
    users,
    alert: operativeAlerts[params.id] || {}
});

const mapDispatchToProps = (dispatch, { match: { params } }) => ({
    fetchMetricData: () => {
        dispatch(fetchAllOperativeAlerts());
        dispatch(fetchOperativeAlertDeliveries(params.id));
        dispatch(fetchCompanyUsers());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OperativeAlertMetricsContainer);
