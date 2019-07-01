import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchAllDemoRequests from 'actions/superAdmin/demoRequests/async/fetchAllDemoRequests';
import DemoRequests from '../presentational/DemoRequests';

class DemoRequestsContainer extends Component {
    render() {
        return <DemoRequests />;
    }
    componentDidMount() {
        this.props.fetchAllDemoRequests();
    }
}

const mapDispatchToProps = () => dispatch => ({
    fetchAllDemoRequests: () => {
        dispatch(fetchAllDemoRequests());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(DemoRequestsContainer);
