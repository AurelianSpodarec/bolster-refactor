import React, { Component } from 'react';
import { connect } from 'react-redux';

import DashboardStats from '../presentational/DashboardStats';

class DashboardStatsContainer extends Component {
    render() {
        return <DashboardStats />;
    }
}

const mapStateToProps = () => {};

const mapDispatchToProps = () => {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardStatsContainer);
