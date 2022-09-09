import React from 'react';
import { connect } from 'react-redux';

import DashboardPieChart from '../presentational/DashboardPieChart';
import { isIE } from 'react-device-detect';

const DashboardPieChartContainer = ({ datasets, statusStats: { lastUpdated }, onMobile }) => {
    const stats = _convertDataSetsToStatusStats();

    return <DashboardPieChart stats={stats} onMobile={onMobile} />;

    function _convertDataSetsToStatusStats() {
        if (!isIE) {
            const statuses = Object.entries(datasets).reduce(
                (acc, [status, countArr]) => ({
                    ...acc,
                    [status]: countArr.reduce((acc, curr) => acc + curr),
                }),
                0,
            );
            return { statuses, lastUpdated };
        } else {
            return false;
        }
    }
};

const mapStateToProps = ({
    companyAdmin: {
        dashboardReducer: {
            statusStats,
            dashRecentPinsStats: { datasets = {} },
        },
    },
    shared: {
        mobileReducer: { onMobile },
    },
}) => ({
    statusStats,
    datasets,
    onMobile,
});

export default connect(mapStateToProps)(DashboardPieChartContainer);
