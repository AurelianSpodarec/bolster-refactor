import React, { Component } from 'react';
import { connect } from 'react-redux';

import DashboardStatsOptions from '../presentational/DashboardStatsOptions';
import fetchAllServices from 'actions/companyAdmin/services/async/fetchAllServices';
import updateDashboardSetting from 'actions/companyAdmin/dashboard/sync/updateDashboardSetting';

class DashboardStatsOptionsContainer extends Component {
    render() {
        const {
            services,
            settings: { startDate, endDate, serviceType, liveTimePeriod }
        } = this.props;
        const serviceSelectOptions = services.map(({ id, name }) => ({
            label: name,
            value: id
        }));
        return (
            <DashboardStatsOptions
                services={serviceSelectOptions}
                selectedService={serviceType}
                startDate={startDate}
                endDate={endDate}
                handleChangeSetting={this.handleChangeSetting}
                liveTimePeriod={liveTimePeriod}
            />
        );
    }
    handleChangeSetting = (name, val) => {
        const { updateDashboardSetting } = this.props;
        updateDashboardSetting(name, val);
    };

    componentDidMount = () => this.props.fetchAllServices();
}

const mapStateToProps = ({
    companyAdmin: {
        servicesReducer: { services },
        dashboardReducer: { settings }
    }
}) => ({
    services: Object.values(services),
    settings
});

const mapDispatchToProps = { fetchAllServices, updateDashboardSetting };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardStatsOptionsContainer);
