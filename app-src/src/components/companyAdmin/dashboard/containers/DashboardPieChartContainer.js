import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashboardPieChart from '../presentational/DashboardPieChart';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { isEmpty } from 'helpers/generic';

class DashboardPieChartContainer extends Component {
    render() {
        const { statusStats, isFetching, error } = this.props;

        return (
            <BlockContainer
                isFetching={isFetching}
                error={error}
                isEmpty={isEmpty(statusStats)}
                containerClass="flex-row-item size-lg-6"
            >
                <DashboardPieChart stats={statusStats} />
            </BlockContainer>
        );
    }
}

const mapStateToProps = ({
    companyAdmin: {
        dashboardReducer: { statusStats, isFetchingDashPinsStats, error }
    }
}) => ({
    statusStats,
    isFetching: isFetchingDashPinsStats,
    error: error
});

export default connect(mapStateToProps)(DashboardPieChartContainer);
