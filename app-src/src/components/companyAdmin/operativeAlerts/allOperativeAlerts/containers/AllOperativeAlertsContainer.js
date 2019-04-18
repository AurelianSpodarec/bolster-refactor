import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchAllOperativeAlerts from 'actions/companyAdmin/operativeAlerts/async/fetchAllOperativeAlerts';
import AllOperativeAlerts from '../presentational/AllOperativeAlerts';

class AllOperativeAlertsContainer extends Component {
    render() {
        return <AllOperativeAlerts />;
    }

    componentDidMount = () => {
        this.props.fetchAllOperativeAlerts();
    };
}

const mapDispatchToProps = dispatch => ({
    fetchAllOperativeAlerts: () => {
        dispatch(fetchAllOperativeAlerts());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(AllOperativeAlertsContainer);
