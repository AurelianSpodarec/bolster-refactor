import React, { Component } from 'react';
import { connect } from 'react-redux';

import OperativeAlertsTable from '../presentational/OperativeAlertsTable';

class OperativeAlertsTableContainer extends Component {
    render() {
        const { isFetching, error, operativeAlerts } = this.props;
        return (
            <OperativeAlertsTable
                headers={['Site name', 'Owned by', 'Permissions', 'Action']}
                operativeAlerts={operativeAlerts}
                isFetching={isFetching}
                error={error}
            />
        );
    }
}

const mapStateToProps = ({
    companyAdmin: {
        operativeAlertsReducer: { operativeAlerts, isFetching, error }
    }
}) => ({
    isFetching,
    error,
    operativeAlerts: Object.values(operativeAlerts)
});

export default connect(mapStateToProps)(OperativeAlertsTableContainer);
