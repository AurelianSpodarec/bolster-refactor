import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dashboard from '../presentational/Dashboard';
import moment from 'moment';

import { DASHBOARD_TABS } from 'constants/shared/tabNames';
import setTabs from 'actions/shared/generic/tabs/sync/setTabs';

import fetchPinStats from 'actions/companyAdmin/dashboard/async/fetchPinStats';
import updateDashboardFilters from 'actions/companyAdmin/dashboard/sync/updateDashboardFilters';
import fetchPinStatusStats from 'actions/companyAdmin/dashboard/async/fetchPinStatusStats';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import { CONFIRM_EMAIL } from 'constants/shared/modalTypes';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';

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
            setTabs,
            showModal,
            profile,
        } = this.props;
        const startDate = moment().subtract(7, 'days').toDate();

        const startingFilters = {
            serviceID: null,
            status: null,
            startDate: startDate,
            endDate: moment().toDate(),
        };

        setTabs(Object.values(DASHBOARD_TABS), DASHBOARD_TABS.OPERATIVES);

        updateDashboardFilters('serviceID', startingFilters.serviceID);
        updateDashboardFilters('status', startingFilters.status);
        updateDashboardFilters('startDate', startingFilters.startDate);
        updateDashboardFilters('endDate', startingFilters.endDate);

        fetchPinStats(startingFilters);
        fetchPinStatusStats();

        localStorage.setItem('selectedService', '');
        localStorage.setItem('selectedStatus', '');
        localStorage.setItem('selectedStartDate', '');
        localStorage.setItem('selectedEndDate', '');

        if (!profile.isEmailConfirmed) showModal(CONFIRM_EMAIL, { user: profile });
    };

    componentDidUpdate(prevProps) {
        const { profile, showModal, hideModal } = this.props;
        if (!profile.isEmailConfirmed && prevProps.profile.isEmailConfirmed)
            showModal(CONFIRM_EMAIL, { user: profile });
        if (!prevProps.profile.isEmailConfirmed && profile.isEmailConfirmed) hideModal();
    }
}

const mapDispatchToProps = {
    fetchPinStats,
    fetchPinStatusStats,
    updateDashboardFilters,
    setTabs,
    showModal,
    hideModal,
};

const mapStateToProps = ({
    shared: {
        isIE10Reducer: { isIE10 },
        profileReducer: { profile },
    },
}) => ({
    isIE10,
    profile,
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
