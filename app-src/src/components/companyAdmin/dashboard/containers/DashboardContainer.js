import React, { Component } from "react";
import { connect } from "react-redux";
import Dashboard from "../presentational/Dashboard";
import moment from "moment";

import { DASHBOARD_TABS } from "constants/shared/tabNames";
import setTabs from "actions/shared/generic/tabs/sync/setTabs";

import fetchPinStats from "actions/companyAdmin/dashboard/async/fetchPinStats";
import updateDashboardFilters from "actions/companyAdmin/dashboard/sync/updateDashboardFilters";
import fetchPinStatusStats from "actions/companyAdmin/dashboard/async/fetchPinStatusStats";

class DashboardContainer extends Component {
    render() {
        const { isIE10 } = this.props;

        return <Dashboard isIE10={isIE10} />;
    }

    componentDidMount = () => {
        const {
            updateDashboardFilters,
            fetchPinStats,
            fetchPinStatusStats,
            setTabs
        } = this.props;
        const startDate = moment()
            .subtract(7, "days")
            .toDate();

        const startingFilters = {
            serviceID: "",
            status: "",
            startDate: startDate,
            endDate: moment().toDate()
        };

        setTabs(Object.values(DASHBOARD_TABS), DASHBOARD_TABS.OPERATIVES);

        updateDashboardFilters("serviceID", startingFilters.serviceID);
        updateDashboardFilters("status", startingFilters.status);
        updateDashboardFilters("startDate", startingFilters.startDate);
        updateDashboardFilters("endDate", startingFilters.endDate);

        fetchPinStats(startingFilters);
        fetchPinStatusStats();

        localStorage.setItem("selectedService", "");
        localStorage.setItem("selectedStatus", "");
        localStorage.setItem("selectedStartDate", "");
        localStorage.setItem("selectedEndDate", "");
    };
}

const mapDispatchToProps = dispatch => ({
    fetchPinStats: filterBody => dispatch(fetchPinStats(filterBody)),
    fetchPinStatusStats: () => dispatch(fetchPinStatusStats()),
    updateDashboardFilters: (fieldName, searchTerm) => {
        dispatch(updateDashboardFilters(fieldName, searchTerm));
    },
    setTabs: (tabs, selectedTab) => dispatch(setTabs(tabs, selectedTab))
});

export default connect(
    ({
        shared: {
            isIE10Reducer: { isIE10 }
        }
    }) => ({
        isIE10
    }),
    mapDispatchToProps
)(DashboardContainer);
